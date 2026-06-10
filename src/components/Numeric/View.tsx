import {bigCommaFormat} from '#Number'
import {useMeasure} from '#useMeasure'
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
  const {
    ref,
    sizePx: {widthPx: availablePx},
  } = useMeasure()
  const value = BigInt(stringValue)
  const measuredPx = measureCommaFormattedWidth(options)(value)
  const isOverflow = measuredPx >= availablePx
  const commaFormatted = bigCommaFormat(value)

  const formatted = isOverflow
    ? formatExponential(options)(availablePx, value)
    : commaFormatted

  return (
    <div {...{ref}}>
      <div
        {...props}
        title={propsTitle + commaFormatted}
        style={{
          width: Math.min(availablePx, measuredPx),
          paddingLeft: px(padding),
          paddingRight: px(padding),
        }}
        className={twMerge(
          'numeric-view h-row-smaller leading-row-smaller px-1',
          isOverflow && 'text-center',
        )}>
        {formatted}
      </div>
    </div>
  )
}
