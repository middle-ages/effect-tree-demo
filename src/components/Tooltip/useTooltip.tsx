import type {StyledProps} from '#react'
import {selectShowTooltips, useAppSelector} from '#store'
import {Tooltip} from '#Tooltip'
import {useHover} from '#useHover'
import type {ReactNode, RefCallback} from 'react'
import {twMerge} from 'tailwind-merge'
import type {TooltipDirection} from './Tooltip'

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
  direction,
  className,
  ...props
}: Props & {direction: TooltipDirection}): UseTooltip => {
  const {ref, isHovered} = useHover()
  const isOpen = useAppSelector(selectShowTooltips) && isHovered

  const tooltip = (
    <Tooltip
      {...{...props, isOpen, direction}}
      anchor={id}
      className={twMerge('text-default! font-normal!', className)}>
      {title}
    </Tooltip>
  )

  return {ref, isOpen, tooltip}
}

export const useTooltipTop = (props: Props): UseTooltip =>
  useTooltip({...props, direction: 'top'})

export const useTooltipBottom = (props: Props): UseTooltip =>
  useTooltip({...props, direction: 'bottom'})
