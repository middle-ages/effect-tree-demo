import {TreeCode} from '#model'
import {NumericInput} from '#NumericInput'
import {useAppDispatch} from '#store'
import {pipe, type StyledProps} from '#util'

interface Props extends StyledProps {
  index: number
  digit: number
  codeLength: number
  maxDigit: number
}

export const DigitEditor = ({
  digit,
  index,
  codeLength,
  maxDigit,
  className,
  style,
  ...props
}: Props) => {
  const dispatch = useAppDispatch()
  return (
    <NumericInput
      key={`key-${index.toString()}`}
      {...{...props, className, style}}
      value={digit}
      title={`Digit #${(index + 1).toString()}/${codeLength.toString()}.`}
      min={1}
      max={maxDigit}
      onChange={(digit, index) =>
        pipe({digit, index}, TreeCode.setDigit, dispatch)
      }
    />
  )
}
