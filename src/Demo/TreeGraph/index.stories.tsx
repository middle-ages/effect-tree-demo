import {FrameDecorator, parameters} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {TreeGraph as Component} from './index'
import code from './index.jsx?raw'

const meta = {
  component: Component,
  parameters: {...parameters.fullscreenLayout, ...parameters.source(code)},
  decorators: [FrameDecorator({})],
} satisfies Meta<typeof Component>

type Story = StoryObj<typeof meta>

export const TreeGraphView: Story = {}

export default meta
