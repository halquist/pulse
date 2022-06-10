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

  Comment.createComment = async function ({ body, userId, pollId, commentId, topLevel }) {
    const comment = await Comment.create({
      body,
      userId,
      pollId,
      commentId,
      topLevel
    });

    return comment;
  };

  Comment.deleteComment = async function ({ id }) {
    const comment = await Comment.findByPk(id);

    await comment.destroy();

    return {
      message: 'Success'
    }
  }

  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User, { foreignKey: 'userId' })
    Comment.belongsTo(models.Poll, { foreignKey: 'pollId' })
    Comment.belongsTo(models.Comment, { foreignKey: 'id', onDelete: 'CASCADE' })
  };
  return Comment;
};
