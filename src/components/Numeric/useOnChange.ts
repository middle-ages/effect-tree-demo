import {useClampedListener} from '#useClampedListener'
import {useLayoutEffect, useRef, type ChangeEventHandler} from 'react'

interface Props<N extends number | string> {
  min: N
  max: N
  value: N
  onChange: (n: N, index: number) => void
}

export interface UseOnChange {
  ref: React.RefObject<HTMLInputElement>
  defaultValue: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const useOnChange = <N extends number | string>({
  min,
  max,
  value: rawValue,
  onChange: propsOnChange,
}: Props<N>) => {
  const value = rawValue.toString()
  const ref = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (element !== null && value !== element.value) {
      element.value = value
    }
  }, [value])

  return {
    ref,
    defaultValue: value,
    onChange: useClampedListener([min, max], propsOnChange),
  }
}
