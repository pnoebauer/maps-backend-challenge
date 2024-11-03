const typescriptParser = require('@typescript-eslint/parser');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const prettierPlugin = require('eslint-plugin-prettier');
const eslintConfigPrettier = require('eslint-config-prettier');

const config = [
  {
    files: ['src/**/*.ts', 'test/**/*.test.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2015,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      'prettier/prettier': 'error',
    },
    ignores: ['dist/', 'node_modules/'],
  },
  eslintConfigPrettier,
];

module.exports = config;