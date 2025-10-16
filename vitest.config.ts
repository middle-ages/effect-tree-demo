import react from '@vitejs/plugin-react'
import tailwindCss from '@tailwindcss/vite'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {defineConfig} from 'vitest/config'
import {storybookTest} from '@storybook/addon-vitest/vitest-plugin'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react({
      exclude: new RegExp('/src/tree/worker.js'),
      jsxRuntime: 'automatic',
    }),
    tailwindCss(),
  ],
  test: {
    projects: [
      {
        extends: true,
        plugins: [storybookTest({configDir: path.join(dirname, '.storybook')})],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [{browser: 'chromium'}],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
})
