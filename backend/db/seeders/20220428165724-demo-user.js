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
          profileImageUrl: 'https://pixabay.com/get/g51b4e8a9daf312fd3b6a3c215ea25f259719a2b9c58607b41d147ef6bcecea4e6a63e3d84f27d6cc427e461f11d56823_640.jpg'
        },
        {
          email: 'tina@user.io',
          username: 'harvest_cheddar',
          hashedPassword: bcrypt.hashSync('password3'),
          profileImageUrl: 'https://pixabay.com/get/g040eafeaffbfb2952d71c456c2fc6ebdd2be2b7b92ba709b010f78f24e39676be4f80f242eb92bc60a4f5a0ef1d24feb3be640149fd49c6e75d98eb170a5e10c_640.png'
        },
        {
          email: 'bob@user.io',
          username: 'mentalCritic',
          hashedPassword: bcrypt.hashSync('password4'),
          profileImageUrl: 'https://pixabay.com/get/g93368ea255e4359d8cfa1563ce10b87e36964927c9830b340cc195632165c1d686267cd8de54b726994e7c8d1c41164bf1d2f939888a330da7b293bfda8be508_640.png'
        },
        {
          email: 'sharon@user.io',
          username: 'clashMaster',
          hashedPassword: bcrypt.hashSync('password5'),
          profileImageUrl: 'https://pixabay.com/get/g62be0e061f662ae9f2625a2a0ad8b8eeb5e2c5a2d38234e192e944eb513892e8cd5527b9bacc0c320364f144ac6a0ba155abc58bacf29d77f592d1156a29d08e_640.jpg'
        },
        {
          email: 'greg@user.io',
          username: 'internet_guru',
          hashedPassword: bcrypt.hashSync('password6'),
          profileImageUrl: 'https://pixabay.com/get/g55d6b41a810f4e70f9041089ec22bf363534a08b5fab1bde2c96cacf912c9c35c23905d74b01f071f9ab56614b9a3ca70f221dab11f4d028609d53bd0349da4b_640.png'
        },
        {
          email: 'hailey@user.io',
          username: 'heavenJockey',
          hashedPassword: bcrypt.hashSync('password7'),
          profileImageUrl: 'https://pixabay.com/get/gfba2d3fd9c1ff5930d2da2eade54f4d38dffbe70bb7aec8b9eb201ce391bc9aa4f1c512c804763a4930b8b208b138520_640.png'
        },
        {
          email: 'alan@user.io',
          username: 'broken_promise',
          hashedPassword: bcrypt.hashSync('password8'),
          profileImageUrl: 'https://pixabay.com/get/gf74dc51dca4c22661df3acae7afd271fd908d70d6210e320dd11fb4f25bbbecb6fa0f0c4d3e30c1d8b6288514140f85e7ab0c92799090cd4a8fd7a5cb3e37578_640.png'
        },
        {
          email: 'sheila@user.io',
          username: 'radDad',
          hashedPassword: bcrypt.hashSync('password9'),
          profileImageUrl: 'https://pixabay.com/get/g8762c0a318ad5dc43fc7bb6f08e34cf567de424079b1bd29e48beea141a6a30d04899a3f9780017af47bfee42e5e710876f7e131e38ab92c4363001e1ceca69e_640.jpg'
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Users', null, {});
  }
};
