import {argTypes, parameters, useForceState} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {useCallback, type ComponentProps, type FC} from 'react'
import {fn} from 'storybook/test'
import {NumericInput as Component} from './Input'
import code from './Input.jsx?raw'

const Wrapper = Component

type Props = ComponentProps<typeof Wrapper>

const meta = {
  component: Wrapper,
  parameters: {...parameters.paddedLayout, ...parameters.source(code)},
  argTypes: {
    ...argTypes.disable('onChange'),
    min: {control: 'number', min: 0, max: 1_000, step: 1},
    max: {control: 'number', min: 1_001, max: 1_000_000_000, step: 10_000_000},
    value: {control: 'number', min: 0, max: 100_000_000_000, step: 1},
    maximized: {control: 'boolean'},
    showSpinner: {control: 'boolean'},
    spacingLeft: {control: 'number', min: 0, max: 100, step: 1},
    spacingRight: {control: 'number', min: 0, max: 100, step: 1},
  },
  args: {
    min: 1,
    max: 10_000_000,
    value: 123,
    title: 'Sixty zippers',
    onChange: fn() as (n: number, index: number) => void,
    maximized: false,
    showSpinner: false,
    spacingLeft: 0,
    spacingRight: 0,
  },
  render: function Render({
    value: propsValue,
    onChange: propsOnChange,
    ...props
  }) {
    const onChange = useCallback(
      (n: number): void => {
        propsOnChange(n, 0)
      },
      [propsOnChange],
    )
    const result = useForceState(propsValue, onChange)
    return result === undefined ? (
      <></>
    ) : (
      <div className="flex-gap *:first:truncate items-baseline">
        <div className="mr-2 min-w-fit h-row leading-row">Lorem Ipsum</div>
        <Component {...props} {...result} />
      </div>
    )
  },
} satisfies Meta<FC<Props>>

type Story = StoryObj<typeof meta>

export const Basic: Story = {}

export default meta
