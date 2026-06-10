import * as icons from '#icons'
import {Record} from '#util'
import {twMerge} from 'tailwind-merge'
import {HeaderScrollPanel} from '../HeaderScrollPanel'
import {IconBox} from './IconBox'

const allIcons = Record.toEntries(icons)

interface Props {
  iconColor: string
  iconSizePx: number
}

export const IconGallery = (props: Props) => {
  return (
    <HeaderScrollPanel header='Icon Gallery'>
      <div
        className={twMerge(
          'grid auto-rows-min *:dom-play',
          'grid-cols-[repeat(4,1fr)] gap-2 pr-2',
        )}>
        {allIcons.map(([name, icon], index) => (
          <IconBox key={name} {...{...props, index, name, icon}} />
        ))}
      </div>
    </HeaderScrollPanel>
  )
}
