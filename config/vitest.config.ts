import {defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    typecheck: {
      enabled: true,
    },
    include: [
      './src/**/*.test.tsx',
      './src/**/*.test.ts',
      './src/**/*.test-d.ts',
    ],
    coverage: {
      provider: 'v8',
      reportsDirectory: './node_modules/.coverage',
      exclude: [
        './dist',
        './docs',
        './config',
        './dev',
        './src/**/*.test.ts',
        './src/**/*.test-d.ts',
        './src/**/*.stories.ts',
      ],
    },
  },
})
