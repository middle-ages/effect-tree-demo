import { noop } from '#Function'
import type { DisabledItemProps } from '#types'
import { useImmediateRepeatButton, useRepeatButton } from '#usePointerButton'
import { assumeProp } from 'react-compinators'
import { Inner } from './Inner'
import { Outer } from './Outer'

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
    <div {...{style}} className='relative w-full min-w-fit focus-within:z-1'>
      <Outer
        ref={parentRef}
        isActive={isRepeating || innerState === 'down'}
        {...{isDisabled, disabledNote}}
        {...{
          id,
          title,
          isRounded,
          onClick,
          className,
        }}>
        {children}
      </Outer>
      <div className='absolute top-1 right-0.5 rounded-full'>
        <Inner
          id={`${id}-repeat`}
          ref={childRef}
          {...{isRepeating, onClick, isDisabled, disabledNote}}
        />
      </div>
    </div>
  )
}

Repeater.Square = assumeProp(Repeater, 'isRounded')(false)
Repeater.Round = assumeProp(Repeater, 'isRounded')(true)
