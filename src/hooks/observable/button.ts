import {
  fromClick,
  fromPointerDown,
  fromPointerUp,
  isButtonDown,
  isEventOverElement,
  pointerButtonId,
  type ButtonEvent,
  type ButtonNotification,
  type PointerButton,
} from '#pointer'
import {identity, pipe} from '#util'
import * as rx from 'rxjs'

const repeatDelayMs = 600
const repeatTickMs = 16

export const buttonObservable =
  (button: PointerButton) =>
  (element: HTMLElement): rx.Observable<ButtonNotification> =>
    pipe(
      rx.merge(
        fromPointerDown(element),
        fromPointerUp(element),
        fromClick(element),
      ),
      rx.filter(
        event =>
          !(event.target as HTMLButtonElement).disabled &&
          isButtonDown(button)(event),
      ),
      rx.map(buildNotification(button)),
      rx.tap(({target, state, id}) => {
        if (state === 'down') {
          target.setPointerCapture(id)
        }
      }),
    )

const repeatButtonObservable = (
  element: HTMLElement,
  delayRepeat = true,
): rx.Observable<ButtonNotification> => {
  const down = pipe(
    element,
    buttonObservable('primary'),
    rx.filter(({state}) => state === 'down'),
  )

  const until = rx.merge(
    fromPointerUp(element),
    pipe(
      fromPointerDown(element),
      rx.filter(({button}) => button !== pointerButtonId.primary),
    ),
  )

  const weakElement = new WeakRef(element)

  return rx.merge(
    down,
    pipe(
      rx.interval(repeatTickMs),
      rx.skipUntil(
        pipe(down, delayRepeat ? rx.delay(repeatDelayMs) : identity),
      ),
      rx.takeUntil(until),
      rx.mergeMap(index => {
        const element = weakElement.deref()
        return element === undefined || (element as HTMLButtonElement).disabled
          ? rx.EMPTY
          : rx.from([pipe(index, clickNotification(element))])
      }),
      rx.endWith({
        index: -1,
        button: 'primary',
        state: 'up',
        id: 0,
        isClick: false,
        target: element,
        isOverElement: false,
        isRepeating: false,
      } satisfies ButtonNotification),
      rx.repeat(),
    ),
  )
}

buttonObservable.repeat = repeatButtonObservable

const buildNotification =
  (button: PointerButton) =>
  (event: ButtonEvent, index: number): ButtonNotification => {
    const isClickType = event.type === 'click'

    const state =
      event.type === 'click'
        ? 'up'
        : event.type === 'pointerdown'
          ? 'down'
          : 'up'

    const isOverElement = state === 'up' && isEventOverElement(event)

    return {
      index,
      button,
      state,
      id: 'pointerId' in event ? event.pointerId : 0,
      isClick: isOverElement && isClickType,
      target: event.target as HTMLElement,
      isOverElement,
      isRepeating: false,
    }
  }

const clickNotification =
  (target: HTMLElement) =>
  (index: number): ButtonNotification => {
    return {
      index,
      button: 'primary',
      state: 'down',
      id: 0,
      isClick: true,
      target,
      isOverElement: true,
      isRepeating: true,
    }
  }
