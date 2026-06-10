import {parameters, pseudo} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {useCallback, useState, type ComponentProps, type FC} from 'react'
import {expect, fn} from 'storybook/test'
import {Button as Component} from './index'
import code from './index.jsx?raw'

type Props = ComponentProps<typeof Component>

const meta = {
  component: Component,
  parameters: {...parameters.source(code), ...parameters.paddedLayout},
  argTypes: {
    children: {control: 'text'},
    title: {control: 'text'},
    disabledNote: {control: 'text'},
    isDisabled: {control: 'boolean'},
    isActive: {control: 'boolean'},
    isFocusable: {control: 'boolean'},
  },
  args: {
    id: 'firstCode',
    children: 'First Code',
    title: 'Jump to first code.',
    disabledNote: 'The disabled note.',
    isDisabled: false,
    isActive: false,
    isFocusable: true,
    className: 'px-2',
    onClick: fn() as () => void,
  },
} satisfies Meta<FC<Props>>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {}

export const Disabled: Story = {args: {isDisabled: true}}

export const ExternallyActive: Story = {args: {isActive: true}}

export const DisabledExternallyActive: Story = {
  args: {...Disabled.args, ...ExternallyActive.args},
}

export const MultipleChildren: Story = {
  args: {
    children: (
      <div>
        <span className='pr-1'>First</span>
        <span>Second</span>
      </div>
    ),
  },
}

export const Hover: Story = pseudo.story.hover<Props>()
export const Focus: Story = pseudo.story.focusVisible<Props>()

export const FocusOnNotFocusable: Story = pseudo.story.focusVisible<Props>({
  isFocusable: false,
})

export const DisabledHover: Story = {
  parameters: Hover.parameters as {},
  args: {...Disabled.args, ...Hover.args},
}

export const DisabledFocus: Story = {
  parameters: Focus.parameters as {},
  args: {...Disabled.args, ...Focus.args},
}

export const ClickTest: Story = {
  args: {children: 'before'},
  render: function Render(props) {
    const [label, setLabel] = useState('before')

    const onClick = useCallback(() => {
      setLabel('after')
    }, [])

    return (
      <Component {...props} {...{onClick}}>
        {label}
      </Component>
    )
  },
  play: async ({canvas, userEvent}) => {
    const button = canvas.getByText('before')
    await userEvent.click(button)
    await expect(canvas.getByText('after')).toBeInTheDocument()
  },
}
