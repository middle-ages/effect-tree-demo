import {parameters, StoreDecorator} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {StatsView as Component} from './index'
import code from './index.jsx?raw'

const meta = {
  component: Component,
  parameters: {...parameters.paddedLayout, ...parameters.source(code)},
  decorators: StoreDecorator(),
} satisfies Meta<typeof Component>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {}
