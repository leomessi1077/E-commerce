const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const fixIndexes = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB Connected');

    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');

    // Get all indexes
    const indexes = await usersCollection.indexes();
    console.log('\nCurrent indexes:', indexes);

    // Drop the username index if it exists
    try {
      await usersCollection.dropIndex('username_1');
      console.log('\n✅ Dropped username_1 index successfully!');
    } catch (error) {
      if (error.code === 27) {
        console.log('\n✅ username_1 index does not exist (already clean)');
      } else {
        console.log('\n⚠️  Could not drop index:', error.message);
      }
    }

    console.log('\n✅ Database indexes fixed!');
    console.log('\n🎉 You can now register users without errors!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error fixing indexes:', error);
    process.exit(1);
  }
};

// Run the fix
fixIndexes();

