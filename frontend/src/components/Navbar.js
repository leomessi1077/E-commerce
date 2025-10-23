import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, isAuthenticated, logout, isSeller } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white px-4 py-2 rounded-lg font-bold text-xl">
              ShopHub
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Products
            </Link>
            
            {isAuthenticated ? (
              <>
                {isSeller ? (
                  <Link to="/seller/dashboard" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link to="/orders" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                      My Orders
                    </Link>
                    <Link to="/cart" className="relative text-gray-700 hover:text-primary-600 font-medium transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {getCartCount() > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {getCartCount()}
                        </span>
                      )}
                    </Link>
                  </>
                )}
                
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">Hi, {user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-primary-600 font-medium hover:text-primary-700 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">
                Home
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-primary-600 font-medium">
                Products
              </Link>
              
              {isAuthenticated ? (
                <>
                  {isSeller ? (
                    <Link to="/seller/dashboard" className="text-gray-700 hover:text-primary-600 font-medium">
                      Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link to="/orders" className="text-gray-700 hover:text-primary-600 font-medium">
                        My Orders
                      </Link>
                      <Link to="/cart" className="text-gray-700 hover:text-primary-600 font-medium">
                        Cart ({getCartCount()})
                      </Link>
                    </>
                  )}
                  
                  <div className="pt-3 border-t">
                    <p className="text-sm text-gray-600 mb-2">Hi, {user?.name}</p>
                    <button
                      onClick={handleLogout}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 w-full"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-3 border-t">
                  <Link to="/login" className="text-primary-600 font-medium text-center">
                    Login
                  </Link>
                  <Link to="/register" className="bg-primary-600 text-white px-4 py-2 rounded-lg text-center">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

