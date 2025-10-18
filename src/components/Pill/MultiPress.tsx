import {ms} from '#util'
import {Button} from '#Button'
import {type MultiPressProps} from '#types'
import type {CSSProperties} from 'react'

export const MultiPress = ({
  isActive,
  actions: [head, middle, last],
  listener,
}: MultiPressProps) => (
  <div className="flex p-0.5 *:leading-7!">
    <Button
      key="first"
      {...head}
      {...{isActive}}
      className="pill-left min-w-[35%]"
    />
    <Button
      key="middle"
      {...middle}
      {...{isActive, listener}}
      className="pill cross-pill relative z-1 rounded-lg -left-2 min-w-[30%]"
      style={
        {
          cornerShape: 'notch',
          transitionDelay: ms(100),
          transitionDuration: ms(350),
          borderRadius: 8,
        } as CSSProperties
      }
    />{' '}
    <Button
      key="last"
      {...last}
      {...{isActive}}
      className="pill-right min-w-[min(35%_+_16px)] relative -left-4"
    />
  </div>
)
