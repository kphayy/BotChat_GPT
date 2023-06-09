const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authController = {
  register: async (req, res) => {
    try {
      console.log(req.body)
      const { name, email, password, avatar } = req.body;
      console.log(">>>>>>" + name);

      if (!name || !email || !password) {
        res.status(400).json("Please enter all the required fields");
        return;
      }

      const checkExists = await User.findOne({ email });

      if (checkExists) {
        res.status(400).json("User already exists");
        return;
      }

      //Hash password
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);

      const newUser = await new User({
        name,
        email,
        avatar,
        password: hash,
      });

      const user = await User.create(newUser);

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json("Wrong username");
      }

      console.log("Password >>>> " + user.password  + ">>>>> " + password) ;

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(404).json("Wrong password");
      }

      if (user && validPassword) {
        const newAccessToken = authController.generateAccessToken(user);
        const newRefreshToken = authController.generateRefreshToken(user);

        await User.updateOne(
          { email: user.email },
          { refreshToken: newRefreshToken }
        );

        const { password, refreshToken, ...rest } = user._doc;

        return res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          sameSite: "strict",
          scure: false,
        }).status(200).json({ ...rest, accessToken: newAccessToken });

      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  logout: (req, res, next) => {
    try {
      res
        .clearCookie("refreshToken", {
          sameSite: "none",
          scure: true,
        })
        .status(200)
        .json("User has been logged out");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  refreshToken: async (req, res) => {
    console.log({ ...req.cookies });
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken);
    if (!refreshToken) {
      return res.status(401).json("You're not authenticated!");
    }

    const checkRefreshToken = await User.findOne({ refreshToken });

    if (!checkRefreshToken) {
      return res.status(403).json("Token is not valid");
    }

    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN,
      (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid");
        }

        const accessToken = AuthenController.generateAccessToken(user);

        res.status(200).json({ accessToken });
      }
    );
  },
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_ACCESS_TOKEN,
      {
        expiresIn: "5m",
      }
    );
  },
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_REFRESH_TOKEN,
      {
        expiresIn: "200d",
      }
    );
  },
};

module.exports = authController;
