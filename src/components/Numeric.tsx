import {map, range} from '#Array'
import {tupled} from '#Function'
import {bigIntToExponential, sumAll} from '#Number'
import {monoRecord} from '#Record'
import {fromNumber} from '#String'
import {pipe, px, type StyledProps} from '#util'
import {twMerge} from 'tailwind-merge'

interface Props extends StyledProps {
  value: bigint | number | string
  maxWidthPx?: number | undefined
  width?: string
  sizeFactor?: number
}

// 16px CMU Serif
const glyphWidthPx = {
  ...pipe(range(0, 9), map(fromNumber), tupled(monoRecord(8))),
  e: 7.104,
  '+': 12.448,
  ',': 4.438,
  '.': 4.448,
}

const horizontalSpacingPx = 4 + 6 + 2 * 2

/**
 * A component that displays a numeric value or a string message. The message
 * type can be:
 *
 * 1. `number`
 * 2. `bigint`
 * 3. `string`
 *
 * When the value is a string, no special processing is performed.
 *
 * When it is numeric, we normalize with no loss of precision into `bigint` and
 * format so:
 *
 * 1. If the value `< 10⁷` we display the number/bigint as a nice locale string.
 * 2. If the value `≥ 10⁷` we display the number/bigint in exponential notation,
 *    but add a tooltip with the full expansion of the value.
 *
 * The element width will be set to the width of the displayed value. For string
 * input, you should supply the optional width because measurement is approximated.
 *
 * If the computed/given width exceeds the given maximum width the element will
 * expand no more and the class `truncate` will be added to it. The tooltip
 * will still show the full expanded value.
 *
 * No truncate/limit will be applied if the width is given explicitly.
 */
export const Numeric = ({
  value,
  maxWidthPx,
  width: givenWidth,
  sizeFactor = 1,
  className,
  style,
}: Props) => {
  const [isBig, formatted] = normalize(value)
  const title = isBig ? value.toLocaleString() : ''
  const [isOverflow, width] =
    givenWidth === undefined && maxWidthPx !== undefined
      ? overflowWidth(maxWidthPx, formatted, sizeFactor)
      : [false, givenWidth]

  return (
    <>
      <span
        className={twMerge(
          'numeric',
          typeof value === 'string' && 'italic',
          isOverflow && 'truncate',
          className,
        )}
        {...{title}}
        style={{width, ...style}}>
        {formatted}
      </span>{' '}
    </>
  )
}

const overflowWidth = (
  maxWidthPx: number,
  formatted: string,
  sizeFactor: number,
): [boolean, string] => {
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
    ? value >= Math.pow(10, 7)
      ? [true, bigIntToExponential(BigInt(value))]
      : [false, value.toLocaleString()]
    : [false, value]
