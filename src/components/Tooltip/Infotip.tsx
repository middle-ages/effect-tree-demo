import {anchorPosition} from '#Css'
import type {PropsWithChildren} from 'react'
import {useInfotip} from './useInfotip'

interface Props extends PropsWithChildren {
  anchor: string
  isOpen: boolean
  onClose: () => void
}

export const Infotip = ({anchor, isOpen, children, onClose}: Props) => (
  <div
    className='infotip-popover'
    {...useInfotip({isOpen, onClose})}
    popover='auto'>
    <div style={anchorPosition(anchor)}>
      <div>{children}</div>
    </div>
    <div style={anchorPosition(anchor)} />
  </div>
)
