'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('Comments', [
     {
     body: 'How is this even a debate? Bacon is obviously superior',
     userId: 1,
     pollId: 1,
     topLevel: true,
     commentId: null,
    },
     {
     body: 'Thems fightin words. My family raised pigs and bacon is terrible. Ham 4 life.',
     userId: 2,
     pollId: 1,
     topLevel: false,
     commentId: 1,
    },
    {
      body: 'I love ham.',
      userId: 3,
      pollId: 1,
      topLevel: true,
      commentId: null,
     },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Comments', null, {});
  }
};
