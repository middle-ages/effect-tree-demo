import {pipe} from '#Function'
import * as model from '#model'
import {Select} from '#Select'
import {
  numericFormatSelectItems,
  selectFormat,
  setFormat,
  useAppDispatch,
  useAppSelector,
} from '#store'
import {useCallback} from 'react'

interface Props {
  isFocusable: boolean
}

export const NumericFormat = ({isFocusable}: Props) => {
  const format = useAppSelector(selectFormat)
  const dispatch = useAppDispatch()
  const onChange = useCallback(
    (format: model.NumericFormat) => pipe(format, setFormat, dispatch),
    [dispatch],
  )

  return (
    <Select<model.NumericFormat>
      id='numeric-format'
      {...{isFocusable, onChange}}
      value={{...model.formats[format], id: format}}
      items={numericFormatSelectItems}
      title='Select a format for tree labels'
    />
  )
}
