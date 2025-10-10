import {FrameDecorator, parameters} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {OrdinalLabel as Component} from './OrdinalLabel'
import code from './OrdinalLabel.jsx?raw'

const meta = {
  component: Component,
  parameters: {...parameters.paddedLayout, ...parameters.source(code)},
  args: {
    ordinal: 123,
    label: 'The quick brown fox jumps over the lazy dog.',
    topOrdinal: 345,
  },
  decorators: [FrameDecorator({className: '*:border'})],
} satisfies Meta<typeof Component>

type Story = StoryObj<typeof meta>

export const OrdinalLabel: Story = {}

export default meta
