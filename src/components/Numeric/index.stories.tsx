import {parameters, pseudo} from '#storybook'
import {px} from '#util'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {useState, type ComponentProps, type FC} from 'react'
import {mapProp} from 'react-compinators'
import {Numeric as Component} from './index'
import code from './index.jsx?raw'

type Props = ComponentProps<typeof Component> & {label: string}

const Wrapper = mapProp(
  (value: number): bigint | number => BigInt(value),
  'value',
)(Component) as FC<Props>

const meta = {
  component: Wrapper,
  parameters: {...parameters.paddedLayout, ...parameters.source(code)},
  args: {
    value: 1,
    isFlat: false,
    maxWidthPx: 160,
    label: 'Sixty zippers',
  },
  render: function Render({label, value: propsValue, ...props}) {
    const [value, onChange] = useState(propsValue)
    return (
      <div className="flex gap-2 set-fg-control">
        <div className="truncate">{label}</div>
        <Wrapper
          {...props}
          {...{
            label,
            value,
            onChange: onChange as (n: number) => void,
          }}
        />
      </div>
    )
  },
} satisfies Meta<typeof Wrapper>

type Story = StoryObj<typeof meta>

export const Basic: Story = {}

export const Hover: Story = pseudo.story.hover<Props>()

export const Focus: Story = pseudo.story.focus<Props>()

export const FocusVisible: Story = pseudo.story.focusVisible<Props>()

export const Flat: Story = {...Basic, args: {isFlat: true}}

export const FlatFixedWidth: Story = {
  ...Basic,
  args: {isFlat: true, width: px(3 * 8)},
}

export const LessThanTenMillion: Story = {
  ...Basic,
  args: {value: 9_999_999},
}

export const TenMillion: Story = {
  ...Basic,
  args: {value: 10_000_000},
}

export const TenMillionConstrained: Story = {
  ...Basic,
  args: {value: 10_000_000, maxWidthPx: 80},
}

export const MoreThanTenMillion: Story = {
  ...Basic,
  args: {value: 10_000_001},
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
  args: {width: px(24), value: 111},
}

export default meta
