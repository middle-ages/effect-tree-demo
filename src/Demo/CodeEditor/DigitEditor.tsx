import {pipe} from '#Function'
import {NumericInput} from '#NumericInput'
import {type StyledProps} from '#react/props'
import {
  selectComputedDigitAndCount,
  setDigit,
  useAppDispatch,
  useAppSelector,
} from '#store'
import {twMerge} from 'tailwind-merge'

interface Props extends StyledProps {
  index: number
  name: string
  maxDigit: number
}

export const DigitEditor = ({index, maxDigit, className, ...props}: Props) => {
  const dispatch = useAppDispatch()
  const {digit: value} = useAppSelector(selectComputedDigitAndCount(index))

  return (
    <NumericInput
      id={(index + 1).toString()}
      {...{...props, value}}
      min={1}
      max={maxDigit}
      onChange={digit => pipe({digit, index}, setDigit, dispatch)}
      className={twMerge(
        'h-[calc(100%-3*var(--spacing))] min-h-4.5 text-right contain-strict',
        className,
      )}
    />
  )
}

/*

      title={`Digit #${(index + 1).toString()}/${digitCount.toString()}.`}

*/
