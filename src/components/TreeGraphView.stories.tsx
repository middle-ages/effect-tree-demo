import {FrameDecorator, parameters} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {TreeGraphView as Component} from './TreeGraphView'
import code from './TreeGraphView.jsx?raw'
import {from, of} from 'effect-tree'

const meta = {
  component: Component,
  parameters: {...parameters.fullscreenLayout, ...parameters.source(code)},
  args: {
    tree: from(
      'a',
      of('b'),
      from('c', of('d'), of('e'), from('f', of('g'), of('h'))),
      of('i'),
    ),
  },
  decorators: [FrameDecorator({})],
} satisfies Meta<typeof Component>

type Story = StoryObj<typeof meta>

export const TreeGraphView: Story = {}

export default meta
