import {FrameDecorator, parameters} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {Array} from 'effect'
import {ScrollPanel as Component} from './index'
import code from './index.jsx?raw'

interface Props {
  childCount: number
  digitCount: number
}

const Wrapper = ({childCount, digitCount}: Props) => {
  return (
    <Component>
      <div className='h-fit flex-col'>
        {Array.range(1, childCount).map(i => (
          <div
            key={i}
            className='text-center font-mono text-lg font-semibold tracking-wider'
            style={{background: 'linear-gradient(#fffad0, #e0eaf0)'}}>
            {id(digitCount)}
          </div>
        ))}
      </div>
    </Component>
  )
}

const meta = {
  component: Wrapper,
  parameters: {...parameters.fullscreenLayout, ...parameters.source(code)},
  decorators: [
    FrameDecorator({
      isPadded: false,
      isStriped: false,
      className: 'bg-blue-50 h-cqh size-container p-2',
    }),
  ],
  argTypes: {childCount: {control: 'number'}, digitCount: {control: 'number'}},
  args: {childCount: 20, digitCount: 60},
} satisfies Meta<typeof Wrapper>

type Story = StoryObj<typeof meta>

export const ScrollPanel: Story = {}

export default meta

function id(digitCount: number): string {
  return Array.range(1, digitCount)
    .map(() => Math.floor(Math.random() * 9).toString())
    .join('')
}
