import {FrameDecorator, parameters} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect, fn} from 'storybook/test'
import {StylePanel as Component} from './StylePanel.js'
import code from './StylePanel.jsx?raw'

const setFormat = fn()
const setTheme = fn()

const meta = {
  component: Component,
  parameters: {...parameters.source(code), ...parameters.paddedLayout},
  args: {
    format: 'decimal',
    theme: 'ascii',
    setFormat,
    setTheme,
  },
  decorators: FrameDecorator({className: '*:p-2'}),
} satisfies Meta<typeof Component>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {}

export const SetFormat: Story = {
  play: async ({args: {setFormat}, canvas, userEvent}) => {
    const select: HTMLSelectElement = canvas.getByLabelText('Label format')
    await expect(select).toHaveValue('decimal')
    await userEvent.selectOptions(select, 'upper')
    await expect(setFormat).toHaveBeenCalledWith('upper')
  },
}

export const SetTheme: Story = {
  play: async ({args: {setTheme}, canvas, userEvent}) => {
    const select: HTMLSelectElement = canvas.getByLabelText('Tree theme')
    await expect(select).toHaveValue('ascii')
    await userEvent.selectOptions(select, 'bullets')
    await expect(setTheme).toHaveBeenCalledWith('bullets')
  },
}
