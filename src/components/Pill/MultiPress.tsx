import {ms} from '#util'
import {Button} from '#Button'
import {type MultiPressProps} from '#types'
import type {CSSProperties} from 'react'

export const MultiPress = ({
  isActive,
  actions: [head, middle, last],
  listener,
}: MultiPressProps) => (
  <div className="pill-panel form-row-inner-h *:h-[23px] w-full flex-center *:min-w-fit *:flex-1">
    <Button
      key="first"
      {...head}
      {...{isActive}}
      className="px-4 pill-left border-r-0!"
    />
    <Button
      key="middle"
      {...middle}
      {...{isActive, listener}}
      className="cross-pill px-4 rounded-lg -m-2 border-[1.5px]! border-outset-dim-1.5"
      style={
        {
          cornerShape: 'notch',
          transitionDelay: ms(100),
          transitionDuration: ms(350),
        } as CSSProperties
      }
    />{' '}
    <Button
      key="last"
      {...last}
      {...{isActive}}
      className="px-4 pill-right border-l-0!"
    />
  </div>
)
