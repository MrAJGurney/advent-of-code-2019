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
		'arrow-parens': ['error', 'as-needed',],
		'comma-dangle': ['error', 'always',],
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
		'no-console': ['error',],
		'no-multiple-empty-lines': [
			'error', { 'max': 1, },
		],
		'no-trailing-spaces': [
			'error',
			{ 'skipBlankLines': false,
				'ignoreComments': false, },
		],
		'no-unused-vars': ['error',],
		'no-var': [
			'error',
		],
		'object-curly-spacing': ['error', 'always',],
		'prefer-const': ['error',],
		'quotes': [
			'error',
			'single',
		],
		'semi': [
			'error',
			'always',
		],
	},
};