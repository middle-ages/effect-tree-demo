import {px} from '#Css'
import {pipe} from '#Function'
import type {Pair} from '#Pair'
import {roundEquivalence} from '#react/size'
import {
  selectLeftWidthPx,
  selectTopWidthPx,
  setWidths,
  useAppDispatch,
  useAppSelector,
} from '#store'
import {useHorizontalDrag} from '#useHorizontalDrag'
import {useMeasure} from '#useMeasure'
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefCallback,
} from 'react'

interface UseSplitPanel {
  buttonRef: RefCallback<HTMLElement>
  parentRef: RefCallback<HTMLElement>
  // handle double click: remember or restore expanded width
  resetToMinLeftWidth: () => void
  leftProps: {style: CSSProperties}
}

const padPx = 3
const buttonWidthPx = 6

export const splitterWidthPx = 18

export const useSplitPanel = (
  [minLeftWidthPx, minRightWidthPx]: Pair<number>,
  leftStyle?: CSSProperties,
): UseSplitPanel => {
  // Current mouse position
  const [xPx, setXPx] = useState(minLeftWidthPx)

  // Update mouse position on drag and get a ref for the draggable
  const [, buttonRef] = useHorizontalDrag(({xPx, adjustPx}) => {
    setXPx(Math.round(xPx - adjustPx - buttonWidthPx))
  })

  // Width when expanded on double click
  const expandedPx = useRef(minLeftWidthPx)

  // Measure top width
  const {
    ref: parentRef,
    sizePx: {widthPx: topWidthPx},
  } = useMeasure()

  // Compute left width
  const leftWidthPx = Math.min(
    topWidthPx - minRightWidthPx - splitterWidthPx - 1,
    Math.max(minLeftWidthPx, xPx - splitterWidthPx),
  )

  const innerLeftWidthPx = leftWidthPx - padPx

  const [previousTopWidthPx, previousLeftWidthPx] = [
    useAppSelector(selectTopWidthPx),
    useAppSelector(selectLeftWidthPx),
  ]

  // Check if widths have changed
  const hasWidthChanged =
    !roundEquivalence()(innerLeftWidthPx, previousLeftWidthPx) ||
    !roundEquivalence()(topWidthPx, previousTopWidthPx)

  const dispatch = useAppDispatch()
  useLayoutEffect(() => {
    if (hasWidthChanged) {
      pipe([topWidthPx, innerLeftWidthPx] as const, setWidths, dispatch)
    }
  }, [dispatch, hasWidthChanged, innerLeftWidthPx, topWidthPx])

  return {
    buttonRef,
    parentRef,
    leftProps: {
      style: {
        ...leftStyle,
        minWidth: px(minLeftWidthPx),
        width: px(leftWidthPx),
      },
    },
    resetToMinLeftWidth: useCallback(() => {
      setXPx(old => {
        if (old === minLeftWidthPx) {
          return expandedPx.current
        } else {
          expandedPx.current = old
          return minLeftWidthPx
        }
      })
    }, [minLeftWidthPx]),
  }
}
