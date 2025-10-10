import {map} from '#Array'
import {simpleItem, Select, type SelectItem} from '#components'
import {fromEntries, toEntries} from '#Record'
import {formats, type NumericFormat} from '#tree'
import {pipe, type Dispatcher} from '#util'
import {Draw} from 'effect-tree'
import type {PropsWithChildren} from 'react'

interface Props {
  theme: Draw.ThemeName
  format: NumericFormat
  setFormat: Dispatcher<NumericFormat>
  setTheme: Dispatcher<Draw.ThemeName>
}

const formatItems: SelectItem[] = pipe(
  formats,
  toEntries,
  map(([key, props]) => ({key, ...props})),
)

const themes: Record<Draw.ThemeName, SelectItem> = pipe(
  Draw.themeNames,
  map(name => [name, simpleItem(name)] as [Draw.ThemeName, SelectItem]),
  fromEntries,
)

const themeItems: SelectItem[] = map(Draw.themeNames, simpleItem)

export const StylePanel = ({format, theme, setFormat, setTheme}: Props) => {
  const selectedFormat = {...formats[format], key: format}
  const selectedTheme = {...themes[theme], key: theme}
  return (
    <div className="grid grid-cols-[min-content_1fr] gap-3 set-fg-control">
      <Row>
        <div className="truncate form-row-h">Label format</div>
        <Select<NumericFormat>
          value={selectedFormat}
          items={formatItems}
          onChange={setFormat}
        />
      </Row>

      <Row>
        <div className="truncate form-row-h">Tree theme</div>
        <Select<Draw.ThemeName>
          value={selectedTheme}
          items={themeItems}
          onChange={setTheme}
        />
      </Row>
    </div>
  )
}

const Row = ({children}: PropsWithChildren) => (
  <label className="grid grid-cols-subgrid col-span-2">{children}</label>
)
