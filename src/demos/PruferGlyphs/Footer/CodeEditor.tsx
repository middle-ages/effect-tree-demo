import {useScrollbarSize} from '#useScrollbarSize'
import {px} from '#util'
import {Codec} from 'effect-tree'
import {twMerge} from 'tailwind-merge'
import {DigitEditor} from './DigitEditor'
import {useHorizontalScroll} from '#useHorizontalScroll'

interface Props {
  code: number[]
  setDigit: (index: number, digit: number) => void
}

export const CodeEditor = ({code, setDigit: onChange}: Props) => {
  const heightPx = useScrollbarSize(document)
  const ref = useHorizontalScroll()

  return (
    <div className="relative overflow-hidden">
      <div
        className={twMerge(
          'absolute-full rounded-b-sm pointer-events-none bg-control/0',
          'border-[0.5px] border-line-dark',
          'border-t-0',
        )}
        style={{top: `calc(100% - ${px(heightPx)})`, maxHeight: px(heightPx)}}
      />
      <div
        {...{ref}}
        className={`h-[46px] bg-darker rounded-sm flex items-center-safe
                    gap-0.5 *:first:ml-0.5 *:last:mr-0.5 scrollable-x
                    inner-shadow select-none`}>
        {code.length === 0 ? (
          <div className="font-serif px-1 pt-1">[&nbsp;]</div>
        ) : (
          code.map((digit, index) => (
            <DigitEditor
              key={index}
              {...{digit, index, onChange}}
              codeLength={code.length}
              maxDigit={Codec.Prufer.computeNodeCount(code)}
            />
          ))
        )}
      </div>
    </div>
  )
}
