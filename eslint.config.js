import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import html from 'eslint-plugin-html';

export default [
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        process: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['**/*.html'],
    plugins: { html },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'script',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        _: 'readonly',
      },
    },
  },
];
