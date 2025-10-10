import {As, type HasElement, type StyledPropsWithChildren} from '#util'
import type {FC, HTMLElementType} from 'react'
import {mapProps} from 'react-compinators'
import {twMerge} from 'tailwind-merge'

export interface WithClassName<As extends HTMLElementType>
  extends Omit<HasElement<As>, 'as'>,
    StyledPropsWithChildren {}

/**
 * Given a tag name and a base class name, returns a component with a single
 * element that will use the given tag and base class name.
 */
export const withClassName =
  <As extends HTMLElementType>(as: As) =>
  (baseClassName?: string | string[]): FC<WithClassName<As>> =>
    mapProps(classNameMapper(as, baseClassName))(As<As>)

// Prefix element class with given base class and inject ‘as’.
const classNameMapper =
  <As extends HTMLElementType>(as: As, baseClassName?: string | string[]) =>
  ({
    attributes: {className, style, ...attributes} = {},
    className: propsClassName,
    style: propsStyle,
    ...rest
  }: WithClassName<As>): HasElement<As> => ({
    ...rest,
    as,
    attributes: {
      ...attributes,
      style: {...style, ...propsStyle},
      className: twMerge(baseClassName, className, propsClassName),
    },
  })

withClassName.div = withClassName('div')
withClassName.button = withClassName('button')
