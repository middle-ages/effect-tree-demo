import {StoreDecorator, parameters} from '#storybook'
import {TreeCode} from '#model'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {Codec} from 'effect-tree'
import {useAppSelector, useSetCode} from '#store'
import {Toolbar as Component} from './index'
import code from './index.jsx?raw'

const Wrapper = ({reactKey}: {reactKey: number}) => {
  const setCode = useSetCode()
  const code = useAppSelector(TreeCode.selectCode)
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
  decorators: StoreDecorator(),
} satisfies Meta<typeof Wrapper>

export default meta

type Story = StoryObj<typeof meta>

export const Toolbar: Story = {}
