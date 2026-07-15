import {
  closeWelcome,
  selectIsWelcomeOpen,
  useAppDispatch,
  useAppSelector,
} from '#store'
import {useCallback} from 'react'

export const useIsWelcome = (): {
  isWelcomeOpen: boolean
  onCloseInfotip: () => void
} => {
  const dispatch = useAppDispatch()

  return {
    isWelcomeOpen: useAppSelector(selectIsWelcomeOpen),

    onCloseInfotip: useCallback(() => {
      dispatch(closeWelcome())
    }, [dispatch]),
  }
}
