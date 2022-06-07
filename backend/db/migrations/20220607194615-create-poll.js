'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Polls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      imageUrl: {
        type: Sequelize.STRING(2048)
      },
      optionOneTitle: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      optionTwoTitle: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      optionOneVotes: {
        type: Sequelize.INTEGER
      },
      optionTwoVotes: {
        type: Sequelize.INTEGER
      },
      startTime: {
        type: Sequelize.DATE
      },
      endTime: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Polls');
  }
};
