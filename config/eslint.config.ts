import eslintReact from '@eslint-react/eslint-plugin'
import * as eslint from '@eslint/js'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import {defineConfig, globalIgnores} from 'eslint/config'
import globals from 'globals'
import tslint from 'typescript-eslint'

const config = defineConfig(
  globalIgnores([
    './node_modules',
    './config/dependency-cruiser.cjs',
    './docs',
    './src/tree/worker.ts',
    './.storybook/vitest.setup.ts',
  ]),

  reactHooks.configs.flat['recommended-latest'],
  reactRefresh.configs.vite,
  eslint.configs.recommended,
  ...tslint.configs.recommended,
  eslint.configs.recommended,
  tslint.configs.strictTypeChecked,

  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        ecmaVersion: 'latest',
        tsconfigRootDir: import.meta.dirname + '/..',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
        ...globals.vitest,
      },
    },
  },

  {
    plugins: {
      react,
    },
  },

  {
    ...react.configs.flat['all'],
    ...eslintReact.configs['disable-conflict-eslint-plugin-react'],
    ...eslintReact.configs.strict,

    settings: {react: {version: '19.2'}},

    rules: {
      ...react.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',

      '@typescript-eslint/no-invalid-void-type': 'off',

      // Can't do module augmentation.
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/unified-signatures': 'off',

      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'off',
      '@typescript-eslint/no-unnecessary-type-arguments': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },

  prettierRecommended,
)

export default config
