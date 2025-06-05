const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '31902991',
  database: process.env.DB_NAME || 'melbourne_wine_school',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  
  pool: {
    max: 5,
    min: 0,
    acquire: 60000, // 60 seconds to acquire connection
    idle: 10000 // Keep idle connection for 10s
  },
  
  dialectOptions: {
    connectTimeout: 60000, // 60s connection timeout
    // MySQL keep-alive
    socketPath: process.env.DB_SOCKET_PATH,
    supportBigNumbers: true,
    bigNumberStrings: true
  },
  
  // Keep connections alive
  keepDefaultTimezone: true,
  timezone: '+00:00'
});

// Test connection periodically
setInterval(() => {
  sequelize.query('SELECT 1').catch(err => {
    console.error('Connection keep-alive failed:', err);
  });
}, 5000); // Every 5 seconds

module.exports = sequelize;
