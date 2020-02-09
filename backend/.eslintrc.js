module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    camelcase: 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'arrow-parens': 'off',
    'no-confusing-arrow': 'off',
    'comma-dangle': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-plusplus': 'off',
    'no-multi-spaces': 'off',
    'operator-linebreak': 'off',
    'no-await-in-loop': 'off',
  },
};
