const Chat = require("../models/chatModel");

const chatController = {
  getAllChats: async (req, res) => {
    try {
      const allChats = await Chat.find({ user: { $eq: req.user.id } })
        .populate("lastedMessage")
        .populate("user", "-password -refreshToken")
        .sort({ updateAt: -1 });
      return res.status(200).json(allChats);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  createChat: async (req, res) => {
    try {
      const { chatName, userID } = req.body;
      const newChat = await Chat.create({ chatName, user: userID });
      return res.status(200).json(newChat);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  renameChat: async (req, res) => {
    try {
      const chatID = req.params.id;
      console.log(chatID);

      if (!chatID) {
        return res.status(400).json("Chat not found");
      }

      const { chatName } = req.body;
      const updateChat = await Chat.findByIdAndUpdate(
        chatID,
        { chatName },
        { new: true }
      ).populate("user", "-password -refreshToken");

      if (!updateChat) {
        return res.status(404).json("Chat not found");
      }

      return res.status(200).json(updateChat);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  deleteChat: async (req, res) => {
    try {
      const idChat = req.params.id;

      if(!idChat){
        return res.status(400).json("ChatID is not null");
      }

      const deleteChat = await Chat.findByIdAndDelete(idChat);

      if(!deleteChat){
        return res.status(404).json("ChatID is not found");
      }

      return res.status(200).json("Chat has been deleted");

    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = chatController;
