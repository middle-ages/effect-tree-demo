import type {Types} from 'effect'
import {assumeProps} from 'react-compinators'
import type {ComponentProps, FC} from 'react'
import {Base} from './Base'

type Props = Types.Simplify<
  Omit<ComponentProps<typeof Base<number>>, 'spacingLeftPx' | 'spacingRightPx'>
>

export const NumericInput: FC<Props> = assumeProps(Base<number>)({
  spacingLeftPx: 0.5,
  spacingRightPx: 0.5,
})
