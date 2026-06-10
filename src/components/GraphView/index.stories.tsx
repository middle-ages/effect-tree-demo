import {FrameDecorator, parameters} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {GraphView as Component} from './index'
import code from './index.jsx?raw'

const meta = {
  component: Component,
  parameters: {...parameters.fullscreenLayout, ...parameters.source(code)},
  args: {
    dot: 'digraph G { Hello -> World }',
  },
  decorators: [
    FrameDecorator({
      className: 'cqw-4 cqh-4 *:size-container *:bg-indigo-100',
    }),
  ],
} satisfies Meta<typeof Component>

type Story = StoryObj<typeof meta>

export const GraphView: Story = {}

export default meta
