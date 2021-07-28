# eslint-config-ts

Node Style Guide for Typescript.

## 💿 Installation

```bash
$ npm i eslint eslint-config-ts typescript -D
```

### Requirements

- Node.js `^6.5.0`, `^8.0.0`, `^9.0.0` or newer versions.
- ESLint `^4.19.1` or newer versions.

## 📖 Usage

- `.eslintrc.js`

```js
module.exports = {
  extends: 'eslint-config-ts',
};
```

### Use with Experimental Features

If you want to use eslint-config-ts with experimental features, you should use `babel-eslint` parser:

- `.eslintrc.js`

```js
module.exports = {
  extends: 'eslint-config-ts',
  parser: 'babel-eslint',
};
```

### Use with React in Front-End

If you want to use eslint-config-ts with react, jsx and es6 modules:

- `.eslintrc.js`

```js
module.exports = {
  extends: 'eslint-config-ts/react',
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
};
```

## 🚥 Semantic Versioning Policy

This plugin follows [semantic versioning](http://semver.org/) and [ESLint's Semantic Versioning Policy](https://github.com/eslint/eslint#semantic-versioning-policy).

## 📰 Changelog

- [CHANGELOG](./CHANGELOG.md)

## License

[MIT](LICENSE)
