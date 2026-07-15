import {setVar, anchorPosition} from '#Css'
import type {StyledPropsWithChildren} from '#react/props'
import {twMerge} from 'tailwind-merge'
import {useSyncElement} from './useSyncElement'
import {assumeProp} from 'react-compinators'

export type TooltipDirection = 'top' | 'bottom'

interface Props extends StyledPropsWithChildren {
  direction: TooltipDirection
  isOpen: boolean
  anchor: string
  tooltipLeft?: string
}

export const Tooltip = ({
  direction,
  isOpen,
  anchor,
  tooltipLeft = '50%',
  children,
  className,
  style,
}: Props) => (
  <div
    id={`${anchor}-popover`}
    ref={useSyncElement(isOpen)}
    className={twMerge(
      direction === 'top' ? 'tooltip-popover-top' : 'tooltip-popover-bottom',
      className,
    )}
    style={setVar('tooltip-left', tooltipLeft)}
    popover='hint'>
    <div
      className={twMerge(
        'tooltip',
        direction === 'top' ? 'tooltip-top' : 'tooltip-bottom',
      )}
      style={{...anchorPosition(anchor), ...style}}>
      {children}
    </div>
  </div>
)

Tooltip.Top = assumeProp(Tooltip, 'direction')('top')
Tooltip.Bottom = assumeProp(Tooltip, 'direction')('bottom')
