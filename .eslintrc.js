module.exports = {
	env: {
		commonjs: true,
		es2020: true,
		node: true,
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	rules: {

		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		// indent: ["error", "tab", { SwitchCase: 1 }],
		quotes: ["error", "double"],
		"semi-spacing": ["error", { before: false, after: true }],
		"init-declarations": ["error", "always"],
		eqeqeq: ["error", "smart"],
		"brace-style": ["error", "1tbs", { allowSingleLine: true }],
		"keyword-spacing": ["error", { before: true, after: true }],
		"space-before-blocks": ["error", "always"],
		"object-curly-spacing": ["error", "always"],
		"space-infix-ops": ["error"],
		"comma-spacing": ["error", { before: false, after: true }],
		"key-spacing": ["error", { beforeColon: false, afterColon: true }],
		"space-in-parens": ["error", "never"],
		"space-before-function-paren": [
			"error",
			{
				named: "never",
				anonymous: "always",
				asyncArrow: "always",
			},
		],
		"spaced-comment": ["error", "always"],
		"array-bracket-spacing": ["error", "never"],
		"no-var": "error",
		"arrow-spacing": ["error"],
	},
	ignorePatterns: [".eslintrc.js", "node_modules/", "build/"],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier"
	],
};
