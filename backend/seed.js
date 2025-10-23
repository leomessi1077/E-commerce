const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');

// Load environment variables
dotenv.config();

// Sample categories data
const categories = [
  {
    name: 'Electronics',
    description: 'Latest electronic gadgets and devices',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400'
  },
  {
    name: 'Fashion & Apparel',
    description: 'Trendy clothing and accessories',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400'
  },
  {
    name: 'Home & Kitchen',
    description: 'Everything for your home and kitchen',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400'
  },
  {
    name: 'Books & Stationery',
    description: 'Books, office supplies, and stationery',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400'
  },
  {
    name: 'Sports & Fitness',
    description: 'Sports equipment and fitness gear',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400'
  },
  {
    name: 'Beauty & Personal Care',
    description: 'Beauty products and personal care items',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400'
  },
  {
    name: 'Toys & Games',
    description: 'Fun toys and games for all ages',
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400'
  },
  {
    name: 'Automotive',
    description: 'Car accessories and automotive parts',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400'
  }
];

// Connect to database and seed data
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/commerce-app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB Connected');

    // Clear existing categories
    await Category.deleteMany({});
    console.log('Existing categories cleared');

    // Insert new categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`${createdCategories.length} categories created successfully!`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\nCategories created:');
    createdCategories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.name} (ID: ${cat._id})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();

