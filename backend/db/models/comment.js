'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pollId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    topLevel: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    commentId: {
      type: DataTypes.INTEGER,
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
