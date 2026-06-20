import {Button} from '#Button'
import {pipe, type EndoOf} from '#Function'
import {Pill} from '#Pill'
import {type ButtonNotification} from '#pointer'
import {type StyledProps} from '#react/props'
import * as store from '#store'
import {randomCodeActions, useAppDispatch, useAppSelector} from '#store'
import {usePrimaryButton} from '#usePointerButton'
import {useCallback, type CSSProperties} from 'react'
import * as rx from 'rxjs'
import {twMerge} from 'tailwind-merge'

interface Props extends StyledProps {}

const [randomCode, randomBoth, randomNodes] = randomCodeActions

export const RandomJumps = ({className, style}: Props) => {
  const dispatch = useAppDispatch()
  const dispatcher = useCallback<EndoOf<rx.Observable<ButtonNotification>>>(
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

  const [{buttonState}, ref] = usePrimaryButton(dispatcher)
  const [selector, disabledNote] = store.guardSelector(randomCode.guard)
  const guardResult = useAppSelector(selector)
  const disabledState = store.disabledProps(guardResult, disabledNote)
  const isActive = buttonState === 'down'

  return (
    <Pill
      className={twMerge('items-baseline rounded-full', className)}
      {...{style}}>
      <Button.Focus
        {...{...disabledState, ...randomCode, isActive}}
        isWrapped
        onClick={() => {
          dispatch(store.randomCode())
        }}>
        {randomCode.label}
      </Button.Focus>
      <Button.Emit
        {...randomBoth}
        {...{isActive, ref}}
        isWrapped
        isFocusable
        className='cross-pill'
        style={{cornerShape: 'notch'} as CSSProperties}>
        {randomBoth.label}
      </Button.Emit>
      <Button.Focus
        {...randomNodes}
        {...{isActive}}
        isWrapped
        onClick={() => {
          dispatch(store.randomNodes())
        }}>
        {randomNodes.label}
      </Button.Focus>
    </Pill>
  )
}
