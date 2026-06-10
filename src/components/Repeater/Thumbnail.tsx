import {HandCursor} from '#icons/HandCursor'
import {IncCode} from '#icons/IncCode'
import type {StyledProps} from '#react/props'
import {twMerge} from 'tailwind-merge'
import {Repeater} from './Repeater'

export const Thumbnail = ({style, className}: StyledProps) => (
  <div className={twMerge('relative size-fit', className)}>
    <Repeater
      {...{style}}
      id='none'
      isFocusable={false}
      className='h-6 w-9 animate-press-button'>
      {IncCode}
    </Repeater>
    <div className='absolute-0 top-3.5 left-4 z-10 scale-90 animate-press-hand'>
      {HandCursor}
    </div>
  </div>
)
