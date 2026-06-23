import {selectCode, useAppSelector} from '#store'
import {useHorizontalScroll} from '#useHorizontalScroll'
import {Codec} from 'effect-tree'
import {DigitEditor} from './DigitEditor'

export const CodeEditor = () => {
  const code = useAppSelector(selectCode)
  const ref = useHorizontalScroll()
  const maxDigit = Codec.Prufer.computeNodeCount(code)

  return (
    <div className='border-b-1.5 relative mx-px box-content h-12 overflow-hidden rounded-sm border inset-xy contain-strict'>
      <div
        {...{ref}}
        className='scrollable-x flex h-12 items-center-safe gap-1 bg-darker inner-shadow select-none'>
        {code.length === 0 ? (
          <div className='px-1 pt-1 font-serif'>[&nbsp;]</div>
        ) : (
          code.map((digit, index) => (
            <DigitEditor
              key={index}
              {...{digit, index, maxDigit}}
              codeLength={code.length}
            />
          ))
        )}
      </div>
    </div>
  )
}
