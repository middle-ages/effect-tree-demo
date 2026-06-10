import {type Types} from 'effect'
import type {ComponentProps, FC} from 'react'
import {Base} from './Base'

type Props = Types.Simplify<ComponentProps<typeof Base<string>>>

export const BigIntInput: FC<Props> = Base<string>
