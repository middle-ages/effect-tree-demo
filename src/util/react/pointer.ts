import {type Predicate} from 'effect/Predicate'
import {type MouseEvent, type PointerEvent} from 'react'
import * as rx from 'rxjs'

export type ButtonEvent = PointerEvent<HTMLElement> | MouseEvent<HTMLElement>

export const pointerButtonState = ['down', 'up'] as const
export const pointerButtons = ['primary', 'secondary', 'auxiliary'] as const
export const pointerButtonId: Record<PointerButton, number> = {
  primary: 0,
  secondary: 1,
  auxiliary: 2,
}

/**
 * Button `up` or `down` state.
 */
export type ButtonState = (typeof pointerButtonState)[number]

/**
 * Identifier of mouse button: 'primary', 'secondary', or 'auxiliary'.
 */
export type PointerButton = (typeof pointerButtons)[number]

export interface ButtonNotification {
  isClick: boolean

  index: number

  /** Element that fired the event. */
  target: HTMLElement

  /** Pointer ID for mouse capturing. */
  id: number

  /**
   * The notification is for a specific pointer button: main, secondary , or
   * auxiliary.
   */
  button: PointerButton

  /** The up/down state of the button. */
  state: ButtonState

  /** True if event happened when mouse was over or its descendants. */
  isOverElement: boolean

  /** True if button is currently in repeat-fire mode. */
  isRepeating: boolean
}

/**
 * True if the given pointer event comes from inside the
 * element where the listener was attached.
 */
export const isEventOverElement: Predicate<{
  target: EventTarget | null
  clientX: number
  clientY: number
}> = ({target, clientX, clientY}) => {
  if (target === null) {
    return false
  } else if (clientX === 0 && clientY === 0) {
    return true
  }

  const hit = document.elementFromPoint(clientX, clientY) as HTMLElement
  const element = target as HTMLElement
  return hit === element || element.contains(hit)
}

/**
 * True if the given event has no buttons pressed.
 */
export const noButtonsPressed: Predicate<MouseEvent> = event =>
  event.buttons === 0

/**
 * True if the given event has the specified pointer button in down state.
 */
export const isButtonDown =
  (button: PointerButton) =>
  <E extends MouseEvent>(event: E): boolean =>
    event.button === pointerButtonId[button]

export const fromPointerDown = (
  element: HTMLElement,
): rx.Observable<PointerEvent<HTMLElement>> =>
  rx.fromEvent<PointerEvent<HTMLElement>>(element, 'pointerdown')

export const fromPointerUp = (
  element: HTMLElement,
): rx.Observable<PointerEvent<HTMLElement>> =>
  rx.fromEvent<PointerEvent<HTMLElement>>(element, 'pointerup')

export const fromMouseUp = (
  element: HTMLElement,
): rx.Observable<MouseEvent<HTMLElement>> =>
  rx.fromEvent<MouseEvent<HTMLElement>>(element, 'mouseup')

export const fromClick = (
  element: HTMLElement,
): rx.Observable<MouseEvent<HTMLElement>> =>
  rx.fromEvent<MouseEvent<HTMLElement>>(element, 'click')

export const fromDoubleClick = (
  element: HTMLElement,
): rx.Observable<MouseEvent<HTMLElement>> =>
  rx.fromEvent<MouseEvent<HTMLElement>>(element, 'dblclick')

export const fromMouseEnter = (
  element: HTMLElement,
): rx.Observable<MouseEvent<HTMLElement>> =>
  rx.fromEvent<MouseEvent<HTMLElement>>(element, 'mouseenter')

export const fromMouseLeave = (
  element: HTMLElement,
): rx.Observable<MouseEvent<HTMLElement>> =>
  rx.fromEvent<MouseEvent<HTMLElement>>(element, 'mouseleave')

export const fromMouseMove = (
  element: HTMLElement,
): rx.Observable<MouseEvent<HTMLElement>> =>
  rx.fromEvent<MouseEvent<HTMLElement>>(element, 'mousemove')
