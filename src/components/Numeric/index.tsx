import {map, range} from '#Array'
import {tupled} from '#Function'
import {bigIntToExponential, sumAll} from '#Number'
import {monoRecord} from '#Record'
import {fromNumber} from '#String'
import {pipe, px, type Identified, type StyledProps} from '#util'
import {assumeProp, mapProps} from 'react-compinators'
import {twMerge} from 'tailwind-merge'

interface Props extends StyledProps, Identified {
  value: bigint | number | string
  maxWidthPx?: number | undefined
  width?: string
  fontSizePx?: number
  isFlat?: boolean
}

const digitWidthPx = 8
const baseFontSizePx = 16

// 16px CMU Serif
const glyphWidthPx = {
  ...pipe(range(0, 9), map(fromNumber), tupled(monoRecord(digitWidthPx))),
  e: 7.104,
  '+': 12.448,
  ',': 4.438,
  '.': 4.448,
}

const horizontalSpacingPx = 4 * 2 + 2 * 2

/**
 * A component that displays a numeric value or a string message. The message
 * type can be:
 *
 * 1. `number`
 * 2. `bigint`
 *
 * We normalize with no loss of precision into `bigint` and format so:
 *
 * 1. If the value `< 10³⁶` we display the number/bigint as a nice locale string.
 * 2. If the value `≥ 10³⁶` we display the number/bigint in exponential notation,
 *    but add a tooltip with the full expansion of the value.
 *
 * The element width will be set to the width of the displayed value if none is
 * given.
 *
 * If the computed/given width exceeds the given maximum width the element will
 * expand no more and the class `truncate` will be added to it. The tooltip
 * will still show the full expanded value.
 *
 * No truncate/limit will be applied if the width is given explicitly.
 */
export const Numeric = ({
  id,
  value,
  maxWidthPx,
  width: givenWidth,
  fontSizePx = 16,
  className,
  style,
  isFlat = false,
}: Props) => {
  const [isBig, formatted] = normalize(value)
  const [isOverflow, width] =
    givenWidth === undefined && maxWidthPx !== undefined
      ? overflowWidth(maxWidthPx, formatted, fontSizePx)
      : [false, `calc(${givenWidth ?? '0'} + ${px(horizontalSpacingPx)})`]
  const title = isBig || isOverflow ? value.toLocaleString() : ''

  return (
    <>
      <span
        tabIndex={isFlat ? -1 : 0}
        className={twMerge(
          isFlat ? 'numeric-flat' : 'numeric-beveled',
          isOverflow && 'truncate',
          className,
        )}
        {...{id, title}}
        style={{
          width,
          ...(givenWidth !== undefined && {
            textAlign: 'right',
            paddingRight: 4.5,
          }),
          ...style,
        }}>
        {formatted}
      </span>{' '}
    </>
  )
}

const overflowWidth = (
  maxWidthPx: number,
  formatted: string,
  fontSizePx: number,
): [boolean, string] => {
  const sizeFactor = fontSizePx / baseFontSizePx
  const measuredPx = measure(formatted) * sizeFactor
  const availablePx = maxWidthPx - horizontalSpacingPx
  const widthPx = Math.min(measuredPx, availablePx) + horizontalSpacingPx

  // We do not want to add “truncate” before overflow
  // because you see to many ‘...’ on the transition
  // of adding a digit.
  const isOverflow = measuredPx >= availablePx

  return [isOverflow, px(widthPx)]
}

const measure = (s: string): number => {
  const occurrences = new Map<string, number>()
  for (const c of s) {
    occurrences.set(c, (occurrences.get(c) ?? 0) + 1)
  }
  return sumAll(
    [...occurrences.entries()].map(([c, count]) => {
      const measured = glyphWidthPx[c as keyof typeof glyphWidthPx] as
        | number
        | undefined

      return count * (measured ?? 10)
    }),
  )
}

const normalize = (
  value: bigint | number | string,
): [isBig: boolean, formatted: string] =>
  typeof value === 'number' || typeof value === 'bigint'
    ? value >= Math.pow(10, 36)
      ? [true, bigIntToExponential(BigInt(value))]
      : [false, value.toLocaleString()]
    : [false, value]

Numeric.Flat = assumeProp(Numeric, 'isFlat')(true)

Numeric.FixedWidth = mapProps(
  ({
    digits,
    className,
    ...props
  }: Omit<Props, 'width'> & {digits: number}): Props => ({
    ...props,
    width: px(digits * digitWidthPx),
    className: twMerge('text-right', className),
  }),
)(Numeric)
