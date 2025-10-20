import {Numeric} from '#Numeric'
import {twMerge} from 'tailwind-merge'
import {Link} from '#Link'

interface Props {
  code: number[]
}

export const Footer = ({code}: Props) => {
  const isFirstTree = code.length === 0

  return (
    <>
      <Link.PruferPaper />
      <div className="mx-2 no-flex h-11">
        <div
          className={twMerge(
            'h-full rounded-md set-bg-darker inner-shadow',
            'gap-1 flex place-items-center-safe place-content-center-safe',
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
                maxWidthPx={4 * 10}
              />
            ))
          )}
        </div>
      </div>
    </>
  )
}
