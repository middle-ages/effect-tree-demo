import {FrameDecorator, parameters} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import type {RefCallback} from 'react'
import {fn} from 'storybook/test'
import {Outer as Component} from './Outer'
import code from './Outer.jsx?raw'

const meta = {
  component: Component,
  parameters: {...parameters.paddedLayout, ...parameters.source(code)},
  args: {
    id: 'outer',
    ref: fn() as RefCallback<HTMLElement>,
    title: 'Some title.',
    isActive: false,
    isRounded: false,
    isDisabled: false,
    disabledNote: 'Some disabled note.',
    onClick: fn(),
    children: 'Outer',
  },
  decorators: [FrameDecorator({className: '*:p-1'})],
} satisfies Meta<typeof Component>

type Story = StoryObj<typeof meta>

export const Basic: Story = {}

export const Active: Story = {args: {isActive: true}}

export const Rounded: Story = {args: {isRounded: true}}

export const Disabled: Story = {args: {isDisabled: true}}

export default meta
