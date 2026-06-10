import type {StoryObj} from '@storybook/react-vite'
import type {FC} from 'react'
import {type Identified} from '#util'

export const hover = {parameters: {pseudo: {hover: '#hover'}}}

export const active = {parameters: {pseudo: {active: '#active'}}}

export const focus = {
  parameters: {pseudo: {focus: '#focus'}},
}

export const focusVisible = {
  parameters: {pseudo: {focusVisible: '#focusVisible'}},
}

export const args = {
  hover: {id: 'hover'},
  active: {id: 'active'},
  focus: {id: 'focus'},
  focusVisible: {id: 'focusVisible'},
}

export const story = {
  hover: <Props extends Identified>(
    props?: Partial<Props>,
  ): StoryObj<FC<Props>> => ({
    args: {...props, ...args.hover} as Partial<Props>,
    ...hover,
  }),

  active: <Props extends Identified>(
    props?: Partial<Props>,
  ): StoryObj<FC<Props>> => ({
    args: {...props, ...args.active} as Partial<Props>,
    ...active,
  }),

  focus: <Props extends Identified>(
    props?: Partial<Props>,
  ): StoryObj<FC<Props>> => ({
    args: {...props, ...args.focus} as Partial<Props>,
    ...focus,
  }),

  focusVisible: <Props extends Identified>(
    props?: Partial<Props>,
  ): StoryObj<FC<Props>> => ({
    args: {...props, ...args.focusVisible} as Partial<Props>,
    ...focusVisible,
  }),
}

export const parameters = {
  pseudo: {
    hover: '#hover',
    active: '#active',
    focus: '#focus',
    focusVisible: '#focusVisible',
  },
}
