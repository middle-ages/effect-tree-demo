import type {FC} from 'react'
import {mapProp} from 'react-compinators'
import {twMerge} from 'tailwind-merge'
import type {StyledPropsWithChildren} from './util.js'

export const withClassName = (baseClassName?: string | string[]) =>
  mapProp(
    (className: string) => twMerge(baseClassName, className),
    'className',
  )<Omit<StyledPropsWithChildren, 'className'> & {className: string}>(
    ({children, className, ...props}) => (
      <div className={twMerge(baseClassName, className)} {...props}>
        {children}
      </div>
    ),
  ) as FC<StyledPropsWithChildren>
