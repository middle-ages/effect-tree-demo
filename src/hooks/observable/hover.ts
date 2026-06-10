import {K, pipe} from '#Function'
import {type Pair} from '#Pair'
import {
  fromMouseEnter,
  fromMouseLeave,
  fromMouseMove,
  fromPointerDown,
  noButtonsPressed,
} from '#pointer'
import {fromBlur, fromEscapeDown} from '#react/keyboard'
import type {Equivalence} from 'effect/Equivalence'
import * as rx from 'rxjs'
import {mergeObservable} from './helpers'

const beforeHoverDelayMs = 600

interface HoverNotification {
  originalTarget?: HTMLElement
  isHovered: boolean
}

const hoverNotificationEquivalence: Equivalence<HoverNotification> = (
  self,
  that,
) => self.isHovered === that.isHovered

const [hovered, notHovered]: Pair<HoverNotification> = [
  {isHovered: true},
  {isHovered: false},
]

export const hoverObservable = (
  element: HTMLElement,
): rx.Observable<HoverNotification> => {
  const until = pipe(
    element,
    fromPointerDown,
    mergeObservable(fromMouseLeave(element)),
    mergeObservable(fromBlur(element)),
    mergeObservable(fromEscapeDown()),
    rx.map(K(notHovered)),
  )

  const move = pipe(
    element,
    fromMouseMove,
    rx.debounceTime(beforeHoverDelayMs),
    rx.takeUntil(until),
    rx.map(K(hovered)),
  )

  return pipe(
    element,
    fromMouseEnter,
    rx.filter(noButtonsPressed),
    rx.switchMap(K(move)),
    mergeObservable(until),
    rx.distinctUntilChanged(hoverNotificationEquivalence),
  )
}
