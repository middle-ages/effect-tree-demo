import {noop} from '#Function'
import {pipe} from '#util'
import {
  useCallback,
  useRef,
  useState,
  type RefCallback,
  type RefObject,
} from 'react'
import * as rx from 'rxjs'
import {subscribe} from './observable/helpers'
import {horizontalScrollObservable} from './observable/horizontalScroll'
import {wheelObservable} from './observable/wheel'

export interface UseHorizontalScroll {
  ref: RefCallback<HTMLElement>
  elementRef: RefObject<HTMLElement | null>
  scrollPx: number
  isScrolling: boolean
}

export const useHorizontalScroll = (): UseHorizontalScroll => {
  const [state, setState] = useState({
    isScrolling: false,
    scrollPx: 0,
  })
  const {scrollPx, isScrolling} = state

  const elementRef = useRef<HTMLElement>(null)

  const ref = useCallback((element: HTMLElement | null): (() => void) => {
    if (element === null) {
      return noop
    }

    elementRef.current = element
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

  return {ref, elementRef, scrollPx, isScrolling}
}
