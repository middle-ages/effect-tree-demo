import {rem} from '#util'
import {HeaderScrollPanel} from '../HeaderScrollPanel'
import {ColorRow} from './ColorRow'
import {HeaderRow} from './HeaderRow'
import {useSortedColors} from './useSortedColors'

const gridClass =
  'grid grid-cols-[min-content_minmax(21rch,1fr)_repeat(7,minmax(8rch,1fr))_24rch]'

const subgridClass = `grid grid-cols-subgrid col-span-10
                      *:leading-row-smaller bg-input-active`

export const ColorGallery = () => {
  const state = useSortedColors()
  const {sorted} = state
  return (
    <HeaderScrollPanel
      header='Color Palette'
      scrollPanelClassName='before:top-7'>
      <div className={gridClass}>
        <HeaderRow className={subgridClass} height={rem(7 / 4)} {...state} />
        {sorted.map((entry, index) => (
          <ColorRow
            key={entry.name}
            {...{entry, index}}
            className={subgridClass}
          />
        ))}
      </div>
    </HeaderScrollPanel>
  )
}
