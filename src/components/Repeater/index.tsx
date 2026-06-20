import {noop} from '#Function'
import {ms} from '#Css'
import type {DisabledItemProps} from '#types'
import {useImmediateRepeatButton, useRepeatButton} from '#usePointerButton'
import {assumeProp} from 'react-compinators'
import {Inner} from './Inner'
import {Outer} from './Outer'
import type {CSSProperties} from 'react'
import {twMerge} from 'tailwind-merge'

interface Props extends DisabledItemProps {
  isRounded?: boolean
  onClick?: () => void
}

export const Repeater = ({
  id,
  isDisabled = false,
  disabledNote,
  isRounded = true,
  onClick = noop,
  className,
  style,
  title,
  children,
}: Props) => {
  const [{isRepeating}, parentRef] = useRepeatButton(onClick)
  const [{buttonState: innerState}, childRef] =
    useImmediateRepeatButton(onClick)

  return (
    <div
      {...{style}}
      className='relative h-5.5 w-full min-w-fit focus-within:z-1'>
      <Outer
        ref={parentRef}
        className={twMerge('h-5.5', className)}
        isActive={isRepeating || innerState === 'down'}
        {...{isDisabled, disabledNote}}
        {...{
          id,
          title,
          isRounded,
          onClick,
        }}>
        {children}
      </Outer>
      <Inner
        id={`${id}-repeat`}
        ref={childRef}
        {...{isRepeating, onClick, isDisabled, disabledNote}}
      />
    </div>
  )
}

Repeater.Square = assumeProp(Repeater, 'isRounded')(false)
Repeater.Round = assumeProp(Repeater, 'isRounded')(true)
