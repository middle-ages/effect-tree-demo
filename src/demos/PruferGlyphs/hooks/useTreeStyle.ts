import type {NumericFormat} from '#tree'
import type {Dispatcher} from '#util'
import type {Draw} from 'effect-tree'
import {useMemo, useState} from 'react'

export interface TreeStyleProps {
  theme: Draw.ThemeName
  format: NumericFormat
  setFormat: Dispatcher<NumericFormat>
  setTheme: Dispatcher<Draw.ThemeName>
}

export const useTreeStyle = ({
  format: initFormat,
  theme: initTheme,
}: {
  format: NumericFormat
  theme: Draw.ThemeName
}): TreeStyleProps => {
  const [format, setFormat] = useState(initFormat)
  const [theme, setTheme] = useState(initTheme)

  return useMemo(
    () => ({
      theme,
      format,
      setTheme,
      setFormat,
    }),
    [format, theme],
  )
}
