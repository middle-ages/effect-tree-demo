import {map, replicate} from '#Array'
import {fromNumber, unwords} from '#String'
import {FrameDecorator, parameters, stringToCode} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {pipe} from 'effect'
import type {FC} from 'react'
import {mapProp} from 'react-compinators'
import {Footer as Component} from './Footer'
import code from './Footer.jsx?raw'

const Wrapper: FC<{
  code: string
}> = mapProp(stringToCode, 'code')(Component)

const meta = {
  component: Wrapper,
  parameters: parameters.source(code),
  args: {code: '1, 2, 3, 4, 5, 6, 7, 8'},
  decorators: FrameDecorator({}),
} satisfies Meta<typeof Wrapper>

export default meta

type Story = StoryObj<typeof meta>

export const TenNodes: Story = {}

export const NoNodes: Story = {args: {code: ''}}

export const ThreeNodes1: Story = {args: {code: '1'}}
export const ThreeNodes2: Story = {args: {code: '2'}}
export const ThreeNodes3: Story = {args: {code: '3'}}

export const FiftyNodes1: Story = {
  args: {code: pipe(1, replicate(48), map(fromNumber), unwords.comma)},
}

export const FiftyNodesLast: Story = {
  args: {code: pipe(50, replicate(48), map(fromNumber), unwords.comma)},
}
