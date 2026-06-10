import {FrameDecorator, parameters} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {useState} from 'react'
import {RandomJumps as Component} from './RandomJumps'
import code from './RandomJumps.jsx?raw'
import {Codec} from 'effect-tree'

const Wrapper = ({
  className,
  reactKey,
}: {
  className: string
  reactKey: number
}) => {
  const [code, setCode] = useState<number[]>([])
  return (
    <div>
      <Component key={reactKey} {...{code, setCode, className}} />
      <div>nodeCount: {Codec.Prufer.computeNodeCount(code).toString()}</div>
      <div>treeIndex: {Codec.Prufer.toOrdinal(code)[0].toString()}</div>
    </div>
  )
}

const meta = {
  component: Wrapper,
  parameters: {...parameters.fullscreenLayout, ...parameters.source(code)},
  args: {className: '*:px-3', reactKey: 1},
  decorators: FrameDecorator({className: '*:p-2 h-fit'}),
} satisfies Meta<typeof Wrapper>

type Story = StoryObj<typeof meta>

export const RandomJumps: Story = {}

export default meta
