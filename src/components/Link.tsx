import type {StyledPropsWithChildren} from '#react/props'
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
      'my-1 ml-1 block h-4 w-20 squircle px-1',
      'text-smaller whitespace-nowrap contain-strict',
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
