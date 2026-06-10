import {flipSortDirection} from '#util'
import {useCallback, useState} from 'react'
import {
  initialSortState,
  sortedThemeColors,
  type ColorEntry,
  type ColorSortHandlers,
  type ColorSortKey,
} from './model'

export interface UseSortedColors extends ColorSortHandlers {
  sorted: ColorEntry[]
}

export const useSortedColors = (): UseSortedColors => {
  const [state, setState] = useState(initialSortState)

  const flipDirection: () => void = useCallback(() => {
    setState(({direction, ...state}) => ({
      ...state,
      direction: flipSortDirection(direction),
    }))
  }, [])

  const setSortBy = useCallback((sortBy: ColorSortKey) => {
    setState(({sortBy: _, ...state}) => ({...state, sortBy}))
  }, [])

  return {...state, flipDirection, setSortBy, sorted: sortedThemeColors(state)}
}
