import {Predicate} from 'effect'
import type {EndoOf} from './Function'

export * from 'effect/Number'

export const floorMod = (
  dividend: number,
  divisor: number,
): [quotient: number, remainder: number] => [
  Math.floor(dividend / divisor),
  dividend % divisor,
]

export const floorMod2 = (
    dividend: number,
  ): [quotient: number, remainder: number] => floorMod(dividend, 2),
  isPositive: Predicate.Predicate<number> = n => n > 0,
  isNonZero: Predicate.Predicate<number> = n => n !== 0,
  isEven: Predicate.Predicate<number> = n => n % 2 === 0,
  isOdd: Predicate.Predicate<number> = n => n % 2 !== 0,
  isEqualTo: (that: number) => Predicate.Predicate<number> = that => n =>
    n === that

export const bigIntToExponential = (value: bigint): string => {
  const s = value.toString()
  const log10 = s.length - 1

  if (log10 === 0) {
    return s + 'e+0'
  }

  let mantissa = s.charAt(0)
  if (s.length > 1) {
    mantissa += '.' + s.slice(1)
  }

  return mantissa + 'e+' + log10.toString()
}

export const bigDiv =
  (denominator: bigint): EndoOf<bigint> =>
  n =>
    n / denominator

export const bigHalf: EndoOf<bigint> = bigDiv(2n)

export const bigGreaterThan =
  (that: bigint): Predicate.Predicate<bigint> =>
  self =>
    self > that

export const bigLessThan =
  (that: bigint): Predicate.Predicate<bigint> =>
  self =>
    self < that

export const floorDiv =
  (denominator: number): EndoOf<number> =>
  n =>
    Math.floor(n / denominator)

export const floorHalf: EndoOf<number> = floorDiv(2)
