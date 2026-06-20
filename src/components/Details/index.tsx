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
      <div className={twMerge('relative', className)}>
        <button
          {...{onClick, style}}
          tabIndex={-1}
          className='button-flat flex h-4 w-full cursor-pointer rounded-sm border-0 px-px focus-none active:border'>
          <Rule />
          <div
            className='size-6 flex-none -translate-y-1 rounded-full leading-6 text-fg-control-hover duration-300 text-inset-deep'
            style={
              {
                transform: `${transform} scale(0.65)`,
                background: `linear-gradient(90deg, #d1d1d5, var(--color-dark), #f0f1f3)`,
              } as CSSProperties
            }>
            ❰
          </div>
          <Rule className='w-1' />
          <div className='-mt-0.5 w-fit flex-none px-0.5 text-smaller text-fg-control/80'>
            {label}
          </div>
          <Rule className='w-stretch mt-0.5 mr-0.5 w-full flex-1' />
        </button>
      </div>
      <div
        className={twMerge(
          'overflow-hidden dom-play *:dom-play',
          isExpanded ? 'h-fit' : 'h-0',
        )}>
        <div className='pt-1'>{children}</div>
      </div>
    </>
  )
}

const Rule = ({className = 'w-1'}: {className?: string}) => (
  <div className={twMerge('flex-none', className)}>{HRule}</div>
)
