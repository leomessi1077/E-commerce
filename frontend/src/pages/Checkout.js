import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { initiateRazorpayPayment, isRazorpayLoaded } from '../utils/razorpay';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    country: user?.address?.country || 'India',
    phone: user?.phone || '',
    paymentMethod: 'online'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const itemsPrice = getCartTotal();
    const shippingPrice = itemsPrice > 500 ? 0 : 50;
    const taxPrice = itemsPrice * 0.18;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const orderData = {
      orderItems: cartItems.map(item => ({
        product: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.discountPrice || item.product.price,
        image: item.product.images?.[0],
        seller: item.product.seller
      })),
      shippingAddress: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        phone: formData.phone
      },
      paymentMethod: formData.paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice
    };

    try {
      // If payment method is COD, create order directly
      if (formData.paymentMethod === 'cod') {
        const { data } = await axios.post('/api/orders', orderData);
        toast.success('Order placed successfully!');
        clearCart();
        navigate('/orders');
        setLoading(false);
        return;
      }

      // For online payment, initiate Razorpay
      if (formData.paymentMethod === 'online') {
        if (!isRazorpayLoaded()) {
          toast.error('Payment gateway not loaded. Please refresh the page.');
          setLoading(false);
          return;
        }

        initiateRazorpayPayment(
          totalPrice,
          // On payment success
          async (paymentResponse) => {
            try {
              // Update order data with payment info
              const orderWithPayment = {
                ...orderData,
                paymentStatus: 'completed',
                paymentInfo: {
                  razorpay_order_id: paymentResponse.razorpay_order_id,
                  razorpay_payment_id: paymentResponse.razorpay_payment_id,
                  razorpay_signature: paymentResponse.razorpay_signature
                }
              };

              const { data } = await axios.post('/api/orders', orderWithPayment);
              toast.success('Payment successful! Order placed.');
              clearCart();
              navigate('/orders');
            } catch (error) {
              toast.error('Order creation failed after payment. Please contact support.');
              console.error('Order creation error:', error);
            } finally {
              setLoading(false);
            }
          },
          // On payment failure
          (error) => {
            console.error('Payment failed:', error);
            toast.error(error.message || 'Payment failed. Please try again.');
            setLoading(false);
          },
          // User data for prefill
          {
            name: user?.name,
            email: user?.email,
            phone: formData.phone,
            address: `${formData.street}, ${formData.city}`
          }
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to process order');
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const itemsPrice = getCartTotal();
  const shippingPrice = itemsPrice > 500 ? 0 : 50;
  const taxPrice = itemsPrice * 0.18;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Shipping Address */}
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    id="street"
                    name="street"
                    type="text"
                    required
                    value={formData.street}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="City"
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="State"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code *
                    </label>
                    <input
                      id="zipCode"
                      name="zipCode"
                      type="text"
                      required
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="123456"
                    />
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <input
                      id="country"
                      name="country"
                      type="text"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="India"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="+91 1234567890"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              
              <div className="space-y-3">
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                  formData.paymentMethod === 'online' ? 'border-primary-600 bg-primary-50' : 'border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={formData.paymentMethod === 'online'}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">💳 Pay Online (Recommended)</p>
                        <p className="text-sm text-gray-600">Cards, UPI, Net Banking, Wallets</p>
                      </div>
                      <div className="flex gap-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" className="h-6" />
                      </div>
                    </div>
                    {formData.paymentMethod === 'online' && (
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-700">
                          ✅ Secure payment powered by Razorpay<br/>
                          ✅ Supports all major cards, UPI, Net Banking & Wallets<br/>
                          ✅ Instant order confirmation
                        </p>
                      </div>
                    )}
                  </div>
                </label>

                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                  formData.paymentMethod === 'cod' ? 'border-primary-600 bg-primary-50' : 'border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <div>
                    <p className="font-semibold">💵 Cash on Delivery</p>
                    <p className="text-sm text-gray-600">Pay when you receive the order</p>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary"
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.product._id} className="flex gap-3">
                  <img
                    src={item.product.images?.[0] || 'https://via.placeholder.com/60'}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium line-clamp-2">{item.product.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">
                    ₹{((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹{itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">{shippingPrice === 0 ? 'FREE' : `₹${shippingPrice}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (18%)</span>
                <span className="font-semibold">₹{taxPrice.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-primary-600 text-xl">₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

