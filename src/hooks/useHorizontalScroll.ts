import {noop} from '#Function'
import {pipe} from '#util'
import {useCallback, useState, type RefCallback} from 'react'
import * as rx from 'rxjs'
import {subscribe} from './observable/helpers'
import {
  horizontalScrollObservable,
  type ScrollNotification,
} from './observable/horizontalScroll'
import {wheelObservable} from './observable/wheel'

export interface UseHorizontalScroll {
  ref: RefCallback<HTMLElement>
  scrollPx: number
  isScrolling: boolean
}

const initialState: ScrollNotification = {scrollPx: 0, isScrolling: false}

export const useHorizontalScroll = (): UseHorizontalScroll => {
  const [state, setState] = useState(initialState)
  const {scrollPx, isScrolling} = state

  const ref = useCallback((element: HTMLElement | null): (() => void) => {
    if (element === null) {
      return noop
    }

    const weakElement = new WeakRef(element)

    const wheel = pipe(
      element,
      wheelObservable(),
      rx.tap(({direction, factor}) => {
        const scrollBy = -1 * direction * factor * 500
        weakElement
          .deref()
          ?.scrollBy({left: scrollBy, top: 0, behavior: 'smooth'})
      }),
    )

    const [cleanupWheel, cleanupScroll] = [
      subscribe(wheel),
      pipe(element, horizontalScrollObservable, rx.tap(setState), subscribe),
    ]

    return () => {
      cleanupWheel()
      cleanupScroll()
    }
  }, [])

  return {ref, scrollPx, isScrolling}
}
