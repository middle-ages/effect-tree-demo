import {map, replicate} from '#Array'
import {fromNumber, unwords} from '#String'
import {FrameDecorator, StoreDecorator, parameters} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {pipe} from 'effect'
import {CodeEditor as Component} from './index'
import code from './index.jsx?raw'

const meta = {
  component: Component,
  parameters: parameters.source(code),
  args: {code: '1, 2, 3, 4, 5, 6, 7, 8'},
  decorators: [FrameDecorator({}), StoreDecorator()],
} satisfies Meta<typeof Component>

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

/*

const stringToCode = (code: string): number[] =>
  code === '' ? [] : code.split(/\s,\s/).map(s => Number.parseInt(s))
rg

const Wrapper: FC<{
  code: string
  setDigit: (index: number, digit: number) => void
}> = mapProp(stringToCode, 'code')(Component)

*/
