import {subscribe} from './observable/helpers'
import {noop} from '#Function'
import {pipe, SizePx} from '#util'
import {useCallback, useState, type RefCallback} from 'react'
import * as rx from 'rxjs'
import {resizeObservable} from './observable/resize'

export interface UseMeasure {
  ref: RefCallback<HTMLElement>
  sizePx: SizePx
}

export const useMeasure = (addSizePx = SizePx.zero): UseMeasure => {
  const [sizePx, setSizePx] = useState(addSizePx)

  const ref = useCallback(
    (element: HTMLElement | null): (() => void) => {
      if (element === null) {
        return noop
      }
      const observable: rx.Observable<SizePx> = pipe(
        element,
        resizeObservable,
        rx.map(SizePx.add(addSizePx)),
        rx.tap(size => {
          setSizePx(old => (SizePx.equals(old, size) ? old : size))
        }),
      )

      return subscribe(observable)
    },
    [addSizePx],
  )

  return {sizePx, ref}
}
