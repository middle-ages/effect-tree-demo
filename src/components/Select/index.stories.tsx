import {argTypes, FrameDecorator, parameters, pseudo} from '#storybook'
import type {Meta, ReactRenderer, StoryObj} from '@storybook/react-vite'
import {useState, type ComponentProps, type FC} from 'react'
import type {BaseAnnotations} from 'storybook/internal/csf'
import {expect, fn} from 'storybook/test'
import type {SelectItem} from '../types'
import {Select as Generic} from './index'
import code from './index.jsx?raw'

type Alpha = 'a' | 'b' | 'c' | 'd' | 'e'

const Component = Generic<Alpha>

type Props = ComponentProps<typeof Component> & {label: string}

const items: SelectItem[] = [
  {id: 'a', label: 'A', title: 'a⇒A', icon: 'a⇐A'},
  {id: 'b', label: 'B', title: 'b⇒B', icon: 'b⇐B'},
  {id: 'c', label: 'C', title: 'c⇒C', icon: 'c⇐C'},
  {id: 'd', label: 'D', title: 'd⇒D', icon: 'd⇐D'},
  {id: 'e', label: 'E', title: 'e⇒E', icon: 'e⇐E'},
]

const getItem = (alpha: Alpha) =>
  items[(alpha.codePointAt(0) ?? 0) - 97] as SelectItem

const meta = {
  component: Component,
  parameters: {
    ...parameters.source(code),
    ...parameters.paddedLayout,
    ...pseudo.parameters,
  },

  argTypes: argTypes.disable('value', 'items'),
  args: {
    label: 'Sixty zippers',
    value: items[3] as SelectItem,
    items,
    onChange: fn(),
    title: 'Select Title',
  },
  decorators: FrameDecorator({className: '*:pt-2 *:px-2 *:pb-3'}),
  render: function Render({label, onChange: propsOnChange, ...props}) {
    const [value, setValue] = useState<SelectItem>(items[3] as SelectItem)
    const onChange = (value: Alpha) => {
      setValue(getItem(value))
      propsOnChange(value)
    }
    return (
      <label className="form-row-h flex gap-2 set-fg-control">
        <div className="truncate w-fit leading-8">{label}</div>
        <Component {...props} {...{value, onChange, label}} />
      </label>
    )
  },
} satisfies Meta<FC<Props>>

export default meta

type Story = StoryObj<typeof meta>

export const Select: Story = {}

export const FocusVisible: Story = {
  parameters: pseudo.story.focusVisible<Props>().parameters as BaseAnnotations<
    ReactRenderer,
    Props
  >['parameters'] & {},
  args: {id: 'focusVisible'},
}

export const SelectTest: Story = {
  play: async ({canvas, userEvent}) => {
    const select: HTMLSelectElement = canvas.getByRole('combobox')
    await expect(select).toHaveValue('d')
    await userEvent.selectOptions(select, 'b')
    await expect(select).toHaveValue('b')
  },
}
