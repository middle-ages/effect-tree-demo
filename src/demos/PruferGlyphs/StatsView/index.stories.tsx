import {replicate} from '#Array'
import {parameters} from '#storybook'
import {primeStats, type PrimedStats} from '#tree'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {pipe} from 'effect'
import {Codec} from 'effect-tree'
import {fn} from 'storybook/test'
import {StatsView as Component} from './index'
import code from './index.jsx?raw'

const buildStats = (code: number[]): PrimedStats =>
  primeStats(code, Codec.Prufer.decode(code))

const meta = {
  component: Component,
  parameters: {...parameters.paddedLayout, ...parameters.source(code)},
  args: {
    ...buildStats([1, 2, 3, 4]),
    setCode: fn(),
  },
} satisfies Meta<typeof Component>

export default meta

type Story = StoryObj<typeof meta>

export const TenNodes: Story = {}

export const ThreeNodes1: Story = {args: buildStats([1])}
export const ThreeNodes2: Story = {args: buildStats([2])}
export const ThreeNodes3: Story = {args: buildStats([3])}

export const FiftyNodes1: Story = {
  args: pipe(1, replicate(48), buildStats),
}

export const FiftyNodesLast: Story = {
  args: pipe(50, replicate(48), buildStats),
}
