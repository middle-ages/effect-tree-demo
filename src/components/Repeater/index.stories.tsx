import {FrameDecorator, parameters} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {fn} from 'storybook/test'
import {Repeater as Component} from './index'
import code from './index.jsx?raw'

const meta = {
  component: Component,
  parameters: {...parameters.paddedLayout, ...parameters.source(code)},
  args: {
    id: 'repeater',
    isDisabled: false,
    isRounded: true,
    onClick: fn(),
    title: 'Repeater Title',
    children: 'Repeat',
  },
  decorators: [FrameDecorator({className: '*:p-1'})],
} satisfies Meta<typeof Component>

type Story = StoryObj<typeof meta>

export const Rounded: Story = {}

export const Square: Story = {args: {isRounded: false}}

export const RoundedDisabled: Story = {
  args: {...Rounded.args, isDisabled: true},
}

export const SquareDisabled: Story = {args: {...Square.args, isDisabled: true}}

export default meta
