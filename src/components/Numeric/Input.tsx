import type {Types} from 'effect'
import type {ComponentProps, FC} from 'react'
import {Base} from './Base'

type Props = Types.Simplify<ComponentProps<typeof Base<number>>>

export const NumericInput: FC<Props> = Base<number>
