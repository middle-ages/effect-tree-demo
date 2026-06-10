import {useDrag} from '#useDrag'
import {ch, px, type StyledProps} from '#util'
import {useRef, useState, type CSSProperties, type ReactNode} from 'react'
import {twMerge} from 'tailwind-merge'

interface Props extends StyledProps {
  left: ReactNode
  right: ReactNode
  minLeftWidthPx: number
  parentPaddingPx: number
  leftClassName?: string
  rightClassName?: string
  leftStyle?: CSSProperties
  rightStyle?: CSSProperties
}

const structClass = `h-[calc((100%-12*var(--spacing))/2)] text-center
                     border-r border-l border-l-line-dark border-r-light
                     opacity-50 group-hover:opacity-100 dom-play`

export const SplitPanel = ({
  left,
  right,
  minLeftWidthPx,
  parentPaddingPx,
  leftClassName,
  rightClassName,
  leftStyle,
  rightStyle,
  style,
  className,
}: Props) => {
  const [xPx, setXPx] = useState(minLeftWidthPx)
  const expandedPx = useRef(minLeftWidthPx)

  const [{isDragging}, ref] = useDrag(({xPx}) => {
    setXPx(xPx)
  })

  const computedLeftWidth = `${px(xPx)} - ${px(parentPaddingPx / 2)} - ${ch(1 / 2)}`
  const leftWidth = `min(100cqw - 2rch, max(${px(minLeftWidthPx)}, ${computedLeftWidth}))`
  const resetMinLeftWidthPx = () => {
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
        'flex place-content-stretch *:not-last:no-flex *:last:flex-1 min-w-fit',
        !isDragging && '*:dom-play',
        className,
      )}>
      <div
        style={{
          ...leftStyle,
          minWidth: px(minLeftWidthPx),
          width: leftWidth,
        }}
        className={leftClassName}>
        {left}
      </div>
      <button
        {...{ref}}
        onDoubleClick={resetMinLeftWidthPx}
        tabIndex={-1}
        className={`flex-col justify-items-center w-3 group select-none
                    cursor-ew-resize outline-none ring-0 border-0`}>
        <div className={structClass} />
        <div
          className={`button px-0 w-fit text-center no-flex border cursor-ew-resize
                    text-fg-control-disabled group-hover:button-hover text-lg
                      group-active:group-hover:button-active h-6 pb-0.5`}>
          :
        </div>
        <div className={structClass} />
      </button>
      <div className={rightClassName} style={rightStyle}>
        {right}
      </div>
    </div>
  )
}
