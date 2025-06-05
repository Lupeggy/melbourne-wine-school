const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '31902991',
  database: process.env.DB_NAME || 'melbourne_wine_school'
});

async function addUsernameColumn() {
  const queryInterface = sequelize.getQueryInterface();
  
  try {
    // Add username column
    await queryInterface.addColumn('users', 'username', {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      defaultValue: 'temp_username' // Temporary default for existing rows
    });
    
    console.log('✅ Added username column');
    
    // Update existing rows with proper usernames
    await sequelize.query(
      "UPDATE users SET username = CONCAT('user', id) WHERE username = 'temp_username'"
    );
    
    console.log('✅ Updated existing users with usernames');
    
    // Remove default value
    await queryInterface.changeColumn('users', 'username', {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    });
    
    console.log('✅ Removed temporary default value');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await sequelize.close();
  }
}

addUsernameColumn();
