const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const {verifyToken} = require('../middlewares/verifyToken'); 

router.get("/:id", verifyToken, messageController.getAllMessages);
router.post("/send", verifyToken, messageController.sendMessage);

module.exports = router;
