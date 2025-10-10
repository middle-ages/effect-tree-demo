import {map, replicate} from '#Array'
import {fromNumber, unwords} from '#String'
import {fromCode, parameters} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {pipe} from 'effect'
import type {FC} from 'react'
import {mapProp} from 'react-compinators'
import {StatsView as Component} from './index'
import code from './index.jsx?raw'

const Wrapper: FC<{
  stats: string
  maxWidthPx?: number
}> = mapProp(fromCode, 'stats')(Component)

const meta = {
  component: Wrapper,
  parameters: {...parameters.paddedLayout, ...parameters.source(code)},
  args: {stats: '1, 2, 3, 4, 5, 6, 7, 8', maxWidthPx: 200},
} satisfies Meta<typeof Wrapper>

export default meta

type Story = StoryObj<typeof meta>

export const TenNodes: Story = {}

export const ThreeNodes1: Story = {args: {stats: '1'}}
export const ThreeNodes2: Story = {args: {stats: '2'}}
export const ThreeNodes3: Story = {args: {stats: '3'}}

export const FiftyNodes1: Story = {
  args: {stats: pipe(1, replicate(48), map(fromNumber), unwords.comma)},
}

export const FiftyNodesLast: Story = {
  args: {stats: pipe(50, replicate(48), map(fromNumber), unwords.comma)},
}
