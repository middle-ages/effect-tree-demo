import type {StorybookConfig} from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  features: {
    highlight: false,
    viewport: false,
  },
  staticDirs: [
    {
      from: '../public',
      to: 'css',
    },
    {
      from: '../public/fonts',
      to: 'fonts',
    },
  ],

  core: {
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
    builder: {
      name: '@storybook/builder-vite',
      options: {
        viteConfigPath: 'vitest.config.ts',
      },
    },
  },

  framework: {
    name: '@storybook/react-vite',
    options: {
      strictMode: true,
    },
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },

  addons: [
    '@storybook/addon-docs',
    'storybook-addon-pseudo-states',
    '@storybook/addon-vitest',
    '@chromatic-com/storybook',
  ],
}

export default config
