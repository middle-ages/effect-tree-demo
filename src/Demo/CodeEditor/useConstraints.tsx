import * as Array from '#Array'
import {px, setVar} from '#Css'
import {type LazyArg} from '#Function'
import {computeWidthPx} from '#measure'
import {selectComputedCode, selectTopWidthPx, useAppSelector} from '#store'
import {useHorizontalScroll} from '#useHorizontalScroll'
import {Codec} from 'effect-tree'
import type {CSSProperties, ReactNode, RefCallback} from 'react'

interface UseConstraints {
  code: number[]
  isScrolling: boolean
  requiredWidthPx: number
  maxDigit: number
  visibleIndexes: number[]
  parentStyle: CSSProperties
  topStyle: CSSProperties
  digitStyle: CSSProperties
  noCode: ReactNode
  ref: RefCallback<HTMLElement>
}

const [parentPadLeftPx, parentPadRightPx] = [3, 2]
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

export const useConstraints: LazyArg<UseConstraints> = () => {
  const code = useAppSelector(selectComputedCode)
  const maxDigit = Codec.Prufer.computeNodeCount(code)
  const topWidthPx = useAppSelector(selectTopWidthPx)
  const {ref, scrollPx, isScrolling} = useHorizontalScroll()

  const requiredWidthPx = code.length * inputGapWidthPx
  const availableWidthPx = topWidthPx - 2 * parentPadPx
  const isOverflow = requiredWidthPx >= availableWidthPx

  const result = {
    code,
    isScrolling,
    requiredWidthPx,
    maxDigit,
    noCode,
    parentStyle,
    digitStyle,
  }

  if (!isOverflow || code.length === 0) {
    return {
      ...result,
      visibleIndexes: code.length === 0 ? [] : Array.range(0, code.length - 1),
      topStyle: setVar('is-scrolling', 'false'),
      ref,
    }
  }

  const scrollLeftInput = scrollPx / inputGapWidthPx
  const offsetPx = -1 * (scrollPx % inputGapWidthPx)
  const firstVisible = Math.floor(scrollLeftInput)
  const visibleCount = Math.ceil(availableWidthPx / inputGapWidthPx)
  const lastVisible = Math.min(code.length - 1, firstVisible + visibleCount + 1)
  const visibleIndexes: number[] = Array.range(firstVisible, lastVisible)

  return {
    ...result,
    visibleIndexes,
    topStyle: {
      ...setVar('is-scrolling', isScrolling.toString()),
      transform: `translateX(${px(offsetPx)})`,
      contain: 'size layout style',
    },
    ref,
  }
}
