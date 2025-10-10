import eslintReact from '@eslint-react/eslint-plugin'
import * as eslint from '@eslint/js'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
//import sonarjs from 'eslint-plugin-sonarjs'
//import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import {defineConfig, globalIgnores} from 'eslint/config'
import globals from 'globals'
import tslint from 'typescript-eslint'

const config = defineConfig(
  globalIgnores([
    './node_modules',
    './config/dependency-cruiser.cjs',
    './docs',
    './src/tree/worker.ts',
  ]),

  eslint.configs.recommended,
  ...tslint.configs.recommended,
  eslint.configs.recommended,
  tslint.configs.strictTypeChecked,
  //  eslintPluginUnicorn.configs.recommended,
  //  sonarjs.configs.recommended,
  prettierRecommended,

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
    ...react.configs.flat['jsx-runtime'],
    ...react.configs.flat['recommended'],
    ...eslintReact.configs['disable-conflict-eslint-plugin-react'],
    ...eslintReact.configs.strict,

    settings: {react: {version: '19.2'}},
    plugins: {
      react,
      'react-refresh': reactRefresh,
      // @ts-expect-error
      'react-hooks': reactHooks,
    },

    rules: {
      ...reactRefresh.configs.recommended.rules,
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/config': 'error',
      'react-hooks/error-boundaries': 'error',
      'react-hooks/component-hook-factories': 'error',
      'react-hooks/gating': 'error',
      'react-hooks/globals': 'error',
      'react-hooks/immutability': 'error',
      'react-hooks/preserve-manual-memoization': 'error',
      'react-hooks/purity': 'error',
      'react-hooks/refs': 'error',
      'react-hooks/set-state-in-effect': 'error',
      'react-hooks/set-state-in-render': 'error',
      'react-hooks/static-components': 'error',
      'react-hooks/unsupported-syntax': 'warn',
      'react-hooks/use-memo': 'error',
      'react-hooks/incompatible-library': 'warn',

      // Duplicated in eslint rules.
      //   'unicorn/prevent-abbreviations': 'off',
      //   'unicorn/no-unused-vars': 'off',
      //   'sonarjs/no-unused-vars': 'off',
      //   'sonarjs/unused-import': 'off',
      //   'sonarjs/no-dead-store': 'off',

      //   // These get confused on methods vs. namespaced functions.
      //   'unicorn/no-array-callback-reference': 'off',
      //   'unicorn/no-array-method-this-argument': 'off',
      //   'unicorn/no-array-for-each': 'off',
      //   'unicorn/no-array-reduce': 'off',

      //   // Does not understand @effect/vitest.
      //   'sonarjs/no-empty-test-file': 'off',

      //   // Should be only on tests.
      //   'sonarjs/no-nested-functions': 'off',

      //   // No JS linting.
      //   'unicorn/no-abusive-eslint-disable': 'off',

      //   // Not needed.
      //   'unicorn/consistent-function-scoping': 'off',
      //   'unicorn/throw-new-error': 'off',
      //   'sonarjs/no-nested-conditional': 'off',
      //   'sonarjs/void-use': 'off',
      //   'sonarjs/class-name': 'off',
      //   'sonarjs/function-return-type': 'off',
      //   'sonarjs/slow-regex': 'off',
      //   'unicorn/filename-case': 'off',

      // Can't do module augmentation.
      '@typescript-eslint/no-namespace': 'off',

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
)

export default config
