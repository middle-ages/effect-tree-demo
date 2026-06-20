import {Button} from '#Button'
import type {StyledProps} from '#react/props'
import type {RefCallback} from 'react'
import {twMerge} from 'tailwind-merge'

interface Props extends StyledProps {
  id: string
  ref: RefCallback<HTMLElement>
  isRepeating: boolean
  isDisabled?: boolean
  onClick: () => void
}

export const Inner = ({
  id,
  ref,
  isRepeating: isActive,
  onClick,
  isDisabled = false,
  className,
  ...props
}: Props) => (
  <Button
    {...{...props, id, ref, isActive, isDisabled, onClick}}
    isFocusable={false}
    className={twMerge(
      'absolute top-0.5 right-0.5 rounded-full rounded-shape',
      className,
    )}
    title='Click or hold outside to repeat.'>
    <div className='size-4 overflow-hidden rounded-full pl-[1.5px] text-sm leading-4 rounded-shape'>
      ⟳
    </div>
  </Button>
)
