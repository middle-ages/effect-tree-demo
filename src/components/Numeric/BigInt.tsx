import {pipe} from '#Function'
import {type Simplify} from 'effect/Types'
import type {ComponentProps, FC} from 'react'
import {assumeProps, mapProp} from 'react-compinators'
import {twMerge} from 'tailwind-merge'
import {Base} from './Base'

type Props = Simplify<
  Omit<
    ComponentProps<typeof Base<string>>,
    'spacingLeftPx' | 'spacingRightPx' | 'maximized'
  >
>

export const BigIntInput = pipe(
  {
    spacingLeftPx: 1,
    spacingRightPx: 0.5,
  },
  assumeProps(Base<string>),
  mapProp(
    (className: string) => twMerge('bigint-input', className),
    'className',
  )<Props & Record<'className', string>>,
) as FC<Props>
