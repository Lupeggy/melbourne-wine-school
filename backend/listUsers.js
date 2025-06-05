const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '31902991',
  database: process.env.DB_NAME || 'melbourne_wine_school'
});

const User = sequelize.define('User', {
  email: DataTypes.STRING,
  username: DataTypes.STRING,
  password: DataTypes.STRING
}, { tableName: 'users' });

(async () => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'username', 'createdAt'],
      raw: true
    });
    console.log('Current users in database:');
    console.table(users);
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    await sequelize.close();
  }
})();
