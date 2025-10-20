import * as icons from '#icons'
import {Record} from '#util'
import {twMerge} from 'tailwind-merge'
import {IconBox} from './IconBox'
import {ScrollPanel} from '../ScrollPanel'

const allIcons = Record.toEntries(icons)

interface Props {
  iconColor: string
  iconSizePx: number
}

const gridClass = 'grid-cols-[repeat(auto-fill,minmax(min-content,150px))]'

export const IconGallery = ({iconColor, iconSizePx}: Props) => {
  return (
    <ScrollPanel header="Icon Gallery">
      <div className={twMerge('grid gap-3', gridClass)}>
        {allIcons.map(([name, icon], index) => (
          <IconBox key={name} {...{index, name, icon, iconColor, iconSizePx}} />
        ))}
      </div>
    </ScrollPanel>
  )
}
