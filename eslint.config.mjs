import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import jestDom from 'eslint-plugin-jest-dom'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import testingLibrary from 'eslint-plugin-testing-library'
import globals from 'globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  ...fixupConfigRules(
    compat.extends(
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'xo',
      'plugin:jest-dom/recommended',
      'plugin:react-hooks/recommended',
      'plugin:testing-library/react',
      'plugin:prettier/recommended',
      'plugin:storybook/recommended',
    ),
  ),
  {
    plugins: {
      react: fixupPluginRules(react),
      'simple-import-sort': simpleImportSort,
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      'react-hooks': fixupPluginRules(reactHooks),
      'jest-dom': fixupPluginRules(jestDom),
      'testing-library': fixupPluginRules(testingLibrary),
      prettier: fixupPluginRules(prettier),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'prettier/prettier': ['error'],
      'react/react-in-jsx-scope': 0,
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-empty-function': 0,
      '@typescript-eslint/no-unused-vars': 0,
      'react-hooks/exhaustive-deps': 1,
      '@typescript-eslint/ban-types': 0,
      'object-curly-spacing': 0,
      'no-negated-condition': 0,
      'array-callback-return': 0,
      'capitalized-comments:': 0,
      'no-unused-vars': 0,
      'capitalized-comments': 0,
      camelcase: 'warn',
      'no-throw-literal': 0,
      'react/prop-types': 0,
      'react/display-name': 0,
      'no-undef': 0,
      'new-cap': 0,
      'no-alert': 0,
      'testing-library/render-result-naming-convention': 0,
      'max-nested-callbacks': 0,
      'no-warning-comments': 0,
      'no-restricted-syntax': [
        'off',
        {
          selector: 'TSEnumDeclaration',
          message: "Don't declare enums",
        },
      ],

      'no-new': 0,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],

    rules: {
      'no-undef': 'off',
      semi: 'off',
    },
    ignores: ['commitlint.config.js', 'src/types/generated/*'],
  },
]
