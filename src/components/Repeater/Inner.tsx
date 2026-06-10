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
      'size-3.5 border-[1.5px] p-[0.6px]',
      'rounded-full rounded-shape',
      'enabled:hover:*:bg-[#444]',
      'disabled:*:bg-[#888]',
      'enabled:*:bg-[#666]',
      'duration-200 outline-none *:duration-200',
    )}
    title='Click or hold outside to repeat.'>
    <div className={'size-full scale-110 arrow-circle'} />
  </Button>
)
