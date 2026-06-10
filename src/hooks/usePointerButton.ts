import {identity, noop, type EndoOf} from '#Function'
import {pipe} from '#util'
import {subscribe} from './observable/helpers'
import {
  type ButtonNotification,
  type ButtonState,
  type PointerButton,
} from '#pointer'
import {useCallback, useState, type RefCallback} from 'react'
import * as rx from 'rxjs'
import {buttonObservable} from './observable/button'

export interface PointerState {
  buttonState: ButtonState
  isRepeating: boolean
}

export const usePointerButton = (
  button: PointerButton,
  {
    project = identity,
    isRepeat = false,
    delayRepeat = true,
  }: {
    project?: EndoOf<rx.Observable<ButtonNotification>> | undefined
    isRepeat?: boolean | undefined
    delayRepeat?: boolean | undefined
  },
): [buttonState: PointerState, ref: RefCallback<HTMLElement>] => {
  const [buttonState, setButtonState] = useState<ButtonState>('up')
  const [isRepeating, setIsRepeating] = useState(false)

  const ref = useCallback(
    (element: HTMLElement | null): (() => void) => {
      if (element === null) {
        return noop
      }

      const observable: rx.Observable<ButtonNotification> = pipe(
        isRepeat
          ? buttonObservable.repeat(element, delayRepeat)
          : buttonObservable(button)(element),
        rx.tap(({isClick, isRepeating, state}) => {
          if (!isClick) {
            setButtonState(state)
          }
          setIsRepeating(isRepeating)
        }),
        project,
      )

      return subscribe(observable)
    },
    [button, delayRepeat, isRepeat, project],
  )

  return [{buttonState, isRepeating}, ref]
}

export const usePrimaryButton = (
  project?: EndoOf<rx.Observable<ButtonNotification>>,
): [PointerState, RefCallback<HTMLElement>] =>
  usePointerButton('primary', {project})

export const useRepeatButton = (
  onClick?: () => void,
  delayRepeat = true,
): [PointerState, RefCallback<HTMLElement>] =>
  usePointerButton('primary', {
    project: rx.tap(({isClick}: ButtonNotification) => {
      if (isClick) {
        onClick?.()
      }
    }),
    isRepeat: true,
    delayRepeat,
  })

export const useImmediateRepeatButton = (
  onClick?: () => void,
): [PointerState, RefCallback<HTMLElement>] => useRepeatButton(onClick, false)
