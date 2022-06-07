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
  ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('UserVotes', null, {});
  }
};
