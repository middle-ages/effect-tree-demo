import {range} from '#Array'
import {parameters} from '#storybook'
import {drawRomanTree} from '#model'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {Codec} from 'effect-tree'
import {TextView as Component} from './index'
import code from './index.jsx?raw'

const pruferCode = [7, 6, 5, 4, 3]

const meta = {
  component: Component,
  parameters: {...parameters.source(code), ...parameters.fullscreenLayout},
  args: {
    lines: drawRomanTree(Codec.Prufer.decode(pruferCode), 'lowerAscii', 'thin'),
    nodeCount: {
      id: 'nodeCount',
      label: 'node count',
      title: 'title foo',
      value: '112',
    },
    maxDegree: {
      id: 'maxDegree',
      label: 'max degree',
      title: 'title foo',
      value: '12',
    },
    maxDepth: {
      id: 'maxDepth',
      label: 'max depth',
      title: 'title Bar',
      value: '45',
    },
  },
  render: function Render(props) {
    return (
      <div className='m-2 cq-4 overflow-hidden'>
        <Component {...props} />
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
