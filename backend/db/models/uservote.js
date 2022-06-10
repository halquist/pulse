'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserVote = sequelize.define('UserVote', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pollId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    voteSelection: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});

  UserVote.createVote = async function ({ userId, pollId, voteSelection }) {
    const vote = await UserVote.create({
      userId,
      pollId,
      voteSelection
    });

    return vote;
  };

  UserVote.associate = function(models) {
    // associations can be defined here
    UserVote.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' })
    UserVote.belongsTo(models.Poll, { foreignKey: 'pollId', onDelete: 'CASCADE' })
  };
  return UserVote;
};
