import {anchorName} from '#Css'
import {clampNumericInput} from '#Number'
import {type StyledProps} from '#react/props'
import {useTooltip} from '#Tooltip'
import {useMergeWithRefObject} from '#useMergeRefs'
import {useMemo, type ReactNode} from 'react'
import {twMerge} from 'tailwind-merge'
import {useOnChange} from './useOnChange'

export interface Props extends StyledProps {
  id: string
  min: number
  max: number
  value: number
  title?: ReactNode
  onChange: (n: number, index: number) => void
  name?: string
}

export const FixedNumeric = ({
  id,
  title,
  value,
  min,
  max,
  onChange: propsOnChange,
  style,
  className,
  ...props
}: Props) => {
  const clamp = useMemo(() => clampNumericInput({min, max}), [max, min])

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
        {...{...props, id, ref, defaultValue, onChange, style}}
        type='number'
        inputMode='numeric'
        onInput={clamp}
        className={twMerge(
          'w-[calc(5rch-1px)] text-right',
          isOpen && 'bg-yellow-50 text-ink',
          className,
        )}
        style={anchorName(id)}
      />
      {title !== undefined && tooltip}
    </div>
  )
}
