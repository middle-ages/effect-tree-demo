import {Numeric} from '#components'

interface Props {
  code: number[]
}

export const Footer = ({code}: Props) => {
  return (
    <div className="max-h-20 text-center overflow-hidden">
      <a
        target="_blank"
        title="“Prüfer Encoding and a Proof of Cayley's Tree Formula”"
        href="https://www.math.nagoya-u.ac.jp/~richard/teaching/s2024/SML_Tue_Tai_1.pdf"
        className="leading-6 h-6 text-sm">
        Prüfer Code{' '}
        <span className="inline-block text-3xl leading-0 translate-y-1">☞</span>
      </a>
      <h1 className="mb-1 h-14 *:leading-10 *:h-11">
        {code.map((code, i) => (
          <Numeric key={i} value={code} />
        ))}
      </h1>
    </div>
  )
}
