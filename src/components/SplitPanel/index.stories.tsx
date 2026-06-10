import {parameters} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {SplitPanel as Component} from './index'
import code from './index.jsx?raw'

const meta = {
  component: Component,
  parameters: {...parameters.fullscreenLayout, ...parameters.source(code)},
  args: {
    left: <div className='w-75 bg-orange-500'>left</div>,
    right: 'right',
    leftClassName: 'bg-blue-500 size-full',
    rightClassName: 'bg-green-500 size-full',
    minWidthsPx: [300, 200],
    className: 'fill-container px-4',
  },
} satisfies Meta<typeof Component>

type Story = StoryObj<typeof meta>

export const SplitPanel: Story = {}

export default meta
