import {parameters} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {IconGallery as Component} from './components/IconGallery/index'
import code from './components/IconGallery/index.jsx?raw'

type Story = StoryObj<typeof Component>

const meta = {
  component: Component,
  args: {iconSizePx: 64},
  parameters: {...parameters.source(code), ...parameters.fullscreenLayout},
} satisfies Meta<typeof Component>

export const IconGallery: Story = {}

export default meta
