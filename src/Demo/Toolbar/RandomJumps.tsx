import {Button} from '#Button'
import {pipe, type EndoOf} from '#Function'
import {Pill} from '#Pill'
import {type ButtonNotification} from '#pointer'
import {type StyledProps} from '#react/props'
import * as store from '#store'
import {randomCodeActions, useAppDispatch} from '#store'
import {usePrimaryButton} from '#usePointerButton'
import {useCallback} from 'react'
import * as rx from 'rxjs'
import {useDisabledState} from './useDisabledState'

interface Props extends StyledProps {}

const [
  {apply: _, ...randomCode},
  {apply: __, ...randomBoth},
  {apply: ___, ...randomNodes},
] = randomCodeActions

export const RandomJumps = (props: Props) => {
  const dispatch = useAppDispatch()
  const dispatcher = useDispatcher(dispatch)

  const [{buttonState}, ref] = usePrimaryButton(dispatcher)
  const disabledState = useDisabledState(randomCode.guard)
  const isActive = buttonState === 'down'

  return (
    <Pill {...props}>
      <Button.Focus
        {...{...disabledState, ...randomCode, isActive}}
        className='head-button min-w-24'
        onClick={() => {
          dispatch(store.randomCode())
        }}>
        <div className='pr-2'>{randomCode.label}</div>
      </Button.Focus>
      <Button.Emit
        {...randomBoth}
        {...{isActive, ref}}
        isFocusable
        className='middle-button cross-pill z-2 min-w-10 px-1.5 notched before:notched after:notched'>
        <div>{randomBoth.label}</div>
      </Button.Emit>
      <Button.Focus
        {...randomNodes}
        {...{isActive}}
        className='last-button z-1 min-w-24 focus-visible:z-10'
        onClick={() => {
          dispatch(store.randomNodes())
        }}>
        <div className='pl-2'>{randomNodes.label}</div>
      </Button.Focus>
    </Pill>
  )
}

const useDispatcher = (
  dispatch: store.AppDispatch,
): EndoOf<rx.Observable<ButtonNotification>> =>
  useCallback<EndoOf<rx.Observable<ButtonNotification>>>(
    source =>
      pipe(
        source,
        rx.tap(({isClick}: ButtonNotification) => {
          if (isClick) {
            dispatch(store.randomBoth())
          }
        }),
      ),
    [dispatch],
  )
