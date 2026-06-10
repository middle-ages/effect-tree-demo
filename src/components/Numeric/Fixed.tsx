import {useClampedListener} from '#useClampedListener'
import {px, type Identified, type StyledProps} from '#util'
import {twMerge} from 'tailwind-merge'
import {measureDigits} from './measure'

export interface Props extends StyledProps, Identified {
  min: number
  max: number
  value: number
  title: string
  onChange: (n: number, index: number) => void
  digits: number
}

const paddingLeftPx = 3

export const FixedNumeric = ({
  value: rawValue,
  min,
  max,
  onChange: propsOnChange,
  digits,
  style,
  className,
  ...props
}: Props) => {
  const onChange = useClampedListener([min, max], propsOnChange)
  const value = rawValue.toString()
  const width = measureDigits({showSpinner: true, padPx: paddingLeftPx})(digits)

  return (
    <input
      type="number"
      inputMode="numeric"
      {...props}
      {...{value, onChange}}
      className={twMerge('text-right', className)}
      style={{width, paddingLeft: px(paddingLeftPx), ...style}}
    />
  )
}
