import {Equivalence} from 'effect'
import type {EndoOf} from 'effect-tree'

export interface SizePx {
  widthPx: number
  heightPx: number
}

export const SizePx = (widthPx: number, heightPx = widthPx): SizePx => ({
  widthPx,
  heightPx,
})

export const roundEquivalence =
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
