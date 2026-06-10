import {noop} from '#Function'
import type {DisabledItem} from '#types'
import {useImmediateRepeatButton, useRepeatButton} from '#usePointerButton'
import {type StyledPropsWithChildren} from '#util'
import {assumeProp} from 'react-compinators'
import {Inner} from './Inner'
import {Outer} from './Outer'

interface Props extends Omit<DisabledItem, 'label'>, StyledPropsWithChildren {
  isRounded?: boolean
  onClick?: () => void
}

export const Repeater = ({
  id,
  state = {isDisabled: false},
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
    <div {...{style}} className="relative min-w-fit w-full focus-within:z-1">
      <Outer
        ref={parentRef}
        isActive={isRepeating || innerState === 'down'}
        {...state}
        {...{
          id,
          title,
          isRounded,
          onClick,
          className,
        }}>
        {children}
      </Outer>
      <div
        className={`absolute top-[calc((100%-15px)/2)] border-line-light
                    right-0 mr-1 border-[0.5px] rounded-full`}>
        <Inner
          id={`${id}-repeat`}
          ref={childRef}
          {...state}
          {...{isRepeating, onClick}}
        />
      </div>
    </div>
  )
}

Repeater.Square = assumeProp(Repeater, 'isRounded')(false)
Repeater.Round = assumeProp(Repeater, 'isRounded')(true)
