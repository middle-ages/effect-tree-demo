import {px} from '#Css'
import {twMerge} from 'tailwind-merge'
import {DigitEditor} from './DigitEditor'
import {type UseConstraints} from './useConstraints'

const scrollableClass = twMerge(
  'scrollable-x relative box-content h-10.5 dom-play',
  'bg-dark select-none',
  'rounded-t-[9px] rounded-b-xs',
  'border-[1.5px] border-b-fg-control-disabled/20',
  'inset-xy-dimmer group-hover:inset-xy',
  'before:-translate-x-0.5 after:translate-x-0.5',
  'contain-strict',
)

export const CodeEditor = ({
  digitCount,
  digitStyle,
  isScrolling,
  maxDigit,
  noCode,
  parentStyle,
  ref,
  requiredWidthPx,
  topStyle,
  visibleIndexes,
}: UseConstraints) => {
  return (
    <div {...{ref}} className={scrollableClass} style={parentStyle}>
      {visibleIndexes.length === 0 ? (
        noCode
      ) : (
        <>
          <Strut {...{requiredWidthPx}} />
          <div
            className='sticky left-0 flex h-full -translate-y-full items-center will-change-transform'
            style={topStyle}>
            {visibleIndexes.map(digitIndex => {
              const name = `digit-${digitIndex.toFixed()}`
              return (
                <DigitEditor
                  key={name}
                  {...{maxDigit, name, digitCount}}
                  index={digitIndex}
                  className={twMerge(
                    !isScrolling &&
                      'duration-400 starting:translate-y-full starting:opacity-0',
                  )}
                  style={digitStyle}
                />
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

const Strut = ({requiredWidthPx}: {requiredWidthPx: number}) => (
  <div
    className='h-0 will-change-scroll'
    style={{width: px(requiredWidthPx)}}
  />
)
