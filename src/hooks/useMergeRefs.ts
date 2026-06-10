import {noop} from '#Function'
import {useCallback, type RefCallback} from 'react'

export const useMergeRefPair = (
  self: RefCallback<HTMLElement>,
  that: RefCallback<HTMLElement>,
): RefCallback<HTMLElement> =>
  useCallback(
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
    },
    [self, that],
  )

export const useMergeRefTriad = (
  first: RefCallback<HTMLElement>,
  second: RefCallback<HTMLElement>,
  third: RefCallback<HTMLElement>,
): RefCallback<HTMLElement> =>
  useMergeRefPair(useMergeRefPair(first, second), third)
