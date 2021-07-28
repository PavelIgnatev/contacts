'use strict';

module.exports = {
  extends: [
    'eslint:recommended',
    require.resolve('./es5'),
    require.resolve('./rules/es6'),
    require.resolve('./rules/es8'),
    require.resolve('./rules/es9'),
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 10,
  },
};
