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

const splitterWidth = '12px'

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
        style={{width: splitterWidth}}
        onDoubleClick={resetToMinLeftWidth}
        tabIndex={-1}
        className={`group flex h-full cursor-ew-resize flex-col px-0.5 text-fg-control/50 ring-0 outline-none select-none`}>
        <div className='mx-auto grow rounded-t-sm border-2 inset-xy opacity-50 dom-play group-hover:opacity-100 group-hover:button-raised group-active:button-active group-active:border-[1.5px] group-active:opacity-80' />
        <div className='button h-10 cursor-ew-resize group-hover:button-raised group-active:button-active'>
          :
        </div>
        <div className='mx-auto grow rounded-t-sm border-2 inset-xy opacity-50 dom-play group-hover:opacity-100 group-hover:button-raised group-active:button-active group-active:border-[1.5px] group-active:opacity-80' />
      </button>
      <div className={rightClassName}>{right}</div>
    </div>
  )
}

const leftWidthCalc = (
  xPx: number,
  [left, right]: [minWidthLeftPx: number, minWidthRightPx: number],
) => {
  const clampMin = `max(${px(left)}, ${px(xPx)} - ${splitterWidth})`
  const maxLimit = `100cqw - ${px(right)} - ${splitterWidth}`
  return `min(${maxLimit}, ${clampMin})`
}
