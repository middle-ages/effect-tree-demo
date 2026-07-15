import type {StyledProps} from '#react/props'
import {twMerge} from 'tailwind-merge'

const paper =
  'https://www.math.nagoya-u.ac.jp/~richard/teaching/s2024/SML_Tue_Tai_1.pdf'

const tabClassName = twMerge(
  'relative z-1 flex-0 focus-within:z-4',
  'mx-auto h-6 max-h-6 w-fit mt-px',
  'px-0.75 pt-0.75',
  'bg-dark dom-play',
  'border-[1.5px] rounded-t-md',
  'inset-xy-dimmer group-hover:inset-xy',
  'border-b-0 focus-within:rounded-t-[5px] focus-within:-z-1',
)

const strutClassName = twMerge('w-full flex-1 relative dom-play')

const innerStrut = (
  <>
    <div className='absolute bottom-0 z-2 size-4 bg-dark' />
    <div
      className={twMerge(
        'absolute bottom-0 size-4 bg-app',
        'z-3 outset-xy-dimmer group-hover:outset-xy',
        'border-b-[1.5px]',
        'duration-400',
      )}
    />
  </>
)

const strutLeft = (
  <div
    className={twMerge(
      strutClassName,
      '*:first:right-[-1.25px] *:last:right-[-1.25px] *:last:rounded-br-md *:last:border-r-[1.5px]',
    )}>
    {innerStrut}
  </div>
)

const strutRight = (
  <div
    className={twMerge(
      strutClassName,
      '*:first:left-[-1.25px] *:last:left-[-1.25px] *:last:rounded-bl-md *:last:border-l-[1.5px]',
    )}>
    {innerStrut}
  </div>
)

export const Link = ({className, style}: StyledProps) => (
  <div className='relative z-1 -mt-1.25 flex h-7.5 max-h-7.5 w-full translate-y-[1.5px] pt-1.25 text-center'>
    {strutLeft}
    <div className={tabClassName}>
      <a
        {...{style}}
        title="“Prüfer Encoding and a Proof of Cayley's Tree Formula”"
        href={new URL(paper).toString()}
        rel='noreferrer'
        className={twMerge(
          'relative z-100 h-4.5 w-fit squircle px-1.25 font-medium',
          'text-sm leading-4.5 whitespace-nowrap text-inset-shallow',
          'overflow-hidden tracking-wide',
          className,
        )}
        target='_blank'>
        Prüfer Code
      </a>
    </div>
    {strutRight}
  </div>
)
