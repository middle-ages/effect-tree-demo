import {bigClamp, numberClamp} from '#Number'
import {type Pair} from '#Pair'
import {useCallback, type ChangeEvent} from 'react'

/**
 * Converts a dispatcher for numbers or bigints into a change event listener
 * that clamps read values and also notifies with element index in its parent.
 */
export const useClampedListener = <N extends number | string>(
  minMax: Pair<N>,
  dispatcher: (n: N, index: number) => void,
): ((event: ChangeEvent<HTMLInputElement>) => void) => {
  // false if we are clamping a bigint input.
  const isNumber = typeof minMax[0] === 'number'
  const [min, max] = minMax

  return useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const target = event.target as HTMLInputElement
      const maybeEmpty = target.value.replaceAll(/\D/g, '')
      const nonEmpty = maybeEmpty === '' ? '0' : maybeEmpty
      const value = isNumber
        ? numberClamp(...([min, max] as Pair<number>))(
            Number.parseInt(nonEmpty),
          )
        : bigClamp(BigInt(min), BigInt(max))(BigInt(nonEmpty)).toString()

      dispatcher(
        value as N,
        [...(target.parentElement?.children ?? [])].indexOf(target),
      )
    },
    [dispatcher, isNumber, min, max],
  )
}
