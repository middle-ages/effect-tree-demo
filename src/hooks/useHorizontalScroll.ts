import {subscribe} from './observable/helpers'
import {noop} from '#Function'
import {pipe} from '#util'
import {useCallback, type RefCallback} from 'react'
import * as rx from 'rxjs'
import {wheelObservable} from './observable/wheel'

export interface UseHorizontalScroll {
  scrollLeft: number
}

export const useHorizontalScroll = (): RefCallback<HTMLElement> => {
  const ref = useCallback((element: HTMLElement | null): (() => void) => {
    if (element === null) {
      return noop
    }

    const weakElement = new WeakRef(element)

    const observable = pipe(
      element,
      wheelObservable(),
      rx.tap(({direction, factor}) => {
        const scrollBy = -1 * direction * factor * 500
        weakElement
          .deref()
          ?.scrollBy({left: scrollBy, top: 0, behavior: 'smooth'})
      }),
    )

    return subscribe(observable)
  }, [])

  return ref
}
