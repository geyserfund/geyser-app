module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'xo',
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
		'object-curly-spacing': 0,
		'no-negated-condition': 0,
		'array-callback-return': 0,
		'capitalized-comments:': 0,
		'no-unused-vars': 'warn',
		'no-restricted-syntax': [
			'error',
			{
				selector: 'TSEnumDeclaration',
				message: 'Don\'t declare enums',
			},
		],
	},
};
