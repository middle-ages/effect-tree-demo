import {parameters} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {Codec} from 'effect-tree'
import {numericFormats} from './roman/roman'
import {TextView as Component} from './TextView'
import code from './TextView.jsx?raw'

const pruferCode = [7, 6, 5, 4, 3]

const meta = {
  component: Component,
  parameters: parameters.source(code),
  argTypes: {
    format: {
      control: {type: 'radio'},
      options: numericFormats,
    },
  },
  args: {
    tree: Codec.Prufer.decode(pruferCode),
    code: pruferCode,
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
