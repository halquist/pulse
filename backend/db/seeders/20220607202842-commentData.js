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
     {
     body: 'Cats are literally the best thing that has ever existed.',
     userId: 3,
     pollId: 2,
     topLevel: true,
     commentId: null,
    },
     {
     body: 'Yeah cats are why I get out of bed in the evening',
     userId: 4,
     pollId: 2,
     topLevel: false,
     commentId: 4,
    },
    {
      body: 'Dogs love unconditionally and with abandon, we could learn a lot from them',
      userId: 5,
      pollId: 2,
      topLevel: true,
      commentId: null,
     },
     {
     body: 'Omg chocolate how is this even a question.',
     userId: 5,
     pollId: 3,
     topLevel: true,
     commentId: null,
    },
     {
     body: 'I like neopolitan. Best of both worlds, with strawberry',
     userId: 6,
     pollId: 3,
     topLevel: false,
     commentId: 7,
    },
    {
      body: 'Vanilla is so pure, so sweets, so...vanilla.',
      userId: 7,
      pollId: 3,
      topLevel: true,
      commentId: null,
     },
     {
     body: 'Picard is best. Not even close.',
     userId: 7,
     pollId: 4,
     topLevel: true,
     commentId: null,
    },
     {
     body: 'Yeah for real!',
     userId: 8,
     pollId: 4,
     topLevel: false,
     commentId: 10,
    },
    {
      body: 'Shatner made me laugh, Stewart made me think.',
      userId: 9,
      pollId: 4,
      topLevel: true,
      commentId: null,
     },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Comments', null, {});
  }
};
