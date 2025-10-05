import type {StorybookConfig} from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  features: {
    developmentModeForBuild: true,
    highlight: false,
    viewport: false,
  },
  staticDirs: [
    {
      from: '../src/style',
      to: 'css',
    },
    {
      from: '../doc',
      to: 'doc',
    },
    {
      from: '../public/icons',
      to: 'icons',
    },
  ],

  core: {
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
    builder: {
      name: '@storybook/builder-vite',
      options: {
        viteConfigPath: 'config/vite.config.ts',
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
    reactDocgenTypescriptOptions: {
      savePropValueAsString: true,
      tsconfigPath: 'tsconfig.json',
    },
  },

  addons: ['@storybook/addon-docs', 'storybook-addon-pseudo-states'],
}

export default config
