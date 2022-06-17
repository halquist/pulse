'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [
        {
          email: 'demo@user.io',
          username: 'pollster',
          hashedPassword: bcrypt.hashSync('password1'),
          profileImageUrl: null
        },
        {
          email: 'fred@user.io',
          username: 'fredoutofbed',
          hashedPassword: bcrypt.hashSync('password2'),
          profileImageUrl: 'https://cdn.pixabay.com/photo/2017/09/25/13/14/dog-2785077_960_720.jpg'
        },
        {
          email: 'tina@user.io',
          username: 'harvest_cheddar',
          hashedPassword: bcrypt.hashSync('password3'),
          profileImageUrl: 'https://cdn.pixabay.com/photo/2016/07/25/00/24/gem-1539624_960_720.png'
        },
        {
          email: 'bob@user.io',
          username: 'mentalCritic',
          hashedPassword: bcrypt.hashSync('password4'),
          profileImageUrl: 'https://cdn.pixabay.com/photo/2012/04/26/19/47/penguin-42936_960_720.png'
        },
        {
          email: 'sharon@user.io',
          username: 'clashMaster',
          hashedPassword: bcrypt.hashSync('password5'),
          profileImageUrl: 'https://cdn.pixabay.com/photo/2016/04/01/09/29/cartoon-1299393_960_720.png'
        },
        {
          email: 'greg@user.io',
          username: 'internet_guru',
          hashedPassword: bcrypt.hashSync('password6'),
          profileImageUrl: 'https://cdn.pixabay.com/photo/2014/12/27/17/36/sun-581299_960_720.jpg'
        },
        {
          email: 'hailey@user.io',
          username: 'heavenJockey',
          hashedPassword: bcrypt.hashSync('password7'),
          profileImageUrl: 'https://cdn.pixabay.com/photo/2016/12/06/01/26/colour-1885352_960_720.jpg'
        },
        {
          email: 'alan@user.io',
          username: 'broken_promise',
          hashedPassword: bcrypt.hashSync('password8'),
          profileImageUrl: 'https://cdn.pixabay.com/photo/2016/04/30/15/11/flame-1363095_960_720.jpg'
        },
        {
          email: 'sheila@user.io',
          username: 'radDad',
          hashedPassword: bcrypt.hashSync('password9'),
          profileImageUrl: 'https://cdn.pixabay.com/photo/2017/03/14/17/43/mountain-2143877_960_720.jpg'
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Users', null, {});
  }
};
