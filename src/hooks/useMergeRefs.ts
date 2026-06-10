import {noop} from '#Function'
import {useCallback, type RefCallback, type RefObject} from 'react'

export const useMergeRefPair = (
  self: RefCallback<HTMLElement>,
  that?: RefCallback<HTMLElement>,
): RefCallback<HTMLElement> =>
  useCallback(
    (element: HTMLElement | null): void | (() => void) =>
      (that === undefined ? self : merge(self, that))(element),
    [self, that],
  )

export const useMergeRefTriad = (
  first: RefCallback<HTMLElement>,
  second: RefCallback<HTMLElement>,
  third: RefCallback<HTMLElement>,
): RefCallback<HTMLElement> =>
  useMergeRefPair(useMergeRefPair(first, second), third)

const merge =
  (self: RefCallback<HTMLElement>, that: RefCallback<HTMLElement>) =>
  (element: HTMLElement | null): (() => void) => {
    if (element === null) {
      return noop
    }

    const cleanSelf = self(element)
    const cleanThat = that(element)

    return () => {
      cleanSelf?.()
      cleanThat?.()
    }
  }

export const useMergeWithRefObject = (
  self: RefCallback<HTMLElement>,
  thatRef: RefObject<HTMLElement | null>,
) => {
  return useCallback(
    (element: HTMLElement | null): (() => void) => {
      if (element === null) {
        return noop
      }

      const cleanSelf = self(element)
      thatRef.current = element

      return () => {
        cleanSelf?.()
      }
    },
    [self, thatRef],
  )
}
