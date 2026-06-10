import {pipe} from '#Function'
import {Select} from '#Select'
import {
  selectTheme,
  setTheme,
  themeSelectItem,
  themeSelectItems,
  useAppDispatch,
  useAppSelector,
} from '#store'
import {Draw} from 'effect-tree'
import {useCallback} from 'react'

interface Props {
  isFocusable: boolean
}

export const ThemeName = ({isFocusable}: Props) => {
  const theme = useAppSelector(selectTheme)
  const dispatch = useAppDispatch()
  const onChange = useCallback(
    (theme: Draw.ThemeName) => pipe(theme, setTheme, dispatch),
    [dispatch],
  )

  return (
    <Select<Draw.ThemeName>
      id='theme-name'
      {...{isFocusable, onChange}}
      value={{...themeSelectItem(theme), id: theme}}
      items={themeSelectItems}
      title='Select a tree theme.'
    />
  )
}
