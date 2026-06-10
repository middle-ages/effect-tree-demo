import {FrameDecorator, parameters} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {Stack as Component} from './index'
import code from './index.jsx?raw'

const Wrapper = Component<['a', 'b', 'c', 'd']>

const meta = {
  component: Wrapper,
  parameters: {...parameters.fullscreenLayout, ...parameters.source(code)},
  argTypes: {
    top: {
      control: 'radio',
      options: ['a', 'b', 'c', 'd'],
    },
  },
  args: {
    top: 'c',
    subNodes: {
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd',
    },
  },
  decorators: [FrameDecorator({className: '*:h-6 *:truncate'})],
} satisfies Meta<typeof Wrapper>

type Story = StoryObj<typeof meta>

export const Stack: Story = {}

export default meta
