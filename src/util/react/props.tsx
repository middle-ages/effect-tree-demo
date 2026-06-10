import {numberClamp} from '#Number'
import {Equivalence, Predicate} from 'effect'
import type {
  CSSProperties,
  Dispatch,
  HTMLElementType,
  JSX,
  MouseEvent,
  PropsWithChildren,
  SetStateAction,
} from 'react'
import {px} from '../css'
import * as Array from '../Array'
import {pipe} from '../Function'
import * as Record from '../Record'
import type {EndoOf} from 'effect-tree'

/**
 * Some state of type S and its dispatcher.
 */
export type StateEffect<Key extends string, S> = Record<Key, S> &
  Record<`set${Capitalize<Key>}`, Dispatcher<S>>

/**
 * A component with a required `className`.
 */
export interface HasClass {
  className: string
}

/**
 * A component that allows external styling of one of its elements.
 *
 */
export interface StyledProps {
  className?: string | undefined
  style?: CSSProperties | undefined
}

/**
 * A component with class, style, and children.
 */
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

/**
 * A component with an optional string ID.
 */
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

/**
 * Type of the `setState` side of the `useState` hook.
 */
export type Dispatcher<T> = Dispatch<SetStateAction<T>>

export type DataAttributes = Record<`data-${string}`, string>

/**
 * Spread the given `string ⇒ string` record as element `data-*` attributes.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const datasetAttributes = (
  dataset: Record<string, string>,
): DataAttributes =>
  pipe(
    dataset,
    Record.toEntries,
    Array.map(([key, value]) => [`data-${key}`, value] as const),
    Record.fromEntries,
  )

export interface SizePx {
  widthPx: number
  heightPx: number
}

export const SizePx = (widthPx: number, heightPx = widthPx): SizePx => ({
  widthPx,
  heightPx,
})

const roundEquivalence =
  (scale: number): Equivalence.Equivalence<number> =>
  (self, that) =>
    Math.abs(self - that) <= 1 / Math.pow(10, scale)

SizePx.equals = Equivalence.struct({
  widthPx: roundEquivalence(1),
  heightPx: roundEquivalence(1),
})

SizePx.zero = {widthPx: 0, heightPx: 0}

SizePx.show = ({widthPx, heightPx}: SizePx): string =>
  `${widthPx.toFixed(0)}, ${heightPx.toFixed(0)}`

SizePx.add =
  (self: SizePx): EndoOf<SizePx> =>
  that => ({
    widthPx: self.widthPx + that.widthPx,
    heightPx: self.heightPx + that.heightPx,
  })

SizePx.delta =
  (that: SizePx): EndoOf<SizePx> =>
  self => ({
    widthPx: self.widthPx - that.widthPx,
    heightPx: self.heightPx - that.heightPx,
  })

SizePx.half = ({widthPx, heightPx}: SizePx): SizePx => ({
  widthPx: widthPx / 2,
  heightPx: heightPx / 2,
})

SizePx.double = ({widthPx, heightPx}: SizePx): SizePx => ({
  widthPx: widthPx * 2,
  heightPx: heightPx * 2,
})

export interface PointPx {
  yPx: number
  xPx: number
}

export const PointPx = (xPx: number, yPx = xPx): PointPx => ({
  xPx,
  yPx,
})

PointPx.show = ({xPx, yPx}: PointPx): string =>
  `${xPx.toFixed(0)}, ${yPx.toFixed(0)}`

PointPx.x = ({xPx}: PointPx): number => xPx
PointPx.y = ({yPx}: PointPx): number => yPx

const pointPxEquals: Equivalence.Equivalence<PointPx> = Equivalence.struct({
  xPx: roundEquivalence(2),
  yPx: roundEquivalence(2),
})

PointPx.equals = pointPxEquals

PointPx.zero = {
  xPx: 0,
  yPx: 0,
}

PointPx.scale = ({xPx, yPx}: PointPx, scale: number) => ({
  xPx: xPx * (1 - scale),
  yPx: yPx * (1 - scale),
})

PointPx.delta = (self: PointPx, that: PointPx): PointPx => ({
  xPx: self.xPx - that.xPx,
  yPx: self.yPx - that.yPx,
})

PointPx.add =
  (self: PointPx): EndoOf<PointPx> =>
  that => ({
    xPx: self.xPx + that.xPx,
    yPx: self.yPx + that.yPx,
  })

PointPx.fromMouseEvent = ({
  clientX,
  clientY,
}: {
  clientX: number
  clientY: number
}): PointPx => ({
  xPx: clientX,
  yPx: clientY,
})

PointPx.fromWheelEvent = (event: MouseEvent<HTMLElement>): PointPx => ({
  xPx: (event as unknown as {offsetX: number}).offsetX,
  yPx: (event as unknown as {offsetY: number}).offsetY,
})

PointPx.translate = ({xPx, yPx}: PointPx): string =>
  `translate(${px(xPx)}, ${px(yPx)})`

PointPx.clamp =
  (min: PointPx, max: PointPx): EndoOf<PointPx> =>
  ({xPx, yPx}) => ({
    xPx: numberClamp(min.xPx, max.xPx)(xPx),
    yPx: numberClamp(min.yPx, max.yPx)(yPx),
  })

const isZero: Predicate.Predicate<PointPx> = point =>
  PointPx.equals(PointPx.zero, point)

PointPx.isZero = isZero

export interface ScaledPointPx extends PointPx {
  scale: number
}

export const ScaledPointPx =
  (scale: number) =>
  (xPx: number, yPx: number): ScaledPointPx => ({
    scale,
    ...PointPx(xPx, yPx),
  })

ScaledPointPx.zero = {...PointPx.zero, scale: 1}

ScaledPointPx.scale = ({scale, ...point}: ScaledPointPx): ScaledPointPx => ({
  scale,
  ...PointPx.scale(point, scale),
})

const scaledPointPxEquals: Equivalence.Equivalence<ScaledPointPx> =
  Equivalence.struct({
    xPx: roundEquivalence(2),
    yPx: roundEquivalence(2),
    scale: roundEquivalence(3),
  })

ScaledPointPx.equals = scaledPointPxEquals
