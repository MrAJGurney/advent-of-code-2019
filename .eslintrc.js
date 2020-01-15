'use strict';

const underscoreOnlyPattern = '^_$';
// '^': Start of line
// '_': Underscore character
// '$': End of line

/*eslint sort-keys: ["error", "asc", {"minKeys": 6}]*/

module.exports = {
	'env': {
		'commonjs': true,
		'es6': true,
		'node': true,
	},
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly',
	},
	'parserOptions': {
		'ecmaVersion': 2018,
	},
	'rules': {
		'arrow-parens': ['error', 'as-needed', ],
		'comma-dangle': [
			'error',
			{
				'arrays': 'always',
				'objects': 'always',
				'imports': 'never',
				'exports': 'never',
				'functions': 'never',
			},
		],
		'comma-spacing': [
			'error',
			{
				'before': false,
				'after': true,
			},
		],
		'indent': [
			'error',
			'tab',
		],
		'linebreak-style': [
			'error',
			'unix',
		],
		'max-len': [
			'error',
			{ 'code': 80, },
		],
		'no-console': ['error', ],
		'no-multiple-empty-lines': [
			'error', { 'max': 1, },
		],
		'no-trailing-spaces': [
			'error',
			{
				'skipBlankLines': false,
				'ignoreComments': false,
			},
		],
		'no-unused-vars': [
			'error',
			{ 'varsIgnorePattern': underscoreOnlyPattern, },
		],
		'no-var': [
			'error',
		],
		'object-curly-spacing': ['error', 'always', ],
		'prefer-const': ['error', ],
		'quotes': [
			'error',
			'single',
		],
		'semi': [
			'error',
			'always',
		],
		'strict': [
			'error',
			'global',
		],
	},
};