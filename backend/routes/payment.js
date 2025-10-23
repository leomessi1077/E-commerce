const express = require('express');
const router = express.Router();
const {
  createOrder,
  verifyPayment,
  getRazorpayKey,
  refundPayment
} = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/auth');

router.post('/create-order', protect, createOrder);
router.post('/verify', protect, verifyPayment);
router.get('/key', getRazorpayKey);
router.post('/refund', protect, authorize('seller', 'admin'), refundPayment);

module.exports = router;

