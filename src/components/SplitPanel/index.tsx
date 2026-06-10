import {withClassName} from '#compinators'
import {px} from '#Css'
import type {Pair} from '#Pair'
import {type StyledProps} from '#react/props'
import {type CSSProperties, type ReactNode, type RefCallback} from 'react'
import {twMerge} from 'tailwind-merge'
import {splitterWidthPx, useSplitPanel} from './useSplitPanel'

interface Props extends StyledProps {
  left: ReactNode
  right: ReactNode
  minWidthsPx: Pair<number>
  leftClassName?: string
  rightClassName?: string
  leftStyle?: CSSProperties
}

const childClass = 'size-container'
const splitterWidth = px(splitterWidthPx)

export const SplitPanel = ({
  left,
  right,
  minWidthsPx,
  leftClassName,
  rightClassName,
  leftStyle,
  style,
  className,
}: Props) => {
  const {buttonRef, parentRef, resetToMinLeftWidth, leftProps} = useSplitPanel(
    minWidthsPx,
    leftStyle,
  )

  return (
    <div
      {...{style}}
      ref={parentRef}
      className={twMerge(
        'flex place-content-stretch *:not-last:no-flex *:last:flex-1',
        className,
      )}>
      <div {...leftProps} className={twMerge(childClass, leftClassName)}>
        {left}
      </div>
      <SplitterButton {...{resetToMinLeftWidth, buttonRef}} />
      <div className={twMerge(childClass, rightClassName)}>{right}</div>
    </div>
  )
}

const SplitterButton = ({
  buttonRef,
  resetToMinLeftWidth: onDoubleClick,
}: {
  buttonRef: RefCallback<HTMLButtonElement>
  resetToMinLeftWidth?: () => void
}) => (
  <button
    {...{ref: buttonRef, onDoubleClick}}
    style={{width: splitterWidth}}
    tabIndex={-1}
    className='button-vertical-top group'>
    <Strut className='rounded-t-sm' />
    <div className='button-vertical'>
      <div>:</div>
    </div>
    <Strut className='rounded-b-sm' />
  </button>
)

const Strut = withClassName.div(
  twMerge(
    'mx-auto grow',
    'border px-px',
    'bg-black/15 outset-xy-dim opacity-55',
    'group-hover:opacity-80 group-hover:outset-xy',
    'group-hover:border group-active:opacity-100',
    'group-active:border-[1.5px] group-active:inset-xy',
    'group-active:bg-black/20 dom-play',
  ),
)
