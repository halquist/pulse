'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    body: {
      type: DataTypes.STRING,
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

  // deletes comments nested under each comment since cascade doesn't work for this and not deleting them first creates a sql error
  Comment.beforeDestroy( async (comment) => {
    const killComment = await Comment.findAll({
      where: {
        commentId: comment.id
      }
    })
    if (killComment.length){
      for (const oneComment of killComment) {
        await oneComment.destroy()
      }
    }
  })

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


  Comment.updateComment = async function ({ id, body }) {
    const comment = await Comment.findByPk( id )
    comment.body = body;

    await comment.save();
    return comment;
  };

  Comment.deleteComment = async function ({ commentId }) {
    // console.log(id)
    const comment = await Comment.findByPk(commentId);
    // console.log('model comment %%%%%%%%%', comment)
    await comment.destroy();

    return {
      message: 'Success'
    }
  }

  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User, { foreignKey: 'userId' })
    Comment.belongsTo(models.Poll, { foreignKey: 'pollId' })
    Comment.belongsTo(models.Comment, { foreignKey: 'id' })
  };
  return Comment;
};
