import {Repeater} from '#Repeater'
import * as store from '#store'
import {useAppDispatch, useAppSelector} from '#store'
import type {PointerState} from '#usePointerButton'
import {useCallback} from 'react'
import {useDisabledState} from './useDisabledState'

export const RepeatJumpButton = <Name extends store.RepeatActionName>({
  id,
  label,
  guard,
  canRepeat: _,
  apply: __,
  ...props
}: store.Action<Name>) => {
  const dispatch = useAppDispatch()
  const previousRepeatAction = useAppSelector(store.selectRepeatAction)

  const dispatchAction = useCallback(
    ({isRepeating}: PointerState) => {
      if (id !== previousRepeatAction) {
        dispatch(store[id]({isRepeating}))
      } else if (!isRepeating) {
        dispatch(store.unsetRepeatAction())
      }
    },
    [id, dispatch, previousRepeatAction],
  )

  return (
    <Repeater
      {...{...props, id}}
      {...useDisabledState(guard)}
      className='middle-button'
      onClick={dispatchAction}>
      {label}
    </Repeater>
  )
}
