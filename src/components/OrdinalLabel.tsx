import {type StyledProps} from '#util'
import type {ReactNode} from 'react'
import {twMerge} from 'tailwind-merge'

interface Props extends StyledProps {
  ordinal: number
  label: ReactNode
  topOrdinal?: number | undefined
}

export const OrdinalLabel = ({
  topOrdinal,
  ordinal,
  label,
  className,
  style,
}: Props) => (
  <div
    className={twMerge(
      'flex text-[12px] max-h-4 gap-1',
      '*:last:truncate *:last:set-fg-control *:first:ordinal',
      className,
    )}
    {...{style}}>
    <div>
      {topOrdinal !== undefined && <span>{(topOrdinal + 1).toString()}.</span>}
      <span>{(ordinal + 1).toString()}.</span>
    </div>
    <div>{label}</div>
  </div>
)
