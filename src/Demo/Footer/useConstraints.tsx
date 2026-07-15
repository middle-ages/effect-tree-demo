import * as Array from '#Array'
import {px, setVar} from '#Css'
import {computeWidthPx} from '#measure'
import {selectComputedCode, selectTopWidthPx, useAppSelector} from '#store'
import {useHorizontalScroll} from '#useHorizontalScroll'
import {Codec} from 'effect-tree'
import {
  useCallback,
  useEffectEvent,
  useLayoutEffect,
  useMemo,
  type CSSProperties,
  type ReactNode,
  type RefCallback,
  type RefObject,
} from 'react'

export interface UseConstraints {
  code: number[]
  digitCount: number
  digitStyle: CSSProperties
  elementRef: RefObject<HTMLElement | null>
  firstVisible: number
  gapPx: number
  inputWidthPx: number
  isScrolling: boolean
  lastVisible: number | undefined
  maxDigit: number
  noCode: ReactNode
  offsetPx: number
  parentStyle: CSSProperties
  ref: RefCallback<HTMLElement>
  requiredWidthPx: number
  scrollTo: (ratio: number) => void
  topStyle: CSSProperties
  visibleCountRem: number
  visibleIndexes: number[]
}

const [parentPadLeftPx, parentPadRightPx] = [3, 4]
const parentPadPx = parentPadLeftPx + parentPadRightPx

const parentStyle = {
  paddingLeft: parentPadLeftPx,
  paddingRight: parentPadRightPx,
}

const gapPx = 3
const inputWidthPx = computeWidthPx({padPx: 2})('999') + 1
const inputGapWidthPx = inputWidthPx + 2 * gapPx

const digitStyle: CSSProperties = {
  width: inputWidthPx,
  minWidth: inputWidthPx,
  marginLeft: gapPx,
  marginRight: gapPx,
}

const noCode = (
  <div
    className='absolute-0 grid-center h-full pl-1.5 font-serif duration-400 starting:translate-y-full starting:opacity-0'
    style={{fontSize: 'calc(60cqh - var(--spacing))'}}>
    <div className='size-fit'>[&nbsp;]</div>
  </div>
)

export const useConstraints = (): UseConstraints => {
  const code = useAppSelector(selectComputedCode)
  const digitCount = code.length
  const maxDigit = Codec.Prufer.computeNodeCount(code)
  const topWidthPx = useAppSelector(selectTopWidthPx)

  const requiredWidthPx = digitCount * inputGapWidthPx
  const availableWidthPx = topWidthPx - 2 * parentPadPx
  const isOverflow = requiredWidthPx >= availableWidthPx
  const noOverflow = !isOverflow || digitCount === 0

  const {ref, elementRef, scrollPx, isScrolling} = useHorizontalScroll()

  const scrollTo = useCallback(
    (ratio: number) => {
      const element = elementRef.current
      if (element === null || noOverflow) return
      const scrollLeftPx = ratio * (requiredWidthPx - availableWidthPx)
      element.scrollTo({left: scrollLeftPx, behavior: 'smooth'})
    },
    [elementRef, noOverflow, requiredWidthPx, availableWidthPx],
  )

  const scrollToEndOnBoot = useEffectEvent(() => {
    scrollTo(1)
  })

  useLayoutEffect(() => {
    scrollToEndOnBoot()
  }, [])

  const offsetPx = noOverflow ? 0 : -1 * (scrollPx % inputGapWidthPx)
  const topStyle = useMemo(
    () => ({
      ...setVar('is-scrolling', noOverflow ? 'false' : isScrolling.toString()),
      transform: `translateX(${px(offsetPx)})`,
      contain: 'size layout style',
    }),
    [isScrolling, noOverflow, offsetPx],
  )

  const result = {
    code,
    digitCount,
    digitStyle,
    elementRef,
    gapPx,
    inputWidthPx,
    isScrolling,
    maxDigit,
    noCode,
    offsetPx,
    parentStyle,
    ref,
    requiredWidthPx,
    topStyle,
  }

  if (noOverflow) {
    return {
      ...result,
      firstVisible: 0,
      lastVisible: undefined,
      scrollTo,
      visibleCountRem: 0,
      visibleIndexes: digitCount === 0 ? [] : Array.range(0, code.length - 1),
    }
  }

  const scrollLeftInput = scrollPx / inputGapWidthPx
  const firstVisible = Math.floor(scrollLeftInput)
  const visibleCountFloat = availableWidthPx / inputGapWidthPx
  const visibleCountCeil = Math.ceil(visibleCountFloat)
  const lastVisibleCeil = Math.min(
    digitCount - 1,
    firstVisible + visibleCountCeil + 1,
  )
  const visibleIndexes: number[] = Array.range(firstVisible, lastVisibleCeil)

  const visibleCountFloor = Math.round(visibleCountFloat)
  const lastVisible = firstVisible + visibleCountFloor - 1
  const visibleCountRem = inputWidthPx * (visibleCountFloat - visibleCountFloor)

  return {
    ...result,
    visibleIndexes,
    scrollTo,
    firstVisible,
    lastVisible,
    visibleCountRem,
  }
}
