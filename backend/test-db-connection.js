const sequelize = require('./src/config/database');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

console.log('Using DB credentials:', {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ? '*****' : 'NOT SET'
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connection established successfully');
    
    const [results] = await sequelize.query('SELECT 1 + 1 AS result');
    console.log('✅ Simple query test:', results[0]);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ MySQL connection error details:', error);
    process.exit(1);
  }
}

testConnection();
