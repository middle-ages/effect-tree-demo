import react from '@vitejs/plugin-react'
import tailwindCss from '@tailwindcss/vite'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {defineConfig} from 'vitest/config'
import {playwright} from '@vitest/browser-playwright'
import {storybookTest} from '@storybook/addon-vitest/vitest-plugin'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react({
      exclude: new RegExp('/src/tree/worker.js'),
      jsxRuntime: 'automatic',
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    tailwindCss(),
  ],
  worker: {format: 'es'},
  optimizeDeps: {
    include: ['@mdx-js/react', 'markdown-to-jsx'],
  },
  base: '/effect-tree-demo/',
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
            storybookScript: 'pnpm storybook --no-open',
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({
              launchOptions: {
                headless: true, // Run in headless mode by default
              },
            }),
            instances: [{browser: 'chromium'}],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
})
