import {RadioGroup} from '#RadioGroup'
import {
  openWelcome,
  selectIsWelcomeOpen,
  useAppDispatch,
  useAppSelector,
} from '#store'
import {useCallback} from 'react'

interface Props {
  isFocusable: boolean
}

export const ShowWelcome = ({isFocusable}: Props) => {
  const showWelcome = useAppSelector(selectIsWelcomeOpen)

  const dispatch = useAppDispatch()

  const tooltipsOnChange = useCallback(
    (value: string): void => {
      if (value === 'show') {
        dispatch(openWelcome())
      }
    },
    [dispatch],
  )

  return (
    <RadioGroup
      name='show-welcome'
      {...{isFocusable}}
      value={showWelcome ? 'show' : 'hide'}
      options={{show: 'Show', hide: 'Hide'}}
      onChange={tooltipsOnChange}
    />
  )
}
