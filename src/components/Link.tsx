import type {StyledPropsWithChildren} from '#util'
import {twMerge} from 'tailwind-merge'

const paper =
  'https://www.math.nagoya-u.ac.jp/~richard/teaching/s2024/SML_Tue_Tai_1.pdf'

interface Props extends StyledPropsWithChildren {
  href: URL
  title: string
}

export const Link = ({children, className, href, ...rest}: Props) => (
  <a
    {...rest}
    href={href.toString()}
    className={twMerge(
      'inline-block w-fit squircle h-5 my-1',
      'text-smaller leading-5 whitespace-nowrap',
      className,
    )}
    target="_blank">
    {children}
  </a>
)

Link.PruferPaper = () => {
  return (
    <Link
      href={new URL(paper)}
      className="px-1"
      title="“Prüfer Encoding and a Proof of Cayley's Tree Formula”">
      Prüfer Code
    </Link>
  )
}
