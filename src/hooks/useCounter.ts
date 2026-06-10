import type {Dispatcher} from '#util'
import {Number} from 'effect'
import {useCallback, useState} from 'react'

export interface UseCounter {
  count: number
  setCount: Dispatcher<number>
  increment: () => void
}

export const useCounter = (init = 0): UseCounter => {
  const [count, setCount] = useState(init)
  return {
    count,
    setCount,

    increment: useCallback((): void => {
      setCount(Number.increment)
    }, []),
  }
}
