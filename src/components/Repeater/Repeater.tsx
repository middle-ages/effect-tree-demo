import {anchorName} from '#Css'
import {noop} from '#Function'
import type {DisabledItemProps} from '#types'
import {
  useImmediateRepeatButton,
  useRepeatButton,
  type PointerState,
} from '#usePointerButton'
import {useCallback, type RefCallback} from 'react'
import {twMerge} from 'tailwind-merge'
import {Inner} from './Inner'
import {Outer} from './Outer'

export interface RepeaterProps extends DisabledItemProps {
  onClick?: (state: PointerState) => void
  isActive?: boolean
  isFocusable?: boolean
  ref?: RefCallback<HTMLElement>
}

export const Repeater = ({
  id,
  ref,
  isDisabled = false,
  disabledNote,
  isActive = false,
  isFocusable = true,
  onClick = noop,
  className,
  style,
  children,
  ...props
}: RepeaterProps) => {
  const [outerState, parentRef] = useRepeatButton(onClick)
  const [innerState, childRef] = useImmediateRepeatButton(onClick)

  const {isRepeating} = outerState
  const {buttonState: innerButtonState} = innerState

  const outerClick = useCallback(() => {
    onClick(outerState)
  }, [onClick, outerState])

  const innerClick = useCallback(() => {
    onClick(innerState)
  }, [innerState, onClick])

  return (
    <div
      {...{ref}}
      style={{...anchorName(id), ...style}}
      className={twMerge(
        'relative h-5 contain-size focus-within:z-1',
        className,
      )}>
      <Outer
        ref={parentRef}
        onClick={outerClick}
        isActive={isActive || isRepeating || innerButtonState === 'down'}
        {...{
          ...props,
          id,
          isDisabled,
          isFocusable,
          disabledNote,
        }}>
        {children}
      </Outer>
      <Inner
        ref={childRef}
        onClick={innerClick}
        {...{id, isRepeating, isDisabled, disabledNote}}
      />
    </div>
  )
}
