import {twMerge} from 'tailwind-merge'
import {colorEntryKeys, type ColorEntry} from './model'

interface Props {
  index: number
  entry: ColorEntry
  className: string
}

export const ColorRow = ({index, entry, className}: Props) => (
  <div className={twMerge('size-full pl-1 text-ink', className)}>
    <div className='translate-y-px text-right text-ordinal'>
      {(index + 1).toString() + '.'}
    </div>
    <div className='ml-1' title={entry.color}>
      {entry.name}
    </div>
    {colorEntryKeys.slice(1, -1).map(key => (
      <ColorCell key={key} value={entry[key]} />
    ))}
    <div style={{background: entry.color}} className='min-w-24 pr-1' />
  </div>
)

const ColorCell = ({value}: {value: string}) => (
  <div
    className={`text-center font-mono text-smaller leading-row-small text-fg-control`}>
    {value.toUpperCase()}
  </div>
)
