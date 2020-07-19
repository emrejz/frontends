module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2020: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    quotes: ["error", "double"],
    "linebreak-style": 0,
    "no-console": 0,
  },
};
