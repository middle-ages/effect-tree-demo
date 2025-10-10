import {parameters, pseudo} from '#storybook'
import {px} from '#util'
import type {Meta, StoryObj} from '@storybook/react-vite'
import type {ComponentProps, FC} from 'react'
import {mapProp} from 'react-compinators'
import {Numeric as Component} from './index'
import code from './index.jsx?raw'

type Props = Omit<ComponentProps<typeof Component>, 'value'> & {value: string}

const Wrapper: FC<Props> = mapProp((value: string): bigint | number => {
  const numeric = value.replaceAll('_', '')
  return BigInt(numeric)
}, 'value')(Component)

const meta = {
  component: Wrapper,
  parameters: {...parameters.paddedLayout, ...parameters.source(code)},
  args: {
    value: '1',
    isFlat: false,
    maxWidthPx: 160,
  },
} satisfies Meta<typeof Wrapper>

type Story = StoryObj<typeof meta>

export const Basic: Story = {}

export const Hover: Story = pseudo.story.hover<Props>()

export const Focus: Story = pseudo.story.focus<Props>()

export const FocusVisible: Story = pseudo.story.focusVisible<Props>()

export const Flat: Story = {...Basic, args: {isFlat: true}}

export const LessThanTenMillion: Story = {
  ...Basic,
  args: {value: '9_999_999'},
}

export const TenMillion: Story = {
  ...Basic,
  args: {value: '10_000_000'},
}

export const TenMillionConstrained: Story = {
  ...Basic,
  args: {value: '10_000_000', maxWidthPx: 80},
}

export const MoreThanTenMillion: Story = {
  ...Basic,
  args: {value: '10_000_001'},
}

export const FiftyExpFifty: Story = {
  ...Basic,
  args: {value: (50n ** 50n).toString()},
}

export const FiftyExpFiftyFlat: Story = {
  ...Basic,
  args: {...FiftyExpFifty.args, ...Flat.args},
}

export const FixedWidth: Story = {
  ...Basic,
  args: {width: px(24), value: '111'},
}

export const FontSize2xl: Story = {
  args: {className: 'text-2xl h-9 leading-9', fontSizePx: 24},
}

export const FontSize2xlBig: Story = {
  args: {...FontSize2xl.args, value: '123_456_789'},
}

export const FontSize2xlConstrained: Story = {
  args: {...FontSize2xl.args, value: '123_456_789_123_456_789'},
}

export default meta
