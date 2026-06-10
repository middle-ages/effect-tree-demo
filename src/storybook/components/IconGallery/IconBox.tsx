import {OrdinalLabel} from '#OrdinalLabel'
import {px} from '#util'
import type {ReactNode} from 'react'

interface Props {
  index: number
  name: string
  icon: ReactNode
  iconColor: string
  iconSizePx: number
}

export const IconBox = ({index, name, icon, iconColor, iconSizePx}: Props) => {
  return (
    <div className='size-full flex-col place-items-center rounded-md bg-app p-2 inner-shadow dom-play *:dom-play'>
      <div
        className='flex-center'
        style={{
          width: px(iconSizePx),
          height: px(iconSizePx),
          color: iconColor,
          scale: iconSizePx / 32,
        }}>
        {icon}
      </div>
      <OrdinalLabel label={name} ordinal={index} />
    </div>
  )
}
