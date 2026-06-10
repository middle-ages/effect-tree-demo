import {useCallback} from 'react'
import {useArgs} from 'storybook/internal/preview-api'

export interface OnChangeProps<T> {
  value: T
  onChange: (value: T) => void
}

export const useOnChange = <T, Props extends OnChangeProps<T>>(): [
  value: T,
  onChange: (value: T) => void,
] => {
  const [{value, onChange: argsOnChange}, updateArgs] = useArgs<Props>()

  const onChange = useCallback(
    (newValue: T) => {
      argsOnChange(newValue)
      updateArgs({value: newValue} as Partial<Props>)
    },
    [argsOnChange, updateArgs],
  )

  return [value, onChange]
}
