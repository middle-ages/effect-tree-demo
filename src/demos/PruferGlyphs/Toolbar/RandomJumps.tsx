import {Button} from '#Button'
import {type EndoOf} from '#Function'
import {Pill} from '#Pill'
import {type ButtonNotification} from '#pointer'
import {usePrimaryButton} from '#usePointerButton'
import {pipe, type Dispatcher, type StyledProps} from '#util'
import {useCallback, useMemo, type CSSProperties} from 'react'
import * as rx from 'rxjs'
import {twMerge} from 'tailwind-merge'
import {randomCodeActions, type CodeStateEffect} from '../hooks/actions'

interface Props extends StyledProps, CodeStateEffect {}

const [randomCode, randomBoth, randomNodes] = randomCodeActions

export const RandomJumps = ({code, setCode, className, style}: Props) => {
  const project = useMemo(() => tapSetCode(setCode), [setCode])
  const [{buttonState}, ref] = usePrimaryButton(project)
  const isActive = buttonState === 'down'

  return (
    <Pill className={twMerge('items-baseline', className)} {...{style}}>
      <Button.Focus
        {...randomCode}
        {...{isActive}}
        {...randomCode.buildState(code)}
        onClick={useCallback(() => {
          setCode(randomCode.apply)
        }, [setCode])}>
        {randomCode.label}
      </Button.Focus>
      <Button.Emit
        {...randomBoth}
        {...{isActive, ref}}
        isDisabled={false}
        isFocusable
        className="cross-pill"
        style={{cornerShape: 'notch'} as CSSProperties}>
        {randomBoth.label}
      </Button.Emit>
      <Button.Focus
        {...randomNodes}
        {...{isActive}}
        isDisabled={false}
        onClick={useCallback(() => {
          setCode(randomNodes.apply)
        }, [setCode])}>
        {randomNodes.label}
      </Button.Focus>
    </Pill>
  )
}

const tapSetCode =
  (setCode: Dispatcher<number[]>): EndoOf<rx.Observable<ButtonNotification>> =>
  source =>
    pipe(
      source,
      rx.tap(({isClick}: ButtonNotification) => {
        if (isClick) {
          setCode(randomBoth.apply)
        }
      }),
    )
