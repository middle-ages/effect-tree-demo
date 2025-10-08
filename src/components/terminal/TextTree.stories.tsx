import type {Meta, StoryObj} from '@storybook/react-vite'
import {TextTree as Component} from './TextTree.js'
import {parameters} from '#storybook'
import code from './TextTree.jsx?raw'
import {binaryTree} from 'effect-tree'

const meta = {
  component: Component,
  parameters: parameters.source(code),
  args: {
    tree: binaryTree.string(8),
  },
} satisfies Meta<typeof Component>

export default meta

type Story = StoryObj<typeof meta>

export const TextTree: Story = {}
