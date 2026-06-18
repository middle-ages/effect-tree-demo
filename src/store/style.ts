import {square} from '#Pair'
import {fromEntries, toEntries} from '#Record'
import {formats} from '#model'
import {type SelectItem} from '#types'
import {Array, pipe, String} from 'effect'
import {Draw} from 'effect-tree'

export const numericFormatSelectItems: SelectItem[] = pipe(
  formats,
  toEntries,
  Array.map(([key, props]) => ({key, ...props})),
)

const simpleItem = <const Id extends string = string>(
  label: Id,
): SelectItem => ({
  id: label,
  label,
  icon: '',
  title: '',
})

const themeToSelectItem = pipe(
  Draw.themeNames,
  Array.sort(String.Order),
  Array.map(square.mapSecond(simpleItem<Draw.ThemeName>)),
  fromEntries,
) as Record<Draw.ThemeName, SelectItem<Draw.ThemeName>>

export const themeSelectItems: SelectItem[] = pipe(
  themeToSelectItem,
  toEntries,
  Array.map(([key, props]) => ({key, ...props})),
)

export const themeSelectItem = (
  theme: Draw.ThemeName,
): SelectItem<Draw.ThemeName> => themeToSelectItem[theme]
