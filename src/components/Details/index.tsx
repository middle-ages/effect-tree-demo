import {HRule} from '#HRule'
import type {StyledPropsWithChildren} from '#react'
import {useRotate} from '#useRotate'
import type {CSSProperties} from 'react'
import {twMerge} from 'tailwind-merge'
//import {useBoolean} from '#useBoolean'

interface Props extends StyledPropsWithChildren {
  label: string
}
export const Details = ({label, children, style, className}: Props) => {
  const {transform, increment: onClick, isOdd: isExpanded} = useRotate(180)

  return (
    <>
      <button
        {...{onClick, style}}
        tabIndex={-1}
        className='button-flat flex max-h-4.75 min-h-4.75 w-full cursor-pointer rounded-sm border-0 focus-none active:border'>
        <Rule />
        <div
          className='mt-px size-6 flex-none rounded-full leading-6 text-fg-control-hover duration-300 text-inset-deep'
          style={
            {
              transform: `translateY(-3px) ${transform} scale(0.65)`,
              background: `linear-gradient(90deg, #d1d1d5, var(--color-dark), #f0f1f3)`,
            } as CSSProperties
          }>
          ❰
        </div>
        <Rule className='mr-0.5 w-2' />
        <div className='h-5 w-fit flex-none text-smaller leading-5 text-fg-control/80'>
          {label}
        </div>
        <Rule className='w-stretch ml-0.5 w-full flex-1' />
      </button>
      <div
        className={twMerge(
          'overflow-hidden dom-play *:dom-play',
          isExpanded ? 'h-fit max-h-15 min-h-15 pt-1.5' : 'h-0',
        )}>
        {children}
      </div>
    </>
  )
}

const Rule = ({className = 'w-1'}: {className?: string}) => (
  <div className={twMerge('mt-1 flex-none', className)}>{HRule}</div>
)
