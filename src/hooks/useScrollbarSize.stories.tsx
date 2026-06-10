import {parameters} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import code from './useScrollbarSize.stories.jsx?raw'
import {useScrollbarSize} from './useScrollbarSize'

const Component = () => {
  const scrollbarWidth = useScrollbarSize(document)
  return <div>ScrollbarSize≔{scrollbarWidth.toFixed(3)}</div>
}

const meta = {
  component: Component,
  parameters: {...parameters.centeredLayout, ...parameters.source(code)},
} satisfies Meta<typeof Component>

type Story = StoryObj<typeof meta>

export const UseScrollbarSize: Story = {}

export default meta
