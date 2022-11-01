module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  extends: [
    'plugin:react/recommended',
    'xo',

    //
    // --- Prettier Plugins (Add these last) ---
    //

    // Enables eslint-plugin-prettier and eslint-config-prettier.
    // This will display prettier errors as ESLint errors.
    // 📝 Make sure this is always the last configuration in the `extends` array.
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': ['error'],
    'object-curly-spacing': 0,
    'no-negated-condition': 0,
    'array-callback-return': 0,
    'capitalized-comments:': 0,
    'no-unused-vars': 'warn',
    'capitalized-comments': 0,
    camelcase: 'warn',
    'react/prop-types': 0,
    'react/display-name': 0,
    'no-restricted-syntax': [
      'off',
      {
        selector: 'TSEnumDeclaration',
        message: "Don't declare enums",
      },
    ],
  },
};
