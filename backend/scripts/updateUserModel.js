const { User } = require('../src/models/User');
const sequelize = require('../src/config/database');

async function updateUserModel() {
  try {
    // Drop and recreate the table
    await User.sync({ force: true });
    console.log('✅ User table reset successfully');
    
    // Create test users
    await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword123'
    });
    
    await User.create({
      username: 'wineadmin',
      email: 'admin@wineschool.com',
      password: 'admin123'
    });
    
    console.log('✅ Test users created');
    
  } catch (error) {
    console.error('❌ Error updating user model:', error);
  } finally {
    await sequelize.close();
  }
}

updateUserModel();
