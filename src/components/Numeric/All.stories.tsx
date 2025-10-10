import {GroupGallery, parameters, pseudo} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react'
import type {FC} from 'react'
import * as all from './index.stories'
import {rem, per} from '#util'

type Story = StoryObj<FC>

const Component = () => (
  <GroupGallery
    groups={{all}}
    name="Numeric"
    minColumnWidth={rem(13)}
    maxColumnWidth={per(7)}
    storyFrameClass="rounded-[15px] px-3 pt-[15px]"
  />
)

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {...pseudo.parameters, ...parameters.fullscreenLayout},
}

export const All: Story = {}

export default meta
