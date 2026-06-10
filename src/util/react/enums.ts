import * as Pair from '../Pair'

export type Axis = 'horizontal' | 'vertical'
export type Face = 'convex' | 'concave'
export type AsTag = 'div' | 'button'

export interface Direction {
  horizontal: 'left' | 'right'
  vertical: 'top' | 'bottom'
  any: 'top' | 'right' | 'bottom' | 'left'
}

export type HorizontalDirection = Direction['horizontal']
export type VerticalDirection = Direction['vertical']
export type AnyDirection = Direction['any']

const axisValues: Axis[] = ['horizontal', 'vertical']

export const faces: Face[] = ['convex', 'concave']

export const axis = {
  all: axisValues,
  sizeKey: (axis: Axis): 'width' | 'height' =>
    axis === 'horizontal' ? 'width' : 'height',
  map: <R>(f: (axis: Axis) => R): Pair.Pair<R> => [
    f('horizontal'),
    f('vertical'),
  ],
}

export const direction: {
  horizontal: Direction['horizontal'][]
  vertical: Direction['vertical'][]
} = {
  horizontal: ['left', 'right'],
  vertical: ['top', 'bottom'],
}
