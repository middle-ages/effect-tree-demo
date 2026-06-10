import {noop, pipe} from '#Function'
import {SizePx} from '#react/size'
import {useCallback, useState, type RefCallback} from 'react'
import * as rx from 'rxjs'
import {subscribe} from './observable/helpers'
import {resizeObservable} from './observable/resize'

export interface UseMeasure {
  ref: RefCallback<HTMLElement>
  sizePx: SizePx
}

export const useMeasure = (onChange?: (sizePx: SizePx) => void): UseMeasure => {
  const [sizePx, setSizePx] = useState(SizePx.zero)

  const ref = useCallback(
    (element: HTMLElement | null): (() => void) => {
      if (element === null) {
        return noop
      }
      const observable: rx.Observable<SizePx> = pipe(
        element,
        resizeObservable,
        rx.tap(size => {
          setSizePx(old => (SizePx.equals(old, size) ? old : size))
          onChange?.(size)
        }),
      )

      return subscribe(observable)
    },
    [onChange],
  )

  return {sizePx, ref}
}
