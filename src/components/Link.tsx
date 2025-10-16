import type {StyledPropsWithChildren} from '#util'
import {twMerge} from 'tailwind-merge'

const paper =
  'https://www.math.nagoya-u.ac.jp/~richard/teaching/s2024/SML_Tue_Tai_1.pdf'

interface Props extends StyledPropsWithChildren {
  href: URL
  title: string
}

export const Link = ({children, className, href, ...rest}: Props) => {
  return (
    <a
      {...{rest}}
      href={href.toString()}
      className={twMerge('inline-block w-fit truncate', className)}
      target="_blank">
      {children}
    </a>
  )
}

Link.PruferPaper = () => {
  return (
    <Link
      href={new URL(paper)}
      title="“Prüfer Encoding and a Proof of Cayley's Tree Formula”"
      className="mx-auto rounded px-1">
      Prüfer Code
      <span className="inline-block text-3xl leading-2 pl-1 translate-y-1">
        ☞
      </span>
    </Link>
  )
}
