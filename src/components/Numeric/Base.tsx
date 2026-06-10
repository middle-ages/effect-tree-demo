import {anchorName, px} from '#Css'
import {clampBigInput, clampNumericInput} from '#Number'
import {type StyledProps} from '#react/props'
import {useTooltip} from '#Tooltip'
import {useMergeWithRefObject} from '#useMergeRefs'
import {useMemo, type ReactNode} from 'react'
import {twMerge} from 'tailwind-merge'
import {useOnChange} from './useOnChange'

export interface Props<N extends number | string> extends StyledProps {
  id: string
  min: N
  max: N
  value: N
  title?: ReactNode
  onChange: (n: N, index: number) => void
  spacingLeftPx?: number
  spacingRightPx?: number
}

export const Base = <N extends number | string>({
  id,
  value,
  min,
  max,
  onChange: propsOnChange,
  style,
  spacingLeftPx = 0,
  spacingRightPx = 0,
  title,
  className,
  ...props
}: Props<N>) => {
  const isNumeric =
    typeof min === 'number' &&
    typeof max === 'number' &&
    typeof value === 'number'

  const clamp = useMemo(
    () => (isNumeric ? clampNumericInput : clampBigInput)({min, max}),
    [isNumeric, max, min],
  )

  const {ref: hoverRef, tooltip, isOpen: isHover} = useTooltip({id, title})
  const isOpen = title !== undefined && isHover
  const {
    ref: changeRef,
    defaultValue,
    onChange,
  } = useOnChange({value, min, max, onChange: propsOnChange})
  const ref = useMergeWithRefObject(hoverRef, changeRef)

  return (
    <div className='contents'>
      <input
        {...{...props, ref, defaultValue, onChange}}
        name={id}
        onInput={clamp}
        className={twMerge(
          isNumeric && 'numeric-input',
          isOpen && 'bg-yellow-50 text-ink',
          className,
        )}
        inputMode='numeric'
        type={isNumeric ? 'number' : 'text'}
        style={{
          ...anchorName(id),
          textOverflow: 'ellipsis',
          paddingLeft: px(4 * spacingLeftPx),
          paddingRight: px(4 * spacingRightPx),
          ...style,
        }}
      />
      {title !== undefined && tooltip}
    </div>
  )
}
