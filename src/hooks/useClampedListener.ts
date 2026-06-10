import {bigClamp, numberClamp} from '#Number'
import {type Pair} from '#Pair'
import {useCallback, type ChangeEventHandler} from 'react'

/**
 * Converts a dispatcher for numbers or bigints into a change event listener
 * that clamps read values and also notifies with element index in its parent.
 */
export const useClampedListener = <N extends number | string>(
  minMax: Pair<N>,
  dispatcher: (n: N, index: number) => void,
): ChangeEventHandler<HTMLInputElement> => {
  // false if we are clamping a bigint input.
  const isNumber = typeof minMax[0] === 'number'
  const [min, max] = minMax

  return useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({currentTarget}) => {
      const maybeEmpty = currentTarget.value.replaceAll(/\D/g, '')
      const nonEmpty = maybeEmpty === '' ? '0' : maybeEmpty
      const value = isNumber
        ? numberClamp(...([min, max] as Pair<number>))(
            Number.parseInt(nonEmpty),
          )
        : bigClamp(BigInt(min), BigInt(max))(BigInt(nonEmpty)).toString()

      dispatcher(
        value as N,
        Array.from(currentTarget.parentElement?.children ?? []).indexOf(
          currentTarget,
        ),
      )
    },
    [dispatcher, isNumber, min, max],
  )
}
