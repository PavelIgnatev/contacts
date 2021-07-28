
module.exports = {
  "overrides": [
    {
      "files": ["./*.js", "rules/*.js", "test/*.js", "test/fixtures/{normal-app,ts-app,react-app}/**/*.{js,jsx}"],
      "extends": ["./index.js"]
    },
    {
      "files": ["test/fixtures/legacy-app/*.js"],
      "extends": ["./es5.js"]
    },
    {
      "files": ["test/fixtures/ts-app/*.ts"],
      "extends": ["./ts.js"],
      "parserOptions": {
        "project": "./tsconfig.json"
      }
    },
  ]
}
