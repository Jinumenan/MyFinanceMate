const Voice = require('../models/Voice');

// POST /api/voice
exports.createMessage = async (req, res) => {
  const { message } = req.body;
  const userId = req.user.id; //get user from token

  if (!message || !message.trim()) {
    return res.status(400).json({ message: 'Empty message not allowed' });
  }

  try {
    const saved = await Voice.create({ message, userId }); //store user
    res.status(200).json({ message: 'Message saved', data: saved });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/voice
exports.getAllMessages = async (req, res) => {
  const userId = req.user.id; // get from token
  try {
    const messages = await Voice.find({ userId }).sort({ createdAt: -1 }); // only that user's messages
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/voice/:id
exports.getMessageById = async (req, res) => {
  const userId = req.user.id;
  try {
    const message = await Voice.findOne({ _id: req.params.id, userId });
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch message' });
  }
};

// DELETE /api/voice/:id
exports.deleteMessage = async (req, res) => {
  const userId = req.user.id;
  try {
    const deleted = await Voice.findOneAndDelete({ _id: req.params.id, userId });
    if (!deleted) {
      return res.status(404).json({ message: 'Message not found or not yours' });
    }
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
};

// PATCH /api/voice/:id/read
exports.markAsRead = async (req, res) => {
  const userId = req.user.id;
  try {
    const voice = await Voice.findOneAndUpdate(
      { _id: req.params.id, userId },
      { read: true },
      { new: true }
    );
    if (!voice) {
      return res.status(404).json({ message: 'Message not found or not yours' });
    }
    res.status(200).json({ message: 'Marked as read' });
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
};

exports.markAsUnread = async (req, res) => {
  const userId = req.user.id;
  try {
    const message = await Voice.findOneAndUpdate(
      { _id: req.params.id, userId },
      { read: false },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ message: 'Message not found or not yours' });
    }
    res.json(message);
  } catch (error) {
    console.error('markAsUnread error:', error);
    res.status(500).json({ error: 'Failed to mark as unread' });
  }
};

