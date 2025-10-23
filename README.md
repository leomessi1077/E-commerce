# 🛍️ Commerce App - Full Stack E-Commerce Platform

A modern, full-featured e-commerce application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This platform supports both customers and sellers with role-based authentication and beautiful, responsive UI built with Tailwind CSS.

## ✨ Features

### For Customers (Users)
- 🔐 User registration and authentication
- 🛒 Browse products with advanced filtering and search
- 🛍️ Shopping cart with real-time updates
- 💳 Secure checkout with multiple payment options
- 📦 Order tracking and history
- ⭐ Product reviews and ratings
- 📱 Fully responsive design

### For Sellers
- 🏪 Seller registration with business information
- 📦 Product management (Create, Read, Update, Delete)
- 📊 Dashboard with sales analytics
- 🚚 Order management with status updates
- 📷 Multiple product images support
- 💰 Price and discount management

### General Features
- 🎨 Modern, beautiful UI with Tailwind CSS
- 🔒 JWT-based authentication
- 🎭 Role-based access control (User/Seller/Admin)
- 📱 Mobile-responsive design
- 🔍 Advanced product search and filtering
- 🏷️ Category-based product organization
- ⚡ Fast and optimized performance

## 🚀 Tech Stack

### Frontend
- React 18
- React Router v6
- Tailwind CSS
- Axios
- React Toastify
- Heroicons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcryptjs for password hashing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🛠️ Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd "Commerce App"
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file and add your configuration:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/commerce-app
# JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
# JWT_EXPIRE=7d
# NODE_ENV=development

# Start MongoDB (if running locally)
# On Windows: Start MongoDB service
# On Mac/Linux: mongod

# Start the backend server
npm run dev
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The frontend will start on `http://localhost:3000`

## 🗄️ Database Setup

The application will automatically connect to MongoDB when you start the backend server. Make sure MongoDB is running on your system.

### Initial Data Setup (Optional)

You can create some initial categories by making POST requests to `/api/categories` endpoint:

```json
{
  "name": "Electronics",
  "description": "Electronic items and gadgets"
}
```

Example categories: Electronics, Fashion, Home & Kitchen, Books, Sports, Beauty & Personal Care

## 👤 User Roles

### Customer Account
- Register as a "Customer" from the registration page
- Browse and purchase products
- Manage orders and cart
- Leave reviews

### Seller Account
- Register as a "Seller" from the registration page
- Add business information during registration
- Access seller dashboard
- Manage products and orders

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user/seller
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Seller only)
- `PUT /api/products/:id` - Update product (Seller only)
- `DELETE /api/products/:id` - Delete product (Seller only)
- `GET /api/products/seller/my-products` - Get seller's products
- `POST /api/products/:id/reviews` - Add review

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `GET /api/orders/seller/my-orders` - Get seller's orders
- `PUT /api/orders/:id` - Update order status (Seller only)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (Admin only)
- `PUT /api/categories/:id` - Update category (Admin only)
- `DELETE /api/categories/:id` - Delete category (Admin only)

## 📱 Usage Guide

### For Customers

1. **Register/Login**: Create an account as a Customer
2. **Browse Products**: Explore products by category or search
3. **Add to Cart**: Click "Add to Cart" on any product
4. **Checkout**: Proceed to checkout and enter shipping details
5. **Track Orders**: View your order history and status

### For Sellers

1. **Register/Login**: Create an account as a Seller with business info
2. **Add Products**: Go to Seller Dashboard and add your products
3. **Manage Inventory**: Update stock, prices, and product details
4. **Process Orders**: View and update order statuses
5. **Track Performance**: Monitor your sales and products

## 🎨 UI Features

- **Modern Design**: Clean and professional interface
- **Responsive Layout**: Works perfectly on mobile, tablet, and desktop
- **Smooth Animations**: Hover effects and transitions
- **Intuitive Navigation**: Easy-to-use navigation system
- **Loading States**: Visual feedback during data fetching
- **Toast Notifications**: Real-time feedback for user actions

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- Role-based access control
- Input validation
- Secure HTTP headers

## 🚧 Future Enhancements

- [ ] Payment gateway integration (Stripe, Razorpay)
- [ ] Email notifications
- [ ] Advanced analytics for sellers
- [ ] Wishlist functionality
- [ ] Product recommendations
- [ ] Live chat support
- [ ] Multiple language support
- [ ] Social media integration
- [ ] Admin panel for platform management
- [ ] Image upload to cloud storage (Cloudinary)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Built with ❤️ using the MERN Stack

## 📞 Support

For support, please open an issue in the GitHub repository.

---

**Happy Shopping! 🛒**

