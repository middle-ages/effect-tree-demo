import type {Meta, StoryObj} from '@storybook/react-vite'
import {Text as Component} from './Text.js'
import {parameters} from '#storybook'
import code from './Text.jsx?raw'

type Story = StoryObj<typeof Component>

const meta = {
  component: Component,
  parameters: parameters.source(code),
  args: {lines: ['🞄   ', ' 🞄  ', '  🞄  ', '   🞄']},
} satisfies Meta<typeof Component>

export const Text: Story = {}

export default meta
