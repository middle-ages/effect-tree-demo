import {withClassName} from '#compinators'
import {SizePx} from '#react/size'
import {pluck} from '#Record'
import {useMeasure} from '#useMeasure'
import {useDrag} from '#useDrag'
import {flow, pipe} from '#Function'
import {px} from '#Css'
import {type StyledProps} from '#react/props'
import {
  selectLeftWidthPx,
  setLeftWidthPx,
  useAppDispatch,
  useAppSelector,
} from '#store'
import {
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefCallback,
} from 'react'
import {twMerge} from 'tailwind-merge'

interface Props extends StyledProps {
  left: ReactNode
  right: ReactNode
  minWidthsPx: [left: number, right: number]
  leftClassName?: string
  rightClassName?: string
  leftStyle?: CSSProperties
}

const splitterWidthPx = 12
const splitterWidth = px(splitterWidthPx)

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

  //  const dispatch = useAppDispatch()

  const {
    ref: parentRef,
    sizePx: {widthPx: parentWidthPx},
  } = useMeasure()

  const [, buttonRef] = useDrag(flow(pluck('xPx'), setXPx))
  const leftWidthPx = leftWidthCalc(xPx, parentWidthPx, [
    minLeftWidthPx,
    minRightWidthPx,
  ])

  // handle double click
  const resetToMinLeftWidth: () => void = useCallback(() => {
    setXPx(old => {
      if (old === minLeftWidthPx) {
        return expandedPx.current
      } else {
        expandedPx.current = old
        return minLeftWidthPx
      }
    })
  }, [minLeftWidthPx])

  return (
    <div
      {...{style}}
      ref={parentRef}
      className={twMerge(
        'flex place-content-stretch *:not-last:no-flex *:last:flex-1',
        className,
      )}>
      {' '}
      <div
        style={{
          ...leftStyle,
          minWidth: px(minLeftWidthPx),
          width: px(leftWidthPx),
        }}
        className={leftClassName}>
        {left}
      </div>
      <SplitterButton {...{resetToMinLeftWidth, buttonRef}} />
      <div className={rightClassName}>{right}</div>
    </div>
  )
}

const leftWidthCalc = (
  xPx: number,
  parentWidthPx: number,
  [left, right]: [minWidthLeftPx: number, minWidthRightPx: number],
): number => {
  const clampMinPx = Math.max(left, xPx - splitterWidthPx)
  const adjustedRightPx = right + splitterWidthPx
  const maxLimit = parentWidthPx - adjustedRightPx
  return Math.min(maxLimit, clampMinPx)
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
    className='group flex h-full cursor-ew-resize flex-col px-0.5 ring-0 brightness-105 outline-none select-none hover:*:brightness-95 active:*:brightness-97'>
    <Strut className='rounded-t-sm' />
    <div className='button-base min-h-12 cursor-ew-resize squircle rounded-full pb-1 text-2xl leading-12 text-fg-control/60 button-raised group-hover:text-fg-control-hover group-hover:contrast-107 group-active:text-fg-control group-active:brightness-90!'>
      :
    </div>
    <Strut className='rounded-b-sm' />
  </button>
)

const Strut = withClassName.div(
  twMerge(
    'mx-auto grow',
    'border-2 px-[0.5px]',
    'bg-fg-control/20 inset-xy dom-play opacity-50',
    'group-hover:opacity-65',
    'group-active:border group-active:opacity-100',
    'group-active:px-0.5 group-active:bg-fg-control/10',
  ),
)
