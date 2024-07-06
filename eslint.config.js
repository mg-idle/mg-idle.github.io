import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import playwright from 'eslint-plugin-playwright';
import vitest from 'eslint-plugin-vitest';

export default ts.config(
	js.configs.recommended,
	...ts.configs.strict,
	...ts.configs.stylistic,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		}
	},
	{
		files: ['**/*.test.ts'],
		plugins: {
			vitest
		},
		rules: {
			...vitest.configs.recommended.rules
		}
	},
	{
		...playwright.configs['flat/recommended'],
		files: ['tests/**']
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/']
	}
);
