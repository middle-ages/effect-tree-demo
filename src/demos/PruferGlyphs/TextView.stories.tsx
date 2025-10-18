import {range} from '#Array'
import {parameters} from '#storybook'
import {drawRomanTree} from '#tree'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {Codec} from 'effect-tree'
import {TextView as Component} from './TextView'
import code from './TextView.jsx?raw'

const pruferCode = [7, 6, 5, 4, 3]

const meta = {
  component: Component,
  parameters: {...parameters.source(code), ...parameters.fullscreenLayout},
  args: {
    lines: drawRomanTree(Codec.Prufer.decode(pruferCode), 'lowerAscii', 'thin'),
    stats: {
      nodeCount: {
        id: 'nodeCount',
        label: 'node count',
        title: 'title foo',
        value: 112n,
      },
      maxDegree: {
        id: 'maxDegree',
        label: 'max degree',
        title: 'title foo',
        value: 12n,
      },
      maxDepth: {
        id: 'maxDepth',
        label: 'max depth',
        title: 'title Bar',
        value: 45n,
      },
    },
  },
  render: function Render(props) {
    return (
      <div className="m-2 scroll-container overflow-hidden cq-4">
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
    className: '*:text-[10px]',
    lines: drawRomanTree(
      Codec.Prufer.decode(range(1, 100).map(x => Math.floor(x ** (9 / 10)))),
      'lower',
      'unixRound',
    ),
  },
}
