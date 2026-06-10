import {pipe} from '#Function'
import {type FocusEvent, type KeyboardEvent} from 'react'
import * as rx from 'rxjs'

export const fromKeyDown = (): rx.Observable<KeyboardEvent> =>
  rx.fromEvent<KeyboardEvent>(window, 'keydown')

export const fromKeyUp = (
  element: HTMLElement,
): rx.Observable<KeyboardEvent<HTMLElement>> =>
  rx.fromEvent<KeyboardEvent<HTMLElement>>(element, 'onkeyup')

export const fromFocus = (
  element: HTMLElement,
): rx.Observable<FocusEvent<HTMLElement>> =>
  rx.fromEvent<FocusEvent<HTMLElement>>(element, 'focus')

export const fromBlur = (
  element: HTMLElement,
): rx.Observable<FocusEvent<HTMLElement>> =>
  rx.fromEvent<FocusEvent<HTMLElement>>(element, 'blur')

export const fromEscapeDown = (): rx.Observable<KeyboardEvent> =>
  pipe(
    fromKeyDown(),
    rx.filter(({key}) => key === 'Escape'),
  )
