import type {StoryContext, StoryFn} from '@storybook/react-vite'
import type {ComponentProps, FC} from 'react'
import {store} from '#store'
import {assumeProps} from 'react-compinators'
import {StoryFrame as Wrapper} from './components/StoryFrame'
import {Provider} from 'react-redux'

type FrameDecoratorProps = Omit<ComponentProps<typeof Wrapper>, 'children'>

export const FrameDecorator = (props: FrameDecoratorProps) => {
  const Frame = assumeProps(Wrapper)(props)

  const Framed = <Args extends {}>(
    Story: StoryFn<FC<Args>>,
    context: StoryContext<Args>,
  ) => <Frame>{Story({...context.args}, context)}</Frame>

  return Framed
}

export const StoreDecorator = () => {
  const Provided = <Args extends {}>(
    Story: StoryFn<FC<Args>>,
    context: StoryContext<Args>,
  ) => <Provider {...{store}}>{Story({...context.args}, context)}</Provider>

  return Provided
}
