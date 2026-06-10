import {Button} from '#Button'
import type {RefCallback} from 'react'

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
    className={`size-3.5 p-[0.5px] border rounded-shape rounded-full
                *:bg-fg-control-disabled
                hover:not(:disabled):*:bg-fg-control
                active:not(:disabled)::*:bg-ink
                duration-300 *:duration-300 outline-none`}
    title="Click or hold outside to repeat.">
    <div className="arrow-circle size-full" />
  </Button>
)
