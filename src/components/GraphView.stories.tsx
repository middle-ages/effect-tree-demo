import {FrameDecorator, parameters} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {GraphView as Component} from './GraphView'
import code from './GraphView.jsx?raw'

const meta = {
  component: Component,
  parameters: {...parameters.fullscreenLayout, ...parameters.source(code)},
  args: {
    dot: 'digraph G { Hello -> World }',
  },
  decorators: [FrameDecorator({})],
} satisfies Meta<typeof Component>

type Story = StoryObj<typeof meta>

export const GraphView: Story = {}

export default meta
