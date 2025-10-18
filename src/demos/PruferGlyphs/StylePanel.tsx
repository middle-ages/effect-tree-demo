import {sort, map} from '#Array'
import {simpleItem, type SelectItem} from '#types'
import {Select} from '#Select'
import {fromEntries, toEntries} from '#Record'
import {formats, type NumericFormat} from '#tree'
import {String, pipe, type Dispatcher} from '#util'
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
  sort(String.Order),
  map(name => [name, simpleItem(name)] as [Draw.ThemeName, SelectItem]),
  fromEntries,
)

const themeItems: SelectItem[] = map(Draw.themeNames, simpleItem)

export const StylePanel = ({format, theme, setFormat, setTheme}: Props) => {
  const selectedFormat = {...formats[format], key: format}
  const selectedTheme = {...themes[theme], key: theme}
  return (
    <div className="grid grid-cols-[11ch_1fr] gap-0.5 set-fg-control">
      <Row label="Label format">
        <Select<NumericFormat>
          value={selectedFormat}
          items={formatItems}
          onChange={setFormat}
          title="Select a format for tree labels"
        />
      </Row>

      <Row label="Tree theme">
        <Select<Draw.ThemeName>
          value={selectedTheme}
          items={themeItems}
          onChange={setTheme}
          title="Select a tree theme."
        />
      </Row>
    </div>
  )
}

const Row = ({label, children}: {label: string} & PropsWithChildren) => (
  <label className="form-row-h grid grid-cols-subgrid col-span-2 h-7">
    <div className="truncate leading-7 h-7">{label}</div>
    {children}
  </label>
)
