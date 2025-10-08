import type {StoryObj} from '@storybook/react-vite'
import type {FC} from 'react'
import {type Identified} from '#util'

export const hover = {parameters: {pseudo: {hover: '#hover'}}}
export const active = {parameters: {pseudo: {active: '#active'}}}

export const args = {
  hover: {id: 'hover'},
  active: {id: 'active'},
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
}

export const parameters = {
  pseudo: {
    hover: '#hover',
    active: '#active',
  },
}
