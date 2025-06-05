'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
    
    // Add email validation constraint
    await queryInterface.addConstraint('users', {
      fields: ['email'],
      type: 'check',
      where: {
        email: {
          [Sequelize.Op.regexp]: '^[\\w\\-\\+]+(\\.[\\w\\-\\+]+)*@[\\w\\-\\+]+(\\.[\\w\\-\\+]+)*(\\.[a-zA-Z]{2,})$'
        }
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
