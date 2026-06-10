import type {Dispatcher} from '#util'
import {Boolean} from 'effect'
import {useCallback, useState} from 'react'

export interface UseBoolean {
  flag: boolean
  setFlag: Dispatcher<boolean>
  setOn: () => void
  setOff: () => void
  flip: () => void
}

export const useBoolean = (init = false): UseBoolean => {
  const [flag, setFlag] = useState(init)
  return {
    flag,
    setFlag,

    setOn: useCallback((): void => {
      setFlag(true)
    }, []),

    setOff: useCallback((): void => {
      setFlag(false)
    }, []),

    flip: useCallback((): void => {
      setFlag(Boolean.not)
    }, []),
  }
}
