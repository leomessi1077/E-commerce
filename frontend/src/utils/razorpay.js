import axios from 'axios';

/**
 * Initialize Razorpay payment
 * @param {number} amount - Amount in rupees
 * @param {function} onSuccess - Callback on successful payment
 * @param {function} onFailure - Callback on payment failure
 * @param {object} userData - User information
 */
export const initiateRazorpayPayment = async (amount, onSuccess, onFailure, userData = {}) => {
  try {
    // Create order on backend
    const { data: orderData } = await axios.post('/api/payment/create-order', {
      amount,
      currency: 'INR'
    });

    if (!orderData.success) {
      throw new Error('Failed to create payment order');
    }

    const options = {
      key: orderData.key,
      amount: orderData.order.amount,
      currency: orderData.order.currency,
      name: 'ShopHub',
      description: 'Purchase from ShopHub',
      image: '/logo192.png', // Your logo
      order_id: orderData.order.id,
      handler: async function (response) {
        try {
          // Verify payment on backend
          const { data: verifyData } = await axios.post('/api/payment/verify', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          });

          if (verifyData.success) {
            onSuccess({
              ...response,
              payment_id: verifyData.payment_id
            });
          } else {
            onFailure(new Error('Payment verification failed'));
          }
        } catch (error) {
          console.error('Payment verification error:', error);
          onFailure(error);
        }
      },
      prefill: {
        name: userData.name || '',
        email: userData.email || '',
        contact: userData.phone || ''
      },
      notes: {
        address: userData.address || ''
      },
      theme: {
        color: '#2563eb' // Your primary color
      },
      modal: {
        ondismiss: function () {
          onFailure(new Error('Payment cancelled by user'));
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error('Razorpay initialization error:', error);
    onFailure(error);
  }
};

/**
 * Check if Razorpay is loaded
 */
export const isRazorpayLoaded = () => {
  return typeof window !== 'undefined' && window.Razorpay !== undefined;
};

