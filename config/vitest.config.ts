import {mergeConfig, defineConfig} from 'vitest/config'
import viteConfig from './vite.config.js'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      projects: [
        {
          extends: true,
          test: {
            name: 'unit',
            environment: 'happy-dom',
            typecheck: {enabled: true},
            include: [
              './src/**/*.test.tsx',
              './src/**/*.test.ts',
              './src/**/*.test-d.ts',
            ],
          },
        },
      ],
    },
  }),
)
