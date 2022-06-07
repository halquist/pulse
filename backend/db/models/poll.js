'use strict';
module.exports = (sequelize, DataTypes) => {
  const Poll = sequelize.define('Poll', {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: true
    },
    optionOneTitle: {
      type: Sequelize.STRING,
      allowNull: false
    },
    optionTwoTitle: {
      type: Sequelize.STRING,
      allowNull: false
    },
    optionOneVotes: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    optionTwoVotes: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    startTime: {
      type: Sequelize.DATE,
      allowNull: true
    },
    endTime: {
      type: Sequelize.DATE,
      allowNull: true
    },
  }, {});
  Poll.associate = function(models) {
    // associations can be defined here
    Poll.belongsTo(models.User, { foreignKey: 'userId' })
    Poll.hasMany(models.Comment, { foreignKey: 'pollId' })
    Poll.hasMany(models.UserVote, { foreignKey: 'pollId' })
  };
  return Poll;
};
