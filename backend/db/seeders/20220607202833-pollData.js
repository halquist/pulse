'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('Polls', [
     {
     userId: 1,
     title: 'Bacon vs Ham',
     description: 'Crispy fatty goodness, or thick and savory. Salt abounds.',
     imageUrl: null,
     optionOneTitle: 'Bacon',
     optionTwoTitle: 'Ham',
     optionOneVotes: 432,
     optionTwoVotes: 267,
     startTime: null,
     endTime: null,
   }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Polls', null, {});
  }
};
