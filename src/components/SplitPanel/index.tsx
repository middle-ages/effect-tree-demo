import {pluck} from '#Record'
import {useDrag} from '#useDrag'
import {flow, px, type StyledProps} from '#util'
import {useRef, useState, type CSSProperties, type ReactNode} from 'react'
import {twMerge} from 'tailwind-merge'

interface Props extends StyledProps {
  left: ReactNode
  right: ReactNode
  minWidthsPx: [left: number, right: number]
  leftClassName?: string
  rightClassName?: string
  leftStyle?: CSSProperties
}

const strutClass =
  'h-[calc((100%-2rem-var(--spacing))/2)] button-base rounded-none mx-1 last:-scale-y-100 cursor-ew-resize opacity-30 group-hover:opacity-50 w-1 dom-play group-active:opacity-100 contain-strict'

const strut = <div className={strutClass} />

const splitterWidthPx = 12

export const SplitPanel = ({
  left,
  right,
  minWidthsPx: [minLeftWidthPx, minRightWidthPx],
  leftClassName,
  rightClassName,
  leftStyle,
  style,
  className,
}: Props) => {
  const [xPx, setXPx] = useState(minLeftWidthPx)
  const expandedPx = useRef(minLeftWidthPx)

  const [, ref] = useDrag(flow(pluck('xPx'), setXPx))
  const leftWidth = leftWidthCalc(xPx, [minLeftWidthPx, minRightWidthPx])

  const resetToMinLeftWidth = () => {
    setXPx(old => {
      if (old === minLeftWidthPx) {
        return expandedPx.current
      } else {
        expandedPx.current = old
        return minLeftWidthPx
      }
    })
  }

  return (
    <div
      {...{style}}
      className={twMerge(
        'flex',
        'overflow-hidden',
        'place-content-stretch *:not-last:no-flex *:last:flex-1',
        className,
      )}>
      <div
        style={{...leftStyle, minWidth: px(minLeftWidthPx), width: leftWidth}}
        className={leftClassName}>
        {left}
      </div>
      <button
        {...{ref}}
        style={{width: splitterWidthPx}}
        onDoubleClick={resetToMinLeftWidth}
        tabIndex={-1}
        className={`group cursor-ew-resize flex-col justify-items-center px-0.5 ring-0 outline-none select-none`}>
        {strut}
        <div
          className={`button group-hover:button-hover h-10 cursor-ew-resize pb-1 text-center text-xl text-fg-control-disabled group-active:group-hover:button-active`}>
          :
        </div>
        {strut}
      </button>
      <div className={rightClassName}>{right}</div>
    </div>
  )
}

const leftWidthCalc = (
  xPx: number,
  [left, right]: [minWidthLeftPx: number, minWidthRightPx: number],
) => {
  const desired = `${px(xPx)} - ${px(splitterWidthPx)}`
  const clampMin = `max(${px(left)}, ${desired})`
  const maxLimit = `100cqw - ${px(right)} - ${px(splitterWidthPx)}`
  return `min(${maxLimit}, ${clampMin})`
}
