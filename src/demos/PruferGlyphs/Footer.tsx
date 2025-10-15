import {Numeric} from '#components'
import {twMerge} from 'tailwind-merge'

interface Props {
  code: number[]
}

const paper =
  'https://www.math.nagoya-u.ac.jp/~richard/teaching/s2024/SML_Tue_Tai_1.pdf'

export const Footer = ({code}: Props) => {
  const isFirstTree = code.length === 0

  return (
    <div
      className={`
        flex flex-col h-fill pt-1
        *:dom-play dom-play set-bg-light z-1`}>
      <a
        href={paper}
        target="_blank"
        title="“Prüfer Encoding and a Proof of Cayley's Tree Formula”"
        className={`inline-block w-fit h-[22px]
                    truncate mx-auto rounded px-1
        `}>
        Prüfer Code
        <span className="inline-block text-3xl leading-2 pl-1 translate-y-1">
          ☞
        </span>
      </a>
      <div className="shrink-0 grow-0 h-11 px-2">
        <div
          style={{scrollbarWidth: 'thin'}}
          className={twMerge(
            'flex gap-1.5 items-center dom-play h-full justify-center-safe',
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
