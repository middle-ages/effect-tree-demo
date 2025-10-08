import type {Meta, StoryObj} from '@storybook/react-vite'
import {TextView as Component} from './TextView.js'
import {parameters} from '#storybook'
import code from './TextView.jsx?raw'
import {binaryTree} from 'effect-tree'
import {numericFormats} from './roman/roman.js'

const meta = {
  component: Component,
  parameters: parameters.source(code),
  argTypes: {
    format: {
      control: {type: 'inline-radio'},
      options: numericFormats,
    },
  },
  args: {
    tree: binaryTree(8),
    format: 'decimal',
  },
} satisfies Meta<typeof Component>

export default meta

type Story = StoryObj<typeof meta>

export const TextView: Story = {
  args: {
    format: 'decimal',
  },
}
