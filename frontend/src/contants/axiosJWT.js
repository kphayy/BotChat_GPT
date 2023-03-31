import axios from "axios";
import jwt_decode from "jwt-decode";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function axiosJWT() {
  const refreshToken = async () => {
    try {
      const res = await axios.post("/api/auth/refreshtoken");
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const createAxiosJWT = () => {
    const axiosJWT = axios.create();
    axiosJWT.interceptors.request.use(
      async (config) => {
        const { currentUser, refreshAccessToken } = useContext(AuthContext);
        let currentDate = new Date();
        console.log(currentUser);

        const decodedToken = jwt_decode(currentUser.accessToken);
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          const newAccessToken = await refreshToken();
          refreshAccessToken(newAccessToken.toString());

          config.headers["authorization"] =
            "Bearer " + newAccessToken.toString();
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return axiosJWT;
  };

  return { createAxiosJWT};
}
