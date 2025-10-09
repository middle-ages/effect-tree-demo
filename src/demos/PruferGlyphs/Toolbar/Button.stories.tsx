import {FrameDecorator, parameters} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {action} from 'storybook/actions'
import {Button as Component} from './Button'
import code from './Button.jsx?raw'

const meta = {
  component: Component,
  parameters: parameters.source(code),
  args: {
    id: 'firstCode',
    label: 'First Code',
    note: 'Jump to first code.',
    disable: undefined,
    apply: action('apply'),
  },
  decorators: FrameDecorator({}),
} satisfies Meta<typeof Component>

export default meta

type Story = StoryObj<typeof meta>

export const Button: Story = {}
