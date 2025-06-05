const User = require('./src/models/User').default;
const sequelize = require('./src/config/database');

async function createTestUser() {
  try {
    await sequelize.sync();
    
    const testUser = await User.create({
      email: 'test@example.com',
      password: 'testpassword123'
    });
    
    console.log('Test user created:', testUser.email);
  } catch (error) {
    console.error('Error creating test user:', error);
  } finally {
    process.exit();
  }
}

createTestUser();
