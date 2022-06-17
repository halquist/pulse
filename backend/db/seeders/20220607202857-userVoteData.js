'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('UserVotes', [
     {
     userId: 5,
     pollId: 1,
     voteSelection: 1
   },
     {
     userId: 2,
     pollId: 1,
     voteSelection: 2
   },
     {
     userId: 3,
     pollId: 1,
     voteSelection: 2
   },
     {
     userId: 4,
     pollId: 1,
     voteSelection: 2
   },
     {
     userId: 5,
     pollId: 2,
     voteSelection: 1
   },
     {
     userId: 2,
     pollId: 2,
     voteSelection: 2
   },
     {
     userId: 3,
     pollId: 2,
     voteSelection: 2
   },
     {
     userId: 4,
     pollId: 2,
     voteSelection: 2
   },
     {
     userId: 6,
     pollId: 2,
     voteSelection: 1
   },
     {
     userId: 7,
     pollId: 2,
     voteSelection: 2
   },
     {
     userId: 8,
     pollId: 2,
     voteSelection: 2
   },
     {
     userId: 9,
     pollId: 2,
     voteSelection: 2
   },
     {
     userId: 2,
     pollId: 3,
     voteSelection: 2
   },
     {
     userId: 3,
     pollId: 3,
     voteSelection: 1
   },
     {
     userId: 4,
     pollId: 3,
     voteSelection: 2
   },
     {
     userId: 5,
     pollId: 3,
     voteSelection: 2
   },
     {
     userId: 6,
     pollId: 3,
     voteSelection: 1
   },
     {
     userId: 2,
     pollId: 4,
     voteSelection: 2
   },
     {
     userId: 3,
     pollId: 4,
     voteSelection: 1
   },
     {
     userId: 4,
     pollId: 4,
     voteSelection: 2
   },
     {
     userId: 5,
     pollId: 4,
     voteSelection: 2
   },
     {
     userId: 6,
     pollId: 4,
     voteSelection: 1
   },
     {
     userId: 7,
     pollId: 4,
     voteSelection: 2
   },
     {
     userId: 8,
     pollId: 4,
     voteSelection: 1
   },
     {
     userId: 9,
     pollId: 4,
     voteSelection: 1
   },
     {
     userId: 4,
     pollId: 5,
     voteSelection: 2
   },
     {
     userId: 5,
     pollId: 5,
     voteSelection: 2
   },
     {
     userId: 6,
     pollId: 5,
     voteSelection: 1
   },
     {
     userId: 7,
     pollId: 5,
     voteSelection: 2
   },
     {
     userId: 8,
     pollId: 5,
     voteSelection: 1
   },
     {
     userId: 9,
     pollId: 5,
     voteSelection: 2
   },
     {
     userId: 2,
     pollId: 6,
     voteSelection: 2
   },
     {
     userId: 3,
     pollId: 6,
     voteSelection: 1
   },
     {
     userId: 4,
     pollId: 6,
     voteSelection: 1
   },
     {
     userId: 5,
     pollId: 6,
     voteSelection: 1
   },
     {
     userId: 6,
     pollId: 6,
     voteSelection: 2
   },
     {
     userId: 7,
     pollId: 6,
     voteSelection: 2
   },
     {
     userId: 8,
     pollId: 6,
     voteSelection: 2
   },
     {
     userId: 9,
     pollId: 6,
     voteSelection: 2
   },
     {
     userId: 2,
     pollId: 7,
     voteSelection: 2
   },
     {
     userId: 3,
     pollId: 7,
     voteSelection: 1
   },
     {
     userId: 4,
     pollId: 7,
     voteSelection: 2
   },
     {
     userId: 5,
     pollId: 7,
     voteSelection: 1
   },
     {
     userId: 6,
     pollId: 7,
     voteSelection: 2
   },
     {
     userId: 7,
     pollId: 7,
     voteSelection: 2
   },
     {
     userId: 8,
     pollId: 7,
     voteSelection: 2
   },
     {
     userId: 4,
     pollId: 8,
     voteSelection: 2
   },
     {
     userId: 5,
     pollId: 8,
     voteSelection: 1
   },
     {
     userId: 6,
     pollId: 8,
     voteSelection: 2
   },
     {
     userId: 7,
     pollId: 8,
     voteSelection: 2
   },
     {
     userId: 8,
     pollId: 8,
     voteSelection: 2
   },
     {
     userId: 5,
     pollId: 9,
     voteSelection: 1
   },
     {
     userId: 6,
     pollId: 9,
     voteSelection: 2
   },
     {
     userId: 7,
     pollId: 9,
     voteSelection: 2
   },
     {
     userId: 8,
     pollId: 9,
     voteSelection: 1
   },
     {
     userId: 7,
     pollId: 10,
     voteSelection: 2
   },
     {
     userId: 8,
     pollId: 10,
     voteSelection: 1
   },
     {
     userId: 5,
     pollId: 10,
     voteSelection: 1
   },
     {
     userId: 6,
     pollId: 10,
     voteSelection: 2
   },
     {
     userId: 7,
     pollId: 10,
     voteSelection: 1
   },
     {
     userId: 8,
     pollId: 10,
     voteSelection: 1
   },
     {
     userId: 8,
     pollId: 11,
     voteSelection: 1
   },
     {
     userId: 7,
     pollId: 11,
     voteSelection: 2
   },
     {
     userId: 8,
     pollId: 11,
     voteSelection: 1
   },
     {
     userId: 5,
     pollId: 11,
     voteSelection: 1
   },
     {
     userId: 6,
     pollId: 11,
     voteSelection: 2
   },
     {
     userId: 7,
     pollId: 11,
     voteSelection: 2
   },
     {
     userId: 8,
     pollId: 11,
     voteSelection: 1
   },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('UserVotes', null, {});
  }
};
