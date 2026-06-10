import {type Types} from 'effect'
import type {ComponentProps, FC} from 'react'
import {assumeProps} from 'react-compinators'
import {Base} from './Base'

type Props = Types.Simplify<
  Omit<
    ComponentProps<typeof Base<string>>,
    'spacingLeftPx' | 'spacingRightPx' | 'maximized'
  >
>

export const BigIntInput: FC<Props> = assumeProps(Base<string>)({
  spacingLeftPx: 0.5,
  spacingRightPx: 0.5,
  maximized: true,
})
