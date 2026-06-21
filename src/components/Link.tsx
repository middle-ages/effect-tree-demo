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
    rel='noreferrer'
    className={twMerge(
      'my-0.75 ml-0.5 block h-4.5 w-fit squircle px-1',
      'text-smaller leading-4.5 whitespace-nowrap',
      className,
    )}
    target='_blank'>
    {children}
  </a>
)

Link.PruferPaper = () => {
  return (
    <Link
      href={new URL(paper)}
      title="“Prüfer Encoding and a Proof of Cayley's Tree Formula”">
      Prüfer Code
    </Link>
  )
}
