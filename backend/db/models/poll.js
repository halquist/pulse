'use strict';
module.exports = (sequelize, DataTypes) => {
  const Poll = sequelize.define('Poll', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    optionOneTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    optionTwoTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    optionOneVotes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    optionTwoVotes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endTime: {
      type: DataTypes.DATE,
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
