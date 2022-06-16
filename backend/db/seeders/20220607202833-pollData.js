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
        optionOneVotes: 0,
        optionTwoVotes: 0,
        startTime: null,
        endTime: null,
      },
        {
        userId: 2,
        title: 'Cats or Dogs?',
        description: 'I grew up with dogs and they are amazing, but as I got older I began to appreciate the maturity and independence of cats. But litter boxes suck.',
        imageUrl: null,
        optionOneTitle: 'Cats',
        optionTwoTitle: 'Dogs',
        optionOneVotes: 0,
        optionTwoVotes: 0,
        startTime: null,
        endTime: null,
      },
        {
        userId: 3,
        title: 'Chocolate Ice Cream or Vanilla Ice Cream?',
        description: 'Chocolate is the best! But a good scoop of vanilla with pie hits the spot. With that said, can you really judge something better than another when it requires an outside context to reach it\'s full potential?',
        imageUrl: null,
        optionOneTitle: 'Chocolate Ice Cream',
        optionTwoTitle: 'Vanilla Ice Cream',
        optionOneVotes: 0,
        optionTwoVotes: 0,
        startTime: null,
        endTime: null,
      },
        {
        userId: 4,
        title: 'James T. Kirk or Jean-Luc Picard?',
        description: "It is hard to beat the original William Shatner, but Patrick Stewart's dignified demeanor is almost unbeatable",
        imageUrl: null,
        optionOneTitle: 'James T. Kirk',
        optionTwoTitle: 'Jean-Luc Picard',
        optionOneVotes: 0,
        optionTwoVotes: 0,
        startTime: null,
        endTime: null,
      },
    ],{});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Polls', null, {});
  }
};
