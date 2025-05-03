const express = require('express');
const router = express.Router();
const {
  createMessage,
  getAllMessages,
  deleteMessage,
  markAsRead,
  markAsUnread,
  getMessageById
} = require('../controllers/VoiceController');

const {protect} = require("../middleware/authMiddleware");

router.post('/create',protect, createMessage);
router.get('/get', protect,getAllMessages);
router.get('/:id', protect, getMessageById);
router.patch('/:id/read',protect, markAsRead);
router.patch('/:id/unread', protect, markAsUnread);
router.delete('/:id',protect, deleteMessage);

module.exports = router;