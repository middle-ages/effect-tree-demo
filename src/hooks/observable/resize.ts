import {pipe, SizePx} from '#util'
import * as rx from 'rxjs'

export const resizeObservable = (
  element: HTMLElement,
): rx.Observable<SizePx> => {
  const resize = pipe(
    element,
    connect,
    rx.map(
      ({contentRect: {width, height}}: ResizeObserverEntry): SizePx => ({
        widthPx: Math.round(width),
        heightPx: Math.round(height),
      }),
    ),
  )

  return pipe(
    resize,
    rx.throttleTime(20, undefined, {leading: true, trailing: true}),
    rx.distinctUntilChanged(SizePx.equals),
  )
}

const connect = (element: HTMLElement): rx.Observable<ResizeObserverEntry> => {
  const weakElement = new WeakRef(element)

  return rx.fromEventPattern(
    handler => {
      const element = weakElement.deref()
      if (element === undefined) {
        return
      }

      const resizeObserver = new ResizeObserver(args => {
        const [entry] = args as [ResizeObserverEntry]
        ;(handler as (entry: ResizeObserverEntry) => void)(entry)
      })

      resizeObserver.observe(element)

      return resizeObserver
    },
    (_, resizeObserver) => {
      ;(resizeObserver as ResizeObserver).disconnect()
    },
  )
}
