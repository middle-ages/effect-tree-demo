import {FrameDecorator, parameters} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {ColorGallery as Component} from './components/ColorGallery/index'
import code from './components/ColorGallery/index.jsx?raw'

type Story = StoryObj<typeof Component>

const meta = {
  component: Component,
  parameters: {...parameters.source(code), ...parameters.fullscreenLayout},
  decorators: [
    FrameDecorator({
      isPadded: false,
      isStriped: false,
      className: 'h-cqh size-container',
    }),
  ],
} satisfies Meta<typeof Component>

export const ColorGallery: Story = {}

export default meta
