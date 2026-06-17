import {Button} from '#Button'
import {type EndoOf} from '#Function'
import {Pill} from '#Pill'
import {type ButtonNotification} from '#pointer'
import {usePrimaryButton} from '#usePointerButton'
import {pipe, type StyledProps} from '#util'
import {type CSSProperties} from 'react'
import * as rx from 'rxjs'
import {twMerge} from 'tailwind-merge'
import {
  randomCodeActions,
  selectCode,
  useAppDispatch,
  useAppSelector,
  type AppDispatch,
} from '#store'
import * as store from '#store'

interface Props extends StyledProps {}

const [randomCode, randomBoth, randomNodes] = randomCodeActions

export const RandomJumps = ({className, style}: Props) => {
  const code = useAppSelector(selectCode)
  const dispatch = useAppDispatch()

  const [{buttonState}, ref] = usePrimaryButton(tapSetCode(dispatch))
  const isActive = buttonState === 'down'

  return (
    <Pill className={twMerge('items-baseline', className)} {...{style}}>
      <Button.Focus
        {...randomCode}
        {...{isActive}}
        {...randomCode.buildState(code)}
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
        isDisabled={false}
        isFocusable
        className='cross-pill'
        style={{cornerShape: 'notch'} as CSSProperties}>
        {randomBoth.label}
      </Button.Emit>
      <Button.Focus
        {...randomNodes}
        {...{isActive}}
        isWrapped
        isDisabled={false}
        onClick={() => {
          dispatch(store.randomNodes())
        }}>
        {randomNodes.label}
      </Button.Focus>
    </Pill>
  )
}

const tapSetCode: (
  dispatch: AppDispatch,
) => EndoOf<rx.Observable<ButtonNotification>> = dispatch => source =>
  pipe(
    source,
    rx.tap(({isClick}: ButtonNotification) => {
      if (isClick) {
        dispatch(store.randomBoth())
      }
    }),
  )
