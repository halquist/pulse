'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserVote = sequelize.define('UserVote', {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    pollId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    voteSelection: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  }, {});
  UserVote.associate = function(models) {
    // associations can be defined here
    UserVote.belongsTo(models.User, { foreignKey: 'userId' })
    UserVote.belongsTo(models.Poll, { foreignKey: 'pollId' })
  };
  return UserVote;
};
