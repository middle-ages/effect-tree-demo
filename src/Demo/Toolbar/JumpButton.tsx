import {Button} from '#Button'
import {pipe} from '#Function'
import * as store from '#store'
import {useCallback} from 'react'
import {twMerge} from 'tailwind-merge'
import {useDisabledState} from './useDisabledState'

interface Props extends store.Action<store.AnyDecIncKey> {
  className?: string
}

export const JumpButton = ({className, apply: _, ...action}: Props) => {
  const dispatch = store.useAppDispatch()
  const {label, guard, id, title} = action

  return (
    <Button.Focus
      {...{id, title}}
      onClick={useCallback(() => {
        pipe({isRepeating: false}, store[id], dispatch)
      }, [dispatch, id])}
      {...useDisabledState(guard)}
      className={twMerge('min-w-9', className)}>
      {label}
    </Button.Focus>
  )
}
