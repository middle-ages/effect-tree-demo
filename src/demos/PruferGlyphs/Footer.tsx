import {Numeric} from '#Numeric'
import {twMerge} from 'tailwind-merge'
import {Link} from '#Link'

interface Props {
  code: number[]
}

export const Footer = ({code}: Props) => {
  const isFirstTree = code.length === 0

  return (
    <div
      className={`
        flex flex-col h-fill pt-1
        *:dom-play dom-play set-bg-light z-1`}>
      <Link.PruferPaper />
      <div className="shrink-0 grow-0 h-11 px-2">
        <div
          style={{scrollbarWidth: 'thin'}}
          className={twMerge(
            'h-full pt-1 pb-0.5 flex gap-1 items-center justify-center-safe rounded-lg',
            !isFirstTree && 'scrollable-x',
          )}>
          {code.length === 0 ? (
            <div className="font-serif text-xl">[ ]</div>
          ) : (
            code.map((code, i) => (
              <Numeric
                className="shrink-0 bottom-0"
                key={`key-${i.toString()}`}
                value={code}
                maxWidthPx={51}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
