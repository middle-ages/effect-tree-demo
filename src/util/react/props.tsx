import type {
  CSSProperties,
  Dispatch,
  HTMLElementType,
  JSX,
  PropsWithChildren,
  SetStateAction,
} from 'react'
import * as Array from '../Array'
import {pipe} from '../Function'
import * as Record from '../Record'

/** A component with a required `className`. */
export interface HasClass {
  className: string
}

/** A component that allows external styling of one of its elements. */
export interface StyledProps {
  className?: string | undefined
  style?: CSSProperties | undefined
}

/** A component with class, style, and children. */
export interface StyledPropsWithChildren
  extends PropsWithChildren<StyledProps> {}

/**
 * A component that can be clicked and disabled. It requires an event handler that
 * can accept arguments of type `Args`, by default empty so all you need is a
 * `VoidFunction`.
 */
export interface Clickable<Args extends unknown[] = []> {
  isDisabled?: boolean
  onClick?: (...args: Args) => void
}

/** A component with an optional string ID. */
export interface Identified {
  id?: string
}

/**
 * A component that set its `dataset` prop as `data-` attributes on one of its
 * elements.
 */
export interface HasData {
  dataset: DataAttributes
}

/**
 * A component that exposes one of its elements so that:
 *
 * 1. You can change the tag.
 * 2. You can add a `pseudoClassId` useful for controlling element pseudo-states
 *    from outside the component.
 * 3. You can set any of the attributes associated with the tag in the
 *    `attributes` prop and they will be set on the element.
 */
export interface HasElement<Tag extends HTMLElementType> {
  /** Element tag of component element. */
  as: Tag
  /** ID of component element that has pseudo-classes applied to it. */
  pseudoClassId?: string | undefined
  /** Element attributes of component element. */
  attributes?: JSX.IntrinsicElements[Tag] | undefined
}

/** Type of the `setState` side of the `useState` hook. */
export type Dispatcher<T> = Dispatch<SetStateAction<T>>

export type DataAttributes = Record<`data-${string}`, string>

/** Spread the given `string ⇒ string` record as element `data-*` attributes. */
export const datasetAttributes = (
  dataset: Record<string, string>,
): DataAttributes =>
  pipe(
    dataset,
    Record.toEntries,
    Array.map(([key, value]) => [`data-${key}`, value] as const),
    Record.fromEntries,
  )
