module.exports = {
	env: {
		browser: true,
		es2021: true,
		"jest/globals": true
	},
	extends: [
		'plugin:react/recommended',
		'xo',
		'jest',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: [
		'react',
		'@typescript-eslint',
	],
	rules: {
	},
};
