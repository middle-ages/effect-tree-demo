import {FrameDecorator, parameters} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import type {RefCallback} from 'react'
import {fn} from 'storybook/test'
import {Inner as Component} from './Inner'
import code from './Inner.jsx?raw'

const meta = {
  component: Component,
  parameters: {...parameters.paddedLayout, ...parameters.source(code)},
  args: {
    id: 'inner',
    ref: fn() as RefCallback<HTMLElement>,
    isRepeating: false,
    isDisabled: false,
    onClick: fn(),
  },
  decorators: [FrameDecorator({className: '*:p-1'})],
} satisfies Meta<typeof Component>

type Story = StoryObj<typeof meta>

export const Basic: Story = {}

export const Repeating: Story = {args: {isRepeating: true}}

export const Disabled: Story = {args: {isDisabled: true}}

export default meta
