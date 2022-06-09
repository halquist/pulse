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

  Poll.createPoll = async function ({ title, description, optionOneTitle, optionTwoTitle, userId }) {
    const poll = await Poll.create({
      title,
      description,
      optionOneTitle,
      optionTwoTitle,
      userId
    });
    return await Poll.findByPk(poll.id);
  };

  Poll.updatePoll = async function ({ pollId, title, description, optionOneTitle, optionTwoTitle, optionOneVotes, optionTwoVotes }) {
    const poll = await Poll.findByPk( pollId )
    poll.title = title;
    poll.description = description;
    poll.optionOneTitle = optionOneTitle;
    poll.optionTwoTitle = optionTwoTitle;
    poll.optionOneVotes = optionOneVotes;
    poll.optionTwoVotes = optionTwoVotes;
    await poll.save();
    return poll;
  };

  Poll.deletePoll = async function ({ pollId }) {
    const poll = await Poll.findByPk(pollId);
    await poll.destroy();
    return {
      message: 'Success'
    }
  }

  Poll.associate = function(models) {
    // associations can be defined here
    Poll.belongsTo(models.User, { foreignKey: 'userId' })
    Poll.hasMany(models.Comment, { foreignKey: 'pollId' })
    Poll.hasMany(models.UserVote, { foreignKey: 'pollId' })
  };
  return Poll;
};
