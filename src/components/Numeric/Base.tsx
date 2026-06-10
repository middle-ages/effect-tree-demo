import {useClampedListener} from '#useClampedListener'
import {px, type Identified, type StyledProps} from '#util'
import {twMerge} from 'tailwind-merge'
import {computeWidth} from './measure'

export interface Props<N extends number | string>
  extends StyledProps, Identified {
  min: N
  max: N
  value: N
  title: string
  onChange: (n: N, index: number) => void
  spacingLeftPx?: number
  spacingRightPx?: number
  maximized?: boolean
  showSpinner?: boolean
}

export const Base = <N extends number | string>({
  value: rawValue,
  min,
  max,
  onChange: propsOnChange,
  style,
  spacingLeftPx = 0,
  spacingRightPx = 0,
  maximized = false,
  showSpinner = false,
  className,
  ...props
}: Props<N>) => {
  const onChange = useClampedListener([min, max], propsOnChange)

  const value = rawValue.toString()
  const width = computeWidth({
    isFlat: false,
    padPx: 4 * (spacingLeftPx + spacingRightPx),
    showSpinner,
  })(value)

  return (
    <input
      type={showSpinner ? 'number' : 'text'}
      className={twMerge(showSpinner ? 'text-right' : 'text-center', className)}
      {...(showSpinner && {inputMode: 'numeric'})}
      {...props}
      {...{value, onChange}}
      style={{
        textOverflow: 'ellipsis',
        width: maximized ? `min(${width}, 100%)` : width,
        paddingLeft: px(4 * spacingLeftPx),
        paddingRight: px(4 * spacingRightPx),
        ...style,
      }}
    />
  )
}
