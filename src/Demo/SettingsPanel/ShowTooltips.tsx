import {RadioGroup} from '#RadioGroup'
import {
  selectShowTooltips,
  setHideTooltips,
  setShowTooltips,
  useAppDispatch,
  useAppSelector,
} from '#store'
import {useCallback} from 'react'

interface Props {
  isFocusable: boolean
}

export const ShowTooltips = ({isFocusable}: Props) => {
  const showTooltips = useAppSelector(selectShowTooltips)

  const dispatch = useAppDispatch()

  const tooltipsOnChange = useCallback(
    (value: string): void => {
      dispatch((value === 'show' ? setShowTooltips : setHideTooltips)())
    },
    [dispatch],
  )

  return (
    <RadioGroup
      name='show-tooltips'
      {...{isFocusable}}
      value={showTooltips ? 'show' : 'hide'}
      options={{show: 'Show', hide: 'Hide'}}
      onChange={tooltipsOnChange}
    />
  )
}
