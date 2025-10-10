import {FrameDecorator, parameters} from '#storybook'
import {px} from '#util'
import type {Meta, StoryObj} from '@storybook/react-vite'
import type {FC} from 'react'
import {mapProp} from 'react-compinators'
import {Numeric as Component} from './Numeric'
import code from './Numeric.jsx?raw'

const Wrapper: FC<{
  value: string
  maxWidthPx: number
  width?: string
  isFlat?: boolean
}> = mapProp((value: string): bigint | string | number => {
  const numeric = value.replaceAll('_', '')
  return /^\d+$/.test(numeric) ? BigInt(numeric) : value
}, 'value')(Component)

const meta = {
  component: Wrapper,
  parameters: {...parameters.paddedLayout, ...parameters.source(code)},
  args: {
    value: '1',
    maxWidthPx: 200,
    isFlat: false,
  },
  decorators: [FrameDecorator({})],
} satisfies Meta<typeof Wrapper>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {}

export const Flat: Story = {args: {isFlat: true}}

export const StringMessage: Story = {
  args: {
    value: 'first tree',
    width: px(72),
  },
}

export const LessThanTenMillion: Story = {
  args: {value: '9_999_999'},
}

export const TenMillion: Story = {
  args: {value: '10_000_000'},
}

export const MoreThanTenMillion: Story = {
  args: {value: '10_000_001'},
}

export const FiftyExpFifty: Story = {
  args: {value: (50n ** 50n).toString()},
}

export const FiftyExpFiftyFlat: Story = {
  args: {...FiftyExpFifty.args, ...Flat.args},
}
