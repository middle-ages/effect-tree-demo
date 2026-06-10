import {parameters} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {Codec} from 'effect-tree'
import {useState} from 'react'
import {Toolbar as Component} from './index'
import code from './index.jsx?raw'

const Wrapper = ({reactKey}: {reactKey: number}) => {
  const [code, setCode] = useState([1, 2, 3, 4])
  return (
    <div>
      <Component key={reactKey} {...{code, setCode}} />
      <div>nodeCount: {Codec.Prufer.computeNodeCount(code).toString()}</div>
      <div>treeIndex: {Codec.Prufer.toOrdinal(code)[0].toString()}</div>
    </div>
  )
}

const meta = {
  component: Wrapper,
  parameters: parameters.source(code),
  args: {reactKey: 1},
} satisfies Meta<typeof Wrapper>

export default meta

type Story = StoryObj<typeof meta>

export const Toolbar: Story = {}
