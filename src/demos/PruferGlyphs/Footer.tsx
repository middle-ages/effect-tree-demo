import {Numeric} from '#components'

interface Props {
  code: number[]
}

const paper =
  'https://www.math.nagoya-u.ac.jp/~richard/teaching/s2024/SML_Tue_Tai_1.pdf'

export const Footer = ({code}: Props) => {
  return (
    <div
      className={`
        flex flex-col w-full justify-center *:text-center h-16
        *:transition transition overflow-hidden`}>
      <a
        href={paper}
        target="_blank"
        title="“Prüfer Encoding and a Proof of Cayley's Tree Formula”"
        className="inline-block w-fit text-sm h-6 leading-5 truncate mx-auto">
        Prüfer Code
        <span className="inline-block text-3xl leading-2 pl-1 translate-y-1">
          ☞
        </span>
      </a>
      <div className="flex gap-1 mb-2 h-7 mx-auto transition">
        {code.map((code, i) => (
          <Numeric
            className="text-2xl leading-8 h-7 shrink-0"
            key={i}
            value={code}
            maxWidthPx={60}
            sizeFactor={1.5}
          />
        ))}
      </div>
    </div>
  )
}
