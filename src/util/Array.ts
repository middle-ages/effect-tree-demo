import {
  tailNonEmpty,
  headNonEmpty,
  zip,
  length,
  max,
  min,
  lastNonEmpty,
  initNonEmpty,
  dedupeWith,
  append as _append,
  appendAll as _appendAll,
  prepend as _prepend,
  prependAll as _prependAll,
  type NonEmptyArray,
  map,
  zipWith,
  type NonEmptyReadonlyArray,
} from 'effect/Array'
import {Number, pipe, String} from 'effect'
import type {EndoOf} from './Function.js'

export * from 'effect/Array'
export {transpose, type NonEmptyArray2} from './Array/transpose.js'

export const append = Object.assign(_append, {
  flipped:
    <A>(self: A[]): ((last: A) => A[]) =>
    last =>
      _append(self, last),
})

export const prepend = Object.assign(_prepend, {
  flipped:
    <A>(self: A[]): ((last: A) => A[]) =>
    head =>
      _prepend(self, head),
})

export const appendAll = Object.assign(_appendAll, {
  flipped:
    <A>(self: A[]): ((tail: A[]) => A[]) =>
    tail =>
      _appendAll(self, tail),
})

export const prependAll = Object.assign(_prependAll, {
  flipped:
    <A>(self: A[]): ((head: A[]) => A[]) =>
    init =>
      _prependAll(self, init),
})

/** `dedupeWith` string equivalence. */
export const dedupeStrings: EndoOf<string[]> = dedupeWith(String.Equivalence)

export const lastInit = <A>(xs: NonEmptyReadonlyArray<A>): [A, A[]] => [
  lastNonEmpty(xs),
  initNonEmpty(xs),
]

export const headTail = <A>([head, ...tail]: NonEmptyArray<A>): [A, A[]] => [
  head,
  tail,
]

export const surroundArray =
  <A>([prefix, suffix]: [A[], A[]]): ((xs: A[]) => A[]) =>
  xs => [...prefix, ...xs, ...suffix]

export function mapHeadTail<A, B>(onHead: (a: A) => B, onTail: (a: A) => B) {
  return (xs: NonEmptyArray<A>): NonEmptyArray<B> => {
    const [head, tail] = headTail(xs)
    return [onHead(head), ...pipe(tail, map(onTail))]
  }
}

/** Get the length of the longest child in a list of lists. */
export const longestChildLength: (
    xs: NonEmptyArray<unknown[]>,
  ) => number = children =>
    max(Number.Order)([
      0,
      ...pipe(
        children,
        map(xs => length(xs)),
      ),
    ]),
  /** Get the length of the shortest child in a list of lists. */
  shortestChildLength: (xs: NonEmptyArray<unknown[]>) => number = children =>
    pipe(
      children,
      map(xs => length(xs)),
      min(Number.Order),
    )

export const selfZipForward = <A>(
  xs: NonEmptyReadonlyArray<A>,
): NonEmptyReadonlyArray<[A, A]> => {
  const [tail, last] = [tailNonEmpty(xs), lastNonEmpty(xs)]
  return pipe(xs, zip([...tail, last])) as NonEmptyArray<[A, A]>
}

export const selfZipBackward = <A>(
  xs: NonEmptyReadonlyArray<A>,
): NonEmptyReadonlyArray<[A, A]> => {
  const [init, head] = [initNonEmpty(xs), headNonEmpty(xs)]
  return pipe(xs, zip([head, ...init]))
}

export const selfZip = <A>(xs: NonEmptyReadonlyArray<A>) =>
  pipe(
    xs,
    selfZipBackward,
    zipWith(
      selfZipForward(xs),
      ([center, backwards], [, forwards]) =>
        [center, backwards, forwards] as [center: A, backwards: A, forwards: A],
    ),
  )
