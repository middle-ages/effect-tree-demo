import {ms, setVar} from '#Css'
import {HRule} from '#HRule'
import type {StyledProps} from '#react/props'
import {useRotate} from '#useRotate'
import type {FC, ReactNode} from 'react'
import {twMerge} from 'tailwind-merge'

interface Props extends StyledProps {
  label: ReactNode
  heightClass: string
  Content: FC<{isOpen: boolean}>
}

export const Details = ({label, heightClass, Content, ...props}: Props) => {
  const {transform, increment: onClick, isOdd: isOpen} = useRotate(-90)
  return (
    <>
      <FlatButton {...{label, transform, onClick, ...props}} />
      <div
        style={setVar('transition-duration', ms(150))}
        className={twMerge(
          'max-h-29 overflow-hidden dom-play *:dom-play',
          !isOpen && 'max-h-0',
          heightClass,
        )}>
        <Content {...{isOpen}} />
      </div>
    </>
  )
}

const Rule = ({className = 'w-3'}: {className?: string}) => (
  <div className={twMerge('mt-px flex-none', className)}>{HRule}</div>
)

const FlatButton = ({
  label,
  transform,
  onClick,
  ...props
}: StyledProps & {
  label: ReactNode
  transform: string
  onClick: () => void
}) => (
  <button
    {...{...props, onClick}}
    tabIndex={-1}
    className='group button-flat my-0.5'>
    <Rule />
    <div
      className='size-4 flex-none self-center rounded-full text-small leading-5.5 font-bold text-inset'
      style={{transform}}>
      ⌃
    </div>
    <Rule className='w-2' />
    <div className='mr-[0.5px] -ml-0.5 h-5 w-fit flex-none text-smaller leading-4.25 tracking-wide'>
      {label}
    </div>
    <Rule className='w-stretch flex-1' />
  </button>
)
