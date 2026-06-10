import {anchorName} from '#Css'
import {
  formatExponential,
  isCommaFormattedOverflow,
  type MeasureOptions,
} from '#measure'
import {bigCommaFormat} from '#Number'
import {selectLeftWidthPx, useAppSelector} from '#store'
import {useTooltip} from '#Tooltip'
import type {ReactNode} from 'react'
import {twMerge} from 'tailwind-merge'

export interface NumericViewProps {
  id: string
  title?: ReactNode
  value: string
}

const prefixTextWidth = 16.5 * 4
const [edgeWidthPx, minWidthPx] = [prefixTextWidth + 2 * 9.5 + 3.5, 264]

const options: Partial<MeasureOptions> = {
  isFlat: true,
  padPx: 0,
  showSpinner: false,
}

export const NumericView = ({
  id,
  title,
  value: stringValue,
  ...props
}: NumericViewProps) => {
  const storedWidthPx = useAppSelector(selectLeftWidthPx)
  const availableWidthPx = Math.max(storedWidthPx - edgeWidthPx, minWidthPx)
  const value = BigInt(stringValue)
  const isOverflow = isCommaFormattedOverflow(options)(value, availableWidthPx)
  const commaFormatted = bigCommaFormat(value)

  const formatted = isOverflow
    ? formatExponential(options)(availableWidthPx, value)
    : commaFormatted

  const {ref, tooltip, isOpen: isHover} = useTooltip({id, title})
  const isOpen = title !== undefined && isHover

  return (
    <div className='contents'>
      <div
        {...{...props, id, ref}}
        className={twMerge(
          'numeric-view inset-shadow-[0px_6px_16px] inset-shadow-transparent',
          isOverflow && 'text-left',
          isOpen && 'text-ink inset-shadow-yellow-50',
        )}
        style={anchorName(id)}>
        {formatted}
      </div>
      {tooltip}
    </div>
  )
}
