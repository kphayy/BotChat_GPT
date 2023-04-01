const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const {verifyToken} = require('../middlewares/verifyToken'); 

router.get('/', verifyToken, chatController.getAllChats);
router.post('/create', verifyToken, chatController.createChat);
router.put('/rename/:id', verifyToken, chatController.renameChat);
router.delete('/:id', verifyToken, chatController.deleteChat);

module.exports = router;