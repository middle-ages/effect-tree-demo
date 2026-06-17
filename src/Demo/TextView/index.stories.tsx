import {range} from '#Array'
import {drawRomanTree} from '#model'
import {parameters} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {Codec} from 'effect-tree'
import {TextView as Component} from './index'
import code from './index.jsx?raw'

const meta = {
  component: Component,
  parameters: {...parameters.source(code), ...parameters.fullscreenLayout},
  render: function Render() {
    return (
      <div className='m-2 cq-4 overflow-hidden'>
        <Component />
      </div>
    )
  },
} satisfies Meta<typeof Component>

export default meta

type Story = StoryObj<typeof meta>

export const NoOverflow: Story = {}

export const Overflow: Story = {
  args: {
    lines: drawRomanTree(
      Codec.Prufer.decode(range(1, 100).map(x => Math.floor(x ** (9 / 10)))),
      'lower',
      'unixRound',
    ),
  },
}
