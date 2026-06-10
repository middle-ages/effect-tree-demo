import {parameters} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {ColorGallery as Component} from './components/ColorGallery/index'
import code from './components/ColorGallery/index.jsx?raw'

type Story = StoryObj<typeof Component>

const meta = {
  component: Component,
  parameters: {...parameters.source(code), ...parameters.fullscreenLayout},
} satisfies Meta<typeof Component>

export const ColorGallery: Story = {}

export default meta
