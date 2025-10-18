import {map, type NonEmptyArray} from '#Array'
import {FrameDecorator, parameters} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {Pill as Component} from '.'
import code from './index.jsx?raw'
import {pipe} from 'effect'
import type {VoidAction} from '../types'

const actions: NonEmptyArray<VoidAction> = pipe(
  ['a', 'b', 'c', 'd', 'e'] as const,
  map((id, i) => ({
    id,
    label: `label-${id}:${i.toString()}`,
    title: `title-${id}:${i.toString()}`,
    disable: undefined,
    apply: () => {},
  })),
)

const meta = {
  component: Component,
  parameters: {...parameters.paddedLayout, ...parameters.source(code)},
  args: {
    actions,
    className: '*:w-[20%]',
  },
  decorators: [
    FrameDecorator({
      className: '*:p-2 w-full h-12',
    }),
  ],
} satisfies Meta<typeof Component>

type Story = StoryObj<typeof meta>

export const Pill: Story = {}

export default meta
