import {NumericInput} from '#NumericInput'
import {twMerge} from 'tailwind-merge'
import type {StyledProps} from '#util'

interface Props extends StyledProps {
  index: number
  digit: number
  codeLength: number
  maxDigit: number
  onChange: (n: number, index: number) => void
}

export const DigitEditor = ({
  digit,
  index,
  codeLength,
  maxDigit,
  className,
  ...props
}: Props) => (
  <NumericInput
    key={`key-${index.toString()}`}
    {...props}
    value={digit}
    title={`Digit #${(index + 1).toString()}/${codeLength.toString()}.`}
    min={1}
    max={maxDigit}
    spacingLeft={0.5}
    spacingRight={0.5}
    className={twMerge('border', className)}
  />
)
