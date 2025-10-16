import {map} from '#Array'
import {noop, pipe} from '#Function'
import {map as mapRecord} from '#Record'
import {FrameDecorator, parameters} from '#storybook'
import type {VoidAction} from '#types'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {actionMap} from './actions'
import code from './index.jsx?raw'
import {Toolbar as Component} from './index'
import {type ModifyAction, type PrimedActionMap} from './types'

const actions: PrimedActionMap = pipe(actionMap, mapRecord(map(action)))

const meta = {
  component: Component,
  parameters: parameters.source(code),
  args: {actions},
  decorators: FrameDecorator({className: 'rounded-[11px] *:rounded-lg *:p-2'}),
} satisfies Meta<typeof Component>

export default meta

type Story = StoryObj<typeof meta>

export const Toolbar: Story = {}

function action({apply: _1, disable: _2, ...action}: ModifyAction): VoidAction {
  return {...action, apply: noop, disable: undefined}
}
