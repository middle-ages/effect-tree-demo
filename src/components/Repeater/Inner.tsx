import {Button} from '#Button'
import type {RefCallback} from 'react'
import {twMerge} from 'tailwind-merge'

interface Props {
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
}: Props) => (
  <Button
    {...{id, ref, isActive, isDisabled, onClick}}
    isFocusable={false}
    className={twMerge(
      'size-4 pl-px text-smallest leading-3',
      'rounded-full rounded-shape',
      'opacity-90 outline-none',
    )}
    title='Click or hold outside to repeat.'>
    ⟳
  </Button>
)
