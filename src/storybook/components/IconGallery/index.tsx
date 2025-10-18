import * as icons from '#icons'
import {Record} from '#util'
import {twMerge} from 'tailwind-merge'
import {IconBox} from './IconBox'

const allIcons = Record.toEntries(icons)

interface Props {
  iconColor: string
  iconSizePx: number
}

const scrollableHeight = 'h-[calc(100%-_var(--headerHeight))]'

export const IconGallery = ({iconColor, iconSizePx}: Props) => {
  return (
    <div className="px-1.5 pb-1.5 set-bg-light fill-container overflow-hidden">
      <h1>Icon Gallery</h1>
      <div
        className={twMerge(
          scrollableHeight,
          '[--topShadowUp:8px] [--bottomShadowDown:8px]',
          'p-2 set-bg-dark scrollable-y size-container',
          'set-light-border rounded-[20px] [&::after]:bottom-0',
        )}>
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: `repeat(auto-fill,minmax(min-content,150px))`,
          }}>
          {allIcons.map(([name, icon], index) => {
            return (
              <IconBox
                key={name}
                {...{index, name, icon, iconColor, iconSizePx}}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
