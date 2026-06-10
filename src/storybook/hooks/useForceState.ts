import type {EndoOf} from '#Function'
import {useCallback, useState} from 'react'
import type {Dispatcher} from '#util'

export const useForceState = <T>(
  value: T,
  onChange: (value: T) => void,
): {value: T; onChange: Dispatcher<T>} | undefined => {
  const [previous, setPrevious] = useState<T>(value)
  const [current, setCurrent] = useState(value)
  const hasChanged = value !== previous
  const latestValue = hasChanged ? value : current

  const handler: Dispatcher<T> = useCallback(
    value => {
      if (typeof value === 'function') {
        const f = value as EndoOf<T>
        setCurrent(old => {
          const current = f(old)
          onChange(current)
          return current
        })
      } else {
        setCurrent(value)
        onChange(value)
      }
    },
    [onChange],
  )

  if (hasChanged) {
    setPrevious(latestValue)
    setCurrent(latestValue)
    return undefined
  } else {
    return {value: current, onChange: handler}
  }
}
