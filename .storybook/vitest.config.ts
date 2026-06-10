import {storybookTest} from '@storybook/addon-vitest/vitest-plugin'
import {playwright} from '@vitest/browser-playwright'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {defineConfig, mergeConfig} from 'vitest/config'
import viteConfig from '../config/vite.config.js'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default mergeConfig(
  viteConfig,
  defineConfig({
    optimizeDeps: {
      include: ['@mdx-js/react', 'markdown-to-jsx'],
    },
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
            setupFiles: ['./.storybook/vitest.setup.ts'],
          },
        },
      ],
    },
  }),
)
