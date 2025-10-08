import {Numeric} from '#components'

interface Props {
  code: number[]
}

const paper =
  'https://www.math.nagoya-u.ac.jp/~richard/teaching/s2024/SML_Tue_Tai_1.pdf'

export const Footer = ({code}: Props) => {
  return (
    <div className="flex flex-col w-full justify-center *:text-center h-14">
      <a
        href={paper}
        target="_blank"
        title="“Prüfer Encoding and a Proof of Cayley's Tree Formula”"
        className="inline-block text-sm h-6 leading-6 truncate">
        Prüfer Code
        <span className="inline-block text-3xl leading-3 pl-1 translate-y-1">
          ☞
        </span>
      </a>
      <div className="flex gap-1 mb-1 h-7 mx-auto">
        {code.map((code, i) => (
          <Numeric
            className="text-2xl leading-8 h-7 grow-0 shrink-0"
            key={i}
            value={code}
          />
        ))}
      </div>
    </div>
  )
}
