import {OrdinalLabel} from '../../../components/OrdinalLabel'
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
  const fontSizePx = Math.pow(iconSizePx, 0.6) + Math.pow(iconSizePx, 0.2),
    paddingTop = fontSizePx / 2,
    innerRadiusPx = fontSizePx / 2

  return (
    <div
      className={`flex-col h-min overflow-hidden inner-shadow
                  bg-app p-2 place-items-center rounded-md`}
      style={{paddingTop}}>
      <div
        className="flex-center"
        style={{
          borderRadius: innerRadiusPx,
          width: px(iconSizePx),
          height: px(iconSizePx),
          transform: 'scale(3)',
          color: iconColor,
        }}>
        {icon}
      </div>
      <OrdinalLabel label={name} ordinal={index} />
    </div>
  )
}
