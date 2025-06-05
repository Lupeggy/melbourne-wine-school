const db = require('./config/database');
const User = require('./models/User');

async function syncDatabase() {
  try {
    // Test the connection first
    await db.authenticate();
    console.log('✅ Database connection has been established successfully.');
    
    // Sync all models
    await db.sync({ force: false, alter: true }); // Set force: true to drop tables and recreate them
    console.log('✅ Database synchronized');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Unable to sync the database:', error);
    process.exit(1);
  }
}

syncDatabase();
