const Message = require("../models/messageModel");
const { Configuration, OpenAIApi } = require("openai");

const messageController = {
  getAllMessages: async (req, res) => {
    try {
      const chatID = req.params.id;

      if (chatID) {
        const messages = await Message.find({ chat: { $eq: chatID } })
          .populate("sender", "-password -refreshToken")
          .populate("chat");

        if (!messages) {
          return res.status(404).json("Chat not found");
        }

        return res.status(200).json(messages);
      } else {
        return res.status(400).json("Message ID is not null");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  sendMessage: async (req, res) => {
    try {
      const roleMain =
        "Nhiệm vụ của bạn là tâm sự với người dùng, bạn như là một người biết tất cả mọi thứ, sẵn sàng lắng nghe và đề cao cảm xúc của người dùng khi trò chuyện. Và đặc biệt hơn bạn phải luôn giữ cuộc trò chuyện được vui vẻ và bạn phải ghi nhớ tất cả thông tin mà người dùng đã đưa ra trong cuộc trò chuyện.";

      const { chatID, newMessage } = req.body;

      if (!chatID) {
        return res.status(400).json("Chat ID is not null");
      }

      const getOldMessages = await Message.find({ chat: { $eq: chatID } })
        .populate("sender", "-password -refreshToken")
        .populate("chat");

      const configuration = new Configuration({
        apiKey: process.env.OPENAI_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const messages = [
        {
          role: "system",
          content: roleMain,
        },
      ];

      console.log(">>>>>Messages: " + messages);

      for (let message of getOldMessages) {
        messages.push({
          role: "user",
          content: message.userMessage,
        });
        messages.push({
          role: "assistant",
          content: message.botMessage,
        });
      }
      messages.push({
        role: "user",
        content: newMessage,
      });

      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        user: req.user?.id.toString(),
        messages,
      });

      const responseMessage =
        completion.data.choices[0].message.content;

      await Message.create({
        sender: req.user.id,
        userMessage: newMessage,
        botMessage: responseMessage,
        chat: chatID,
      });
      return res.status(200).json(responseMessage);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = messageController;
