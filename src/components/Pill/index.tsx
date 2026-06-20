import {withClassName, type WithClassName} from '#compinators'
import type {Types} from 'effect'
import type {FC} from 'react'

export const Pill: FC<Types.Simplify<WithClassName<'div'>>> = withClassName.div(
  'pill-panel border inset-xy-dim bg-black/20 first:ml-px last:mr-px',
)
