import {useClampedListener} from '#useClampedListener'
import {px, type Identified, type StyledProps} from '#util'
import {twMerge} from 'tailwind-merge'

export interface Props extends StyledProps, Identified {
  min: number
  max: number
  value: number
  title: string
  onChange: (n: number, index: number) => void
  name?: string
  popoverTarget?: string
  popoverAction?: string
}

export const FixedNumeric = ({
  value: rawValue,
  min,
  max,
  onChange: propsOnChange,
  style,
  className,
  ...props
}: Props) => {
  const onChange = useClampedListener([min, max], propsOnChange)
  const value = rawValue.toString()

  return (
    <input
      type='number'
      inputMode='numeric'
      {...props}
      {...{value, style, onChange}}
      className={twMerge('w-[4.8rch] text-right', className)}
    />
  )
}
