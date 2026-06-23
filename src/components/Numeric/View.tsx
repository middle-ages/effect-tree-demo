import {bigCommaFormat} from '#Number'
import {selectLeftWidthPx, useAppSelector} from '#store'
import {px, type Identified} from '#util'
import {twMerge} from 'tailwind-merge'
import {
  formatExponential,
  measureCommaFormattedWidth,
  type MeasureOptions,
} from './measure'

export interface NumericViewProps extends Identified {
  title: string
  value: string
}

const padding = 1 * 4

const [edgeWidthPx, minWidthPx] = [66 + 2 * 7.5, 265]

const options: Partial<MeasureOptions> = {
  isFlat: true,
  padPx: 2 * padding,
  showSpinner: false,
}

export const NumericView = ({
  title: propsTitle,
  value: stringValue,
  ...props
}: NumericViewProps) => {
  const storedWidthPx = useAppSelector(selectLeftWidthPx) - edgeWidthPx
  const availableWidthPx = Math.max(storedWidthPx, minWidthPx)
  const value = BigInt(stringValue)
  const measuredPx = measureCommaFormattedWidth(options)(value)
  const isOverflow = measuredPx >= availableWidthPx
  const commaFormatted = bigCommaFormat(value)

  const formatted = isOverflow
    ? formatExponential(options)(availableWidthPx, value)
    : commaFormatted

  return (
    <div>
      <div
        {...props}
        title={propsTitle + commaFormatted}
        style={{
          width: px(Math.min(availableWidthPx, measuredPx)),
          paddingLeft: px(padding),
          paddingRight: px(padding),
        }}
        className={twMerge(
          'numeric-view h-row-smaller px-1 leading-row-smaller',
          isOverflow && 'text-center',
        )}>
        {formatted}
      </div>
    </div>
  )
}
