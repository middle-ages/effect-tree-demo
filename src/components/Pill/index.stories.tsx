import {Button} from '#Button'
import {FrameDecorator, parameters} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {useState} from 'react'
import {fn} from 'storybook/test'
import {Pill as Component} from './index'
import code from './index.jsx?raw'

const Wrapper = ({onClick}: {onClick: () => void}) => {
  const [isDisabledA, setIsDisabledA] = useState(false)
  const [isDisabledB, setIsDisabledB] = useState(false)

  return (
    <Component>
      <Button.Focus
        id='a'
        title='title a'
        disabledNote='disabled a'
        isDisabled={isDisabledA}
        isWrapped
        {...{onClick}}>
        a
      </Button.Focus>
      <Button.Focus
        id='b'
        title='title b'
        disabledNote='disabled b'
        isDisabled={isDisabledB}
        isWrapped
        onClick={() => {
          setIsDisabledA(old => !old)
        }}>
        b
      </Button.Focus>
      <Button.Focus
        id='c'
        title='title c'
        isDisabled={false}
        disabledNote='disabled c'
        isWrapped
        onClick={() => {
          setIsDisabledB(old => !old)
        }}>
        c
      </Button.Focus>
    </Component>
  )
}

const meta = {
  component: Wrapper,
  parameters: {...parameters.paddedLayout, ...parameters.source(code)},
  args: {onClick: fn()},
  decorators: FrameDecorator({className: '*:p-2 w-full h-12'}),
} satisfies Meta<typeof Wrapper>

type Story = StoryObj<typeof meta>

export const Pill: Story = {}

export default meta
