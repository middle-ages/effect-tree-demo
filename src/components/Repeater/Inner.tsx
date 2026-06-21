import {Button} from '#Button'
import type {StyledProps} from '#react/props'
import type {RefCallback} from 'react'

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
  ...props
}: Props) => (
  <Button
    {...{...props, id, ref, isActive, isDisabled, onClick}}
    isFocusable={false}
    baseClassName='button-inner'
    title='Click or hold outside to repeat.'>
    <div>⟳</div>
  </Button>
)
