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
      className={`flex flex-col *:dom-play dom-play
                     set-bg-dark rounded-md`}>
      <Link.PruferPaper />
      <div className="no-flex h-11">
        <div
          style={{scrollbarWidth: 'thin'}}
          className={twMerge(
            'h-full rounded-[9px]',
            'flex gap-1 place-items-center-safe place-content-center-safe',
            !isFirstTree && 'scrollable-x',
          )}>
          {code.length === 0 ? (
            <div className="font-serif text-xl">[ ]</div>
          ) : (
            code.map((code, i) => (
              <Numeric
                className="no-flex"
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
