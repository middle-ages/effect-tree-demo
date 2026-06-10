import {pipe} from '#Function'
import {SizePx} from '#react/size'
import * as rx from 'rxjs'

export const resizeObservable = (
  element: HTMLElement,
): rx.Observable<SizePx> => {
  const resize = pipe(
    element,
    connect,
    rx.map(
      ({
        contentRect: {width: widthPx, height: heightPx},
      }: ResizeObserverEntry): SizePx => ({
        widthPx,
        heightPx,
      }),
    ),
  )

  return pipe(
    resize,
    rx.throttleTime(40, undefined, {leading: true, trailing: true}),
    rx.distinctUntilChanged(SizePx.equals),
  )
}

const connect = (element: HTMLElement): rx.Observable<ResizeObserverEntry> => {
  const weakElement = new WeakRef(element)

  return rx.fromEventPattern(
    handler => {
      const element = weakElement.deref()
      if (element === undefined) return

      const resizeObserver = new ResizeObserver(([entry]) => {
        if (entry !== undefined) {
          handler(entry)
        }
      })

      resizeObserver.observe(element)
      return resizeObserver
    },
    (_, resizeObserver: ResizeObserver) => {
      resizeObserver.disconnect()
    },
  )
}
