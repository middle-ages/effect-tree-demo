import {flow, noop, pipe} from '#Function'
import {pluck} from '#Record'
import type {Dispatcher} from '#react/props'
import {useBoolean} from '#useBoolean'
import {useCallback, type RefCallback} from 'react'
import * as rx from 'rxjs'
import {subscribe} from './observable/helpers'
import {hoverObservable} from './observable/hover'

interface UseHover {
  ref: RefCallback<HTMLElement>
  isHovered: boolean
  setIsHovered: Dispatcher<boolean>
}

export const useHover = (): UseHover => {
  const {flag: isHovered, setFlag: setIsHovered} = useBoolean(false)

  const ref = useCallback(
    (element: HTMLElement | null): (() => void) =>
      element === null
        ? noop
        : pipe(
            element,
            hoverObservable,
            rx.tap(flow(pluck('isHovered'), setIsHovered)),
            subscribe,
          ),
    [setIsHovered],
  )

  return {isHovered, setIsHovered, ref}
}
