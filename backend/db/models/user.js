'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
        isEmail(value) {
          if(!Validator.isEmail(value)) {
            throw new Error('Please enter valid email')
          }
        }
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
    bpm: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    profileImageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    },
  scopes: {
    currentUser: {
      attributes: { exclude: ['hashedPassword'] }
    },
    loginUser: {
      attributes: {}
    }
  }
});

  User.prototype.toSafeObject = function () {
    const { id, username, email, profileImageUrl, bpm } = this;
    return { id, username, email, profileImageUrl, bpm };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ username, email, password, profileImageUrl }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword,
      profileImageUrl
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  User.addBpm = async function ({id, bpm, addOrSubtract}) {
    const user = await User.scope('currentUser').findByPk(id);
    if(addOrSubtract = 'add') {
      user.bpm = user.bpm + bpm;
    } else if (addOrSubtract = 'subtract') {
      user.bpm = user.bpm - bpm;
    }
    await user.save();
    return user;
  }

  User.changeImage = async function ({id, profileImageUrl}) {
    const user = await User.scope('currentUser').findByPk(id);
    user.profileImageUrl = profileImageUrl;
    await user.save();
    return user;
  }

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Poll, { foreignKey: 'userId' })
    User.hasMany(models.Comment, { foreignKey: 'userId' })
    User.hasMany(models.UserVote, { foreignKey: 'userId' })
  };
  return User;
};
