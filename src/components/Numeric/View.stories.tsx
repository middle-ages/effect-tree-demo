import {argTypes, FrameDecorator, parameters} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {type ComponentProps} from 'react'
import {NumericView as Component} from './View'
import code from './View.jsx?raw'

const Wrapper = ({
  parentWidth: width,
  ...props
}: ComponentProps<typeof Component> & {parentWidth: string}) => (
  <div
    style={{width}}
    className={`flex-gap h-row-small items-baseline overflow-hidden whitespace-nowrap *:leading-row-small`}>
    <div>Lorem Ipsum</div>
    <div className='h-row-small flex-1 overflow-hidden'>
      <Component {...props} />
    </div>
  </div>
)

const meta = {
  component: Wrapper,
  parameters: {
    ...parameters.fullscreenLayout,
    ...parameters.source(code),
    backgrounds: {grid: {offsetY: 1}},
  },
  argTypes: {
    ...argTypes.disable('onChange'),
    value: {control: 'text'},
    parentWidth: {control: 'text'},
  },
  args: {
    value: '1',
    parentWidth: '100%',
    title: 'View title.',
  },
  decorators: FrameDecorator({
    className: '*:bg-transparent border-2 border-red-500',
    style: {backgroundImage: 'none'},
  }),
} satisfies Meta<typeof Wrapper>

type Story = StoryObj<typeof meta>

export const Digit: Story = {}
export const OneComma: Story = {args: {value: '1234'}}

export const TwelveCommas: Story = {
  args: {value: '1234567890123456789012345678901234567'},
}

export const Overflow: Story = {
  args: {value: '12345678901234567890', parentWidth: '20ch'},
}

export default meta
