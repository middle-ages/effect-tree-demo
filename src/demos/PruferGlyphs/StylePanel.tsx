import {map} from '#Array'
import {simpleItem, type SelectItem} from '#components'
import {Select} from '#Select'
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
    <div className="grid grid-cols-[min-content_1fr] gap-[5px] set-fg-control">
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
  <label className="grid grid-cols-subgrid col-span-2 *:form-row-h">
    <div className="truncate form-row-h">{label}</div>
    {children}
  </label>
)
