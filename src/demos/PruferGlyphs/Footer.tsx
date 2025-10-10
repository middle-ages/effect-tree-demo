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
        flex flex-col place-items-center pt-1
        *:dom-play dom-play overflow-hidden set-bg-light z-1`}>
      <a
        href={paper}
        target="_blank"
        title="“Prüfer Encoding and a Proof of Cayley's Tree Formula”"
        className={`inline-block w-fit mb-1 h-[23px]
                    truncate mx-auto rounded px-1
        `}>
        Prüfer Code
        <span className="inline-block text-3xl leading-2 pl-1 translate-y-1">
          ☞
        </span>
      </a>
      <div
        className={`mb-1.5 mt-0.5 h-[calc(7_*_var(--spacing)_+_15px+_4px)]
                    *:*:mb-2 max-w-full`}>
        <div
          className={twMerge(
            'flex gap-1.5 dom-play *:shrink-0 overflow-y-hidden',
            !isFirstTree && 'overflow-x-auto',
          )}>
          {code.length !== 0 &&
            code.map((code, i) => (
              <Numeric
                className="text-2xl form-row-h"
                key={code ** 2 * i}
                value={code}
                maxWidthPx={72}
                fontSizePx={24}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
