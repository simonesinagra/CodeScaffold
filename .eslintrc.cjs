module.exports = {
	env: {
		browser: true,
		node: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
		"prettier",
	],
	overrides: [],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["@typescript-eslint"],
	ignorePatterns: ["dist/", "templates/"],
	rules: {
		"prettier/prettier": "error",
	},
};
