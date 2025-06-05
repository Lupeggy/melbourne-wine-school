const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '31902991',
  database: 'melbourne_wine_school'
});

async function migrate() {
  const transaction = await sequelize.transaction();
  
  try {
    // 1. Drop unique constraint on email temporarily
    await sequelize.query(
      'ALTER TABLE users DROP INDEX email',
      { transaction }
    );
    
    // 2. Add username column without constraints
    await sequelize.query(
      'ALTER TABLE users ADD COLUMN username VARCHAR(255) AFTER id',
      { transaction }
    );
    
    // 3. Update existing users with generated usernames
    await sequelize.query(
      "UPDATE users SET username = CONCAT('user', id)",
      { transaction }
    );
    
    // 4. Add constraints
    await sequelize.query(
      'ALTER TABLE users MODIFY username VARCHAR(255) NOT NULL',
      { transaction }
    );
    
    await sequelize.query(
      'ALTER TABLE users ADD UNIQUE INDEX (username)',
      { transaction }
    );
    
    await sequelize.query(
      'ALTER TABLE users ADD UNIQUE INDEX (email)',
      { transaction }
    );
    
    await transaction.commit();
    console.log('✅ Migration completed successfully');
    
  } catch (error) {
    await transaction.rollback();
    console.error('❌ Migration failed:', error);
  } finally {
    await sequelize.close();
  }
}

migrate();
