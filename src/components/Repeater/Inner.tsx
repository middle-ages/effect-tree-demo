import {Repeat as RepeatIcon} from '#icons/Repeat'
import {noop} from '#Function'
import {Button} from '#Button'
import type {StyledProps} from '#react/props'
import type {RefCallback} from 'react'
import {twMerge} from 'tailwind-merge'

export interface InnerProps extends StyledProps {
  id: string
  ref?: RefCallback<HTMLElement>
  isRepeating: boolean
  isDisabled?: boolean
  onClick: () => void
}

const _Inner = ({id, isRepeating: isActive, ...props}: InnerProps) => (
  <Button
    {...{...props, isActive}}
    id={`${id}-inner`}
    isFocusable={false}
    isAnchor={false}
    baseClassName='button-inner'>
    {RepeatIcon}
  </Button>
)

export const Inner = Object.assign(_Inner, {
  Thumbnail: ({className, style}: StyledProps) => (
    <span
      className={twMerge(
        'relative -mr-0.5 inline-block h-3.75 w-5',
        className,
      )}>
      <_Inner id='none' isRepeating={false} {...{style}} onClick={noop} />
    </span>
  ),
})
