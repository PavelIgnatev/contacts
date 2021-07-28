'use strict';

module.exports = {
  extends: [
    require.resolve('./ts'),
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  env: {
    browser: true,
  },
};
