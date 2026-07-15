import {pipe} from '#Function'
import {roundEquivalence} from '#react/size'
import * as rx from 'rxjs'

export interface ScrollNotification {
  scrollPx: number
  isScrolling: boolean
}

export const horizontalScrollObservable = (
  element: HTMLElement,
): rx.Observable<ScrollNotification> => {
  const notification = pipe(element, connect, rx.map(toNotification(true)))

  const scrolling = pipe(
    notification,
    rx.distinctUntilChanged((self, that) =>
      roundEquivalence()(self.scrollPx, that.scrollPx),
    ),
  )

  const stopScrolling = pipe(
    notification,
    rx.debounceTime(400),
    rx.map(({isScrolling: _, ...rest}) => ({...rest, isScrolling: false})),
  )

  return rx.merge(scrolling, stopScrolling)
}

const connect = (element: HTMLElement) =>
  rx
    .fromEvent(element, 'scroll')
    .pipe(rx.throttleTime(16, undefined, {leading: true, trailing: true}))

const toNotification =
  (isScrolling: boolean) =>
  (event: Event): ScrollNotification => {
    const {target} = event as Event & {target: HTMLElement}
    return {scrollPx: target.scrollLeft, isScrolling}
  }
