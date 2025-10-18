import {rem, per} from '#util'
import {GroupGallery, pseudo} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react'
import type {FC} from 'react'
import * as groups from './index.stories'

type Story = StoryObj<FC>

const Component = () => (
  <GroupGallery
    groups={{groups}}
    name="Button"
    minColumnWidth={rem(8)}
    maxColumnWidth={per(11)}
    storyFrameClass="rounded-2xl p-3"
  />
)

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: pseudo.parameters,
}

export const All: Story = {}

export default meta
