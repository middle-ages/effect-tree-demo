import type {StyledProps} from '#react'
import {selectShowTooltips, useAppSelector} from '#store'
import {Tooltip} from '#Tooltip'
import {useHover} from '#useHover'
import type {ReactNode, RefCallback} from 'react'
import {twMerge} from 'tailwind-merge'

interface Props extends StyledProps {
  id: string
  title: ReactNode
  tooltipLeft?: string
}

interface UseTooltip {
  ref: RefCallback<HTMLElement>
  isOpen: boolean
  tooltip: ReactNode
}

export const useTooltip = ({
  id,
  title,
  className,
  ...props
}: Props): UseTooltip => {
  const {ref, isHovered} = useHover()
  const isOpen = useAppSelector(selectShowTooltips) && isHovered

  const tooltip = (
    <Tooltip
      {...{...props, isOpen}}
      anchor={id}
      className={twMerge('text-default! font-normal!', className)}>
      {title}
    </Tooltip>
  )

  return {ref, isOpen, tooltip}
}
