import {withClassName, type WithClassName} from '#compinators'
import type {Types} from 'effect'
import type {FC} from 'react'

export const Pill: FC<Types.Simplify<WithClassName<'div'>>> =
  withClassName.div('pill-panel border-y-2 border-x-1 outset-xy')
