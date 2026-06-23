import {Select} from '#Select'
import {Details} from '#Details'
import {flow} from 'effect'
import {Draw} from 'effect-tree'
import type {PropsWithChildren} from 'react'
import {
  numericFormatSelectItems,
  selectFormat,
  selectTheme,
  setFormat,
  setTheme,
  themeSelectItem,
  themeSelectItems,
  useAppDispatch,
  useAppSelector,
} from '#store'
import {formats, type NumericFormat} from '#model'

export const StylePanel = () => {
  const [format, theme] = [
    useAppSelector(selectFormat),
    useAppSelector(selectTheme),
  ]

  const dispatch = useAppDispatch()

  return (
    <Details label='Appearance'>
      <div className='grid max-h-15.5 min-h-15.5 grid-cols-[10ch_1fr] gap-x-2 pt-1.5 contain-strict'>
        <Row label='Label format'>
          <Select<NumericFormat>
            value={{...formats[format], id: format}}
            items={numericFormatSelectItems}
            onChange={flow(setFormat, dispatch)}
            title='Select a format for tree labels'
          />
        </Row>
        <Row label='Tree theme'>
          <Select<Draw.ThemeName>
            value={{...themeSelectItem(theme), id: theme}}
            items={themeSelectItems}
            onChange={flow(setTheme, dispatch)}
            title='Select a tree theme.'
          />
        </Row>
      </div>
    </Details>
  )
}

const Row = ({label, children}: {label: string} & PropsWithChildren) => (
  <label className='subgrid-2 h-row-small select-none'>
    <div>{label}</div>
    <div>{children}</div>
  </label>
)
