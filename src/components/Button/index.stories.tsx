import {argTypes, parameters, pseudo} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import type {ComponentProps, FC} from 'react'
import {action} from 'storybook/actions'
import {Button as Component} from './index'
import code from './index.jsx?raw'
import {mapProp} from 'react-compinators'
import {pipe} from 'effect'

type Props = Omit<ComponentProps<typeof Component>, 'disable'> & {
  disable: string
}

const Wrapper: FC<Props> = pipe(
  Component,
  mapProp(
    (s: string) => (s === '' ? undefined : ([true, s] as [boolean, string])),
    'disable',
  ),
)

const meta = {
  component: Wrapper,
  parameters: {...parameters.source(code), ...parameters.paddedLayout},
  argTypes: {
    ...argTypes.disable('apply'),
  },
  args: {
    id: 'firstCode',
    label: 'First Code',
    title: 'Jump to first code.',
    disable: '',
    apply: action('apply'),
  },
} satisfies Meta<FC<Props>>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {}

export const Disabled: Story = {
  args: {
    disable: 'disable note',
  },
}

export const Hover: Story = pseudo.story.hover<Props>()
export const Active: Story = pseudo.story.active<Props>()
export const Focus: Story = pseudo.story.focusVisible<Props>()

export const DisabledHover: Story = {
  parameters: Hover.parameters as {},
  args: {...Disabled.args, ...Hover.args},
}

export const DisabledActive: Story = {
  parameters: Active.parameters as {},
  args: {...Disabled.args, ...Active.args},
}

export const DisabledFocus: Story = {
  parameters: Focus.parameters as {},
  args: {...Disabled.args, ...Focus.args},
}
