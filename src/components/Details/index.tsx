import {HRule} from '#HRule'
import type {StyledPropsWithChildren} from '#react'
import {useRotate} from '#useRotate'
import type {CSSProperties} from 'react'
import {twMerge} from 'tailwind-merge'
//import {useBoolean} from '#useBoolean'

interface Props extends StyledPropsWithChildren {
  label: string
}
export const Details = ({label, children, ...props}: Props) => {
  const {transform, increment: onClick, isOdd: isExpanded} = useRotate(180)

  return (
    <>
      <button
        {...{...props, onClick}}
        tabIndex={-1}
        className='button-flat mx-auto flex max-h-4.75 min-h-4.75 w-[calc(100%-var(--spacing)/2)] rounded-sm focus-none contain-strict'>
        <Rule />
        <div
          className='size-6 flex-none rounded-full leading-6 duration-300 text-inset-deep'
          style={
            {
              transform: `translateY(-2.75px) ${transform} scale(0.65)`,
              background: `linear-gradient(90deg, #d1d1d5, var(--color-dark), #f0f1f3)`,
            } as CSSProperties
          }>
          ❰
        </div>
        <Rule className='mr-0.5 w-2' />
        <div className='h-5 w-fit flex-none text-smaller leading-4.25 text-fg-control/80'>
          {label}
        </div>
        <Rule className='w-stretch ml-0.5 w-full flex-1' />
      </button>
      <div
        className={twMerge(
          'overflow-hidden dom-play *:dom-play',
          !isExpanded && 'h-0 scale-y-0',
        )}>
        {children}
      </div>
    </>
  )
}

const Rule = ({className = 'w-1'}: {className?: string}) => (
  <div className={twMerge('mt-0.5 flex-none', className)}>{HRule}</div>
)
