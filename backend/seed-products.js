const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const Category = require('./models/Category');
const User = require('./models/User');

// Load environment variables
dotenv.config();

// Sample products data with real images
const createSampleProducts = async (sellerId, categories) => {
  const electronicsId = categories.find(c => c.name === 'Electronics')?._id;
  const fashionId = categories.find(c => c.name === 'Fashion & Apparel')?._id;
  const homeId = categories.find(c => c.name === 'Home & Kitchen')?._id;

  return [
    {
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Latest flagship smartphone with 200MP camera, 6.8" Dynamic AMOLED display, Snapdragon 8 Gen 3, 12GB RAM, 256GB storage',
      price: 124999,
      discountPrice: 119999,
      category: electronicsId,
      images: [
        'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'
      ],
      stock: 25,
      brand: 'Samsung',
      seller: sellerId,
      ratings: { average: 4.7, count: 128 },
      isActive: true
    },
    {
      name: 'MacBook Pro 14-inch M3',
      description: 'Powerful laptop with M3 chip, 16GB unified memory, 512GB SSD, stunning Retina display, perfect for professionals',
      price: 199000,
      discountPrice: 189000,
      category: electronicsId,
      images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500'
      ],
      stock: 15,
      brand: 'Apple',
      seller: sellerId,
      ratings: { average: 4.9, count: 256 },
      isActive: true
    },
    {
      name: 'Sony WH-1000XM5 Headphones',
      description: 'Industry-leading noise cancellation, exceptional sound quality, 30hr battery life, premium comfort',
      price: 29990,
      discountPrice: 24990,
      category: electronicsId,
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500'
      ],
      stock: 40,
      brand: 'Sony',
      seller: sellerId,
      ratings: { average: 4.8, count: 342 },
      isActive: true
    },
    {
      name: 'Apple Watch Series 9',
      description: 'Advanced health features, always-on Retina display, powerful fitness tracking, GPS + Cellular',
      price: 45900,
      discountPrice: 42900,
      category: electronicsId,
      images: [
        'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
      ],
      stock: 30,
      brand: 'Apple',
      seller: sellerId,
      ratings: { average: 4.6, count: 189 },
      isActive: true
    },
    {
      name: 'Canon EOS R6 Camera',
      description: 'Professional mirrorless camera, 20MP full-frame sensor, 4K 60fps video, advanced autofocus',
      price: 219999,
      discountPrice: 209999,
      category: electronicsId,
      images: [
        'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500',
        'https://images.unsplash.com/photo-1606980624346-253a0e0dcfb3?w=500'
      ],
      stock: 12,
      brand: 'Canon',
      seller: sellerId,
      ratings: { average: 4.9, count: 87 },
      isActive: true
    },
    {
      name: 'Premium Cotton T-Shirt',
      description: 'Soft, breathable 100% cotton t-shirt, perfect fit, available in multiple colors, premium quality',
      price: 999,
      discountPrice: 699,
      category: fashionId,
      images: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500'
      ],
      stock: 150,
      brand: 'Nike',
      seller: sellerId,
      ratings: { average: 4.4, count: 523 },
      isActive: true
    },
    {
      name: 'Nike Air Max Sneakers',
      description: 'Classic design meets modern comfort, Air cushioning, durable rubber outsole, premium materials',
      price: 8995,
      discountPrice: 7495,
      category: fashionId,
      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500'
      ],
      stock: 75,
      brand: 'Nike',
      seller: sellerId,
      ratings: { average: 4.7, count: 412 },
      isActive: true
    },
    {
      name: 'Levi\'s Classic Jeans',
      description: 'Timeless denim style, comfortable fit, durable fabric, perfect for everyday wear',
      price: 3499,
      discountPrice: 2799,
      category: fashionId,
      images: [
        'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
        'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=500'
      ],
      stock: 100,
      brand: 'Levi\'s',
      seller: sellerId,
      ratings: { average: 4.5, count: 678 },
      isActive: true
    },
    {
      name: 'Ray-Ban Aviator Sunglasses',
      description: 'Iconic design, UV protection, metal frame, premium lenses, timeless style',
      price: 8900,
      discountPrice: 7500,
      category: fashionId,
      images: [
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500'
      ],
      stock: 60,
      brand: 'Ray-Ban',
      seller: sellerId,
      ratings: { average: 4.6, count: 234 },
      isActive: true
    },
    {
      name: 'Philips Air Fryer',
      description: 'Healthy cooking with 90% less fat, 4.1L capacity, rapid air technology, 7 preset programs',
      price: 12999,
      discountPrice: 9999,
      category: homeId,
      images: [
        'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500',
        'https://images.unsplash.com/photo-1595252183034-6673ea0d6f33?w=500'
      ],
      stock: 45,
      brand: 'Philips',
      seller: sellerId,
      ratings: { average: 4.7, count: 567 },
      isActive: true
    },
    {
      name: 'Nespresso Coffee Maker',
      description: 'Professional espresso machine, 19 bar pressure, milk frother, compact design, cafe-quality coffee',
      price: 18999,
      discountPrice: 15999,
      category: homeId,
      images: [
        'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500'
      ],
      stock: 35,
      brand: 'Nespresso',
      seller: sellerId,
      ratings: { average: 4.8, count: 423 },
      isActive: true
    },
    {
      name: 'Dyson V11 Vacuum Cleaner',
      description: 'Powerful cordless vacuum, intelligent cleaning, 60 min runtime, HEPA filtration',
      price: 49900,
      discountPrice: 44900,
      category: homeId,
      images: [
        'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500',
        'https://images.unsplash.com/photo-1574269937203-62d446b7c683?w=500'
      ],
      stock: 20,
      brand: 'Dyson',
      seller: sellerId,
      ratings: { average: 4.9, count: 312 },
      isActive: true
    }
  ];
};

// Main seed function
const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB Connected');

    // Get or create a demo seller
    let seller = await User.findOne({ email: 'demo.seller@shophub.com' });
    
    if (!seller) {
      console.log('Creating demo seller account...');
      seller = await User.create({
        name: 'ShopHub Demo Store',
        email: 'demo.seller@shophub.com',
        password: 'seller123',
        role: 'seller',
        phone: '+919876543210',
        businessName: 'ShopHub Premium Store',
        businessDescription: 'Your trusted source for quality products',
        isVerified: true
      });
      console.log('Demo seller created!');
    }

    // Get categories
    const categories = await Category.find();
    
    if (categories.length === 0) {
      console.log('❌ No categories found! Please run: npm run seed first');
      process.exit(1);
    }

    // Clear existing products
    await Product.deleteMany({});
    console.log('Existing products cleared');

    // Create sample products
    const products = await createSampleProducts(seller._id, categories);
    const createdProducts = await Product.insertMany(products);
    
    console.log(`\n✅ ${createdProducts.length} sample products created successfully!\n`);
    
    console.log('Products added:');
    createdProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - ₹${product.discountPrice || product.price} (${product.stock} in stock)`);
    });

    console.log('\n🎉 Database seeded with products!');
    console.log('\n📝 Demo Seller Credentials:');
    console.log('   Email: demo.seller@shophub.com');
    console.log('   Password: seller123');
    console.log('\n🌐 Now refresh your browser at: http://localhost:3000');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

// Run the seed function
seedProducts();

