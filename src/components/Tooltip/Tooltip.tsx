//import {selectShowTooltips, useAppSelector} from '#store'

import {setVar, anchorPosition} from '#Css'
import type {StyledPropsWithChildren} from '#react/props'
import {twMerge} from 'tailwind-merge'
import {useSyncElement} from './useSyncElement'

interface Props extends StyledPropsWithChildren {
  isOpen: boolean
  anchor: string
  tooltipLeft?: string
}

export const Tooltip = ({
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
    className={twMerge('tooltip-popover', className)}
    style={setVar('tooltip-left', tooltipLeft)}
    popover='hint'>
    <div className='tooltip' style={{...anchorPosition(anchor), ...style}}>
      {children}
    </div>
  </div>
)
