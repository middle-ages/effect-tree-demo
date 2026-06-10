import {numberClamp} from '#Number'
import {Equivalence, Predicate} from 'effect'
import type {EndoOf} from 'effect-tree'
import type {MouseEvent} from 'react'
import {px} from '../css'
import {roundEquivalence} from './size'

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
