import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

export default [
    {
        ignores: [".next/**", "node_modules/**", "public/**", "out/**", ".git/**", "eslint.config.mjs"]
    },
    ...compat.extends('airbnb'),
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    nextPlugin.configs['core-web-vitals'],
    {
        files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                // Cypress globals
                cy: 'readonly',
                Cypress: 'readonly',
                describe: 'readonly',
                it: 'readonly',
                before: 'readonly',
                after: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
                expect: 'readonly',
                assert: 'readonly',
                // Jest globals
                jest: 'readonly',
            }
        },
        rules: {
            // Disabled legacy rules or irrelevant ones
            'jsx-a11y/label-has-associated-control': 0,
            'react/jsx-props-no-spreading': 0,
            'react/react-in-jsx-scope': 0,
            'import/extensions': 0,
            'react/prop-types': 0,
            'linebreak-style': 0,
            'react/state-in-constructor': 0,
            'import/prefer-default-export': 0,
            'react/no-unknown-property': 0,
            'comma-dangle': 0,
            'implicit-arrow-linebreak': 0,
            'function-paren-newline': 0,
            'operator-linebreak': 0,
            'max-len': [2, 250],
            'no-multiple-empty-lines': 0,
            'no-underscore-dangle': 0,
            'object-curly-newline': 0,
            'react/jsx-filename-extension': 0,
            'react/jsx-one-expression-per-line': 0,
            'jsx-a11y/click-events-have-key-events': 0,
            'jsx-a11y/alt-text': 0,
            'jsx-a11y/no-autofocus': 0,
            'jsx-a11y/no-static-element-interactions': 0,
            'react/no-array-index-key': 0,
            'jsx-a11y/anchor-is-valid': 0,

            // New overrides
            'indent': 0,
            'react/function-component-definition': 0,
            'no-unused-vars': 1,
            'import/no-named-as-default': 0,
            'import/no-named-as-default-member': 0,
            'react/no-unstable-nested-components': 0,
            'react/display-name': 0,
            'no-use-before-define': 0,
            'padded-blocks': 0,
            'radix': 0,
            'quotes': 0,
            'semi': 0,
            'eol-last': 0,
            'no-undef-init': 0,
            'no-undef': 2,
            'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
            'no-console': 0,
            'quote-props': 0,
        }
    }
];
