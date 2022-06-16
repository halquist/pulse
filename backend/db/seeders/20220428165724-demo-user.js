'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [
        {
          email: 'demo@user.io',
          username: 'pollster',
          bpm: '500',
          hashedPassword: bcrypt.hashSync('password1')
        },
        {
          email: 'fred@user.io',
          username: 'fredoutofbed',
          bpm: '500',
          hashedPassword: bcrypt.hashSync('password2')
        },
        {
          email: 'tina@user.io',
          username: 'harvest_cheddar',
          hashedPassword: bcrypt.hashSync('password3')
        },
        {
          email: 'bob@user.io',
          username: 'mentalCritic',
          hashedPassword: bcrypt.hashSync('password4')
        },
        {
          email: 'sharon@user.io',
          username: 'clashMaster',
          hashedPassword: bcrypt.hashSync('password5')
        },
        {
          email: 'greg@user.io',
          username: 'internet_guru',
          hashedPassword: bcrypt.hashSync('password6')
        },
        {
          email: 'hailey@user.io',
          username: 'heavenJockey',
          hashedPassword: bcrypt.hashSync('password7')
        },
        {
          email: 'alan@user.io',
          username: 'broken_promise',
          hashedPassword: bcrypt.hashSync('password8')
        },
        {
          email: 'sheila@user.io',
          username: 'radDad',
          hashedPassword: bcrypt.hashSync('password9')
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Users', null, {});
  }
};
