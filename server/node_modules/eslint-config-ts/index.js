'use strict';

module.exports = {
  overrides: [

    // es config!!!
    {
      files: [ '**/*.js', '**/*.mjs' ],
      extends: [
        require.resolve('./node'),
      ],
    },

    // jsx config!!!
    {
      files: [ '**/*.jsx' ],
      extends: [
        require.resolve('./react'),
      ],
    },

    // ts config!!!
    {
      files: [ '**/*.ts' ],
      extends: [
        require.resolve('./ts'),
      ],
    },

    // tsx config!!!
    {
      files: [ '**/*.tsx' ],
      extends: [
        require.resolve('./tsx'),
      ],
    },
  ],
};
