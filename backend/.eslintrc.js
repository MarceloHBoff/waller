module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'import-helpers'],
  rules: {
    'no-param-reassign': 'off',
    camelcase: 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'import-helpers': 'off',
    'no-console': 'off',
    'arrow-parens': 'off',
    'implicit-arrow-linebreak': 'off',
    'operator-linebreak': 'off',
    'comma-dangle': 'off',
    'no-await-in-loop': 'off',
    'no-plusplus': 'off',
    'object-curly-newline': 'off',
    'no-confusing-arrow': 'off',
    'function-paren-newline': 'off',
    'no-restricted-globals': 'off',
    'import/prefer-default-export': 'off',
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          'module',
          '/^.*/models/',
          '/^.*/controllers/',
          '/^.*/validators/',
          '/^..//',
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
};
