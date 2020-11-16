'use strict';

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2018
  },
  extends: 'eslint:recommended',
  env: {
    browser: false,
    jquery: false,
    node: true,
    mocha: true,
    es6: true
  },
  rules: {
    'indent': ['error', 2],
    'no-use-before-define': ['error', {'functions': false, 'classes': false, 'variables': false}],
    'max-len': ['error', 120],
    'quotes': ['error', 'single'],
    'strict': ['error', 'safe'],
    'no-console': ['error', {allow: ['info', 'warn', 'error']}],
    'eol-last': ['error', 'always'],
    'semi': ['error', 'always'],
    'arrow-parens': ['error', 'as-needed'],
    'require-atomic-updates': 'off'
  }
};
