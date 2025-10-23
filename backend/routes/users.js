const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// Simple placeholder - can be extended later
router.get('/', protect, authorize('admin'), async (req, res) => {
  res.json({ success: true, message: 'User routes working' });
});

module.exports = router;

