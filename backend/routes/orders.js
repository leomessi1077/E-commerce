const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrder,
  updateOrderStatus,
  getSellerOrders
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .post(protect, createOrder)
  .get(protect, getMyOrders);

router.get('/seller/my-orders', protect, authorize('seller', 'admin'), getSellerOrders);

router.route('/:id')
  .get(protect, getOrder)
  .put(protect, authorize('seller', 'admin'), updateOrderStatus);

module.exports = router;

