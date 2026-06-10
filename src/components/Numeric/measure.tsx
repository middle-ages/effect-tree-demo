import {map, range} from '#Array'
import {tupled, type EndoOf} from '#Function'
import {bigToExponential, multiply, sum, sumAll} from '#Number'
import {monoRecord} from '#Record'
import {fromNumber, repeat} from '#String'
import {pipe, px} from '#util'

export const digitWidthPx = 8.385

export const glyphWidthPx = {
  ...pipe(range(0, 9), map(fromNumber), tupled(monoRecord(digitWidthPx))),
  e: 7.444,
  '+': 13.044,
  ',': 4.644,
  '.': 4.66,
}

export interface MeasureOptions {
  isFlat: boolean
  showSpinner: boolean
  padPx: number
}

const mantissaWidth = digitWidthPx + glyphWidthPx['.']

const beveledBorderPx = 2 * 2 // border-2 * 2
const flatBorderPx = 1 * 2 // border * 2
const spinnerWidthPx = 15 + 4 // spinnerWidth + spinnerMarginLeft

const fontSizeFactor = 1

const borderPx = ({isFlat}: Partial<MeasureOptions> = {}): number =>
  (isFlat ?? false) ? flatBorderPx : beveledBorderPx

export const horizontalSpacingPx = (
  options: Partial<MeasureOptions> = {},
): number =>
  fontSizeFactor * (options.padPx ?? 0) +
  borderPx(options) +
  ((options.showSpinner ?? false) ? spinnerWidthPx : 0)

export const computeWidthPx =
  (options: Partial<MeasureOptions> = {}) =>
  (formatted: string): number =>
    measure(formatted) + horizontalSpacingPx(options)

export const computeWidth =
  (options?: Partial<MeasureOptions>): EndoOf<string> =>
  formatted =>
    pipe(formatted, computeWidthPx(options), px)

export const measureCommaFormattedWidth =
  (options: Partial<MeasureOptions> = {}) =>
  (n: bigint): number => {
    const digits = n.toString().length
    const commas = Math.max(0, Math.ceil(digits / 3) - 1)
    return (
      fontSizeFactor *
      (digits * digitWidthPx +
        commas * glyphWidthPx[','] +
        horizontalSpacingPx(options))
    )
  }

const widthPxCache = new Map<string, number>()

export const measure = (s: string): number => {
  const cached = widthPxCache.get(s)
  if (cached !== undefined) {
    return cached
  }

  const occurrences = new Map<string, number>()
  for (const c of s) {
    occurrences.set(c, (occurrences.get(c) ?? 0) + 1)
  }
  const widthPx =
    fontSizeFactor *
    sumAll(
      [...occurrences.entries()].map(([c, count]) => {
        const measured = glyphWidthPx[c as keyof typeof glyphWidthPx] as
          | number
          | undefined

        return count * (measured ?? digitWidthPx)
      }),
    )

  widthPxCache.set(s, widthPx)
  return widthPx
}

export const measureDigits =
  (options: Partial<MeasureOptions> = {}) =>
  (digits: number): string =>
    pipe(
      '0',
      repeat(digits),
      measure,
      sum(horizontalSpacingPx(options)),
      multiply(fontSizeFactor),
      px,
    )

export const formatExponential =
  (options: Partial<MeasureOptions> = {}) =>
  (totalAvailablePx: number, value: bigint): string => {
    const [mantissa, exponent] = bigToExponential(value)

    const exponentWidth =
      glyphWidthPx['e'] + glyphWidthPx['+'] + exponent.length * digitWidthPx

    const availablePx =
      totalAvailablePx -
      horizontalSpacingPx(options) -
      exponentWidth -
      mantissaWidth

    const showDigits = Math.floor(availablePx / digitWidthPx) + 2
    const sliced = mantissa.slice(0, showDigits)
    const padded = sliced.padEnd(showDigits, '0')

    return padded + 'e+' + exponent
  }
