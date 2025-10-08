import type {StoryContext, StoryFn} from '@storybook/react-vite'
import type {ComponentProps, FC} from 'react'
import {assumeProps} from 'react-compinators'
import {StoryFrame as Wrapper} from './components/StoryFrame'

type FrameDecoratorProps = Omit<ComponentProps<typeof Wrapper>, 'children'>

export const FrameDecorator = (props: FrameDecoratorProps) => {
  const Frame = assumeProps(Wrapper)(props)

  const Framed = <Args extends {}>(
    Story: StoryFn<FC<Args>>,
    context: StoryContext<Args>,
  ) => <Frame>{Story({...context.args}, context)}</Frame>

  return Framed
}
