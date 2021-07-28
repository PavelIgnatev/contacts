'use strict';

module.exports = {
  root: true,
  extends: [
    require.resolve('./es'),
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
};
