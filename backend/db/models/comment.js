'use strict';

const { Sequelize } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    body: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    pollId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    topLevel: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    commentId: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User, { foreignKey: 'userId' })
    Comment.belongsTo(models.Poll, { foreignKey: 'pollId' })
    Comment.belongsTo(models.Comment, { foreignKey: 'id' })
  };
  return Comment;
};
