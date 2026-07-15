import type {StyledProps} from '#react/props'
import {twMerge} from 'tailwind-merge'

const strutClassName = twMerge(
  'grid-center dom-play',
  'text-[11px] text-fg-control-disabled/70',
)

interface ChildProps {
  digitIndex: number | undefined
}

interface Props extends StyledProps, ChildProps {
  offsetPx: number
}

export const DigitIndexView = ({
  offsetPx,
  digitIndex,
  className,
  style,
}: Props) => (
  <div
    className={twMerge('flex w-full *:flex-0', className)}
    style={{
      transform: `translateX(${offsetPx.toFixed(2)}px)`,
      ...style,
    }}>
    <Strut key='first-strut' {...{digitIndex}} />
    <Digit key='first-digit' {...{digitIndex}} />
    <Strut key='middle-strut' {...{digitIndex}} />
    <Digit
      key='last-digit'
      digitIndex={digitIndex === undefined ? undefined : digitIndex + 1}
    />
    <Strut key='last-strut' {...{digitIndex}} />
  </div>
)

const Digit = ({digitIndex}: ChildProps) => (
  <div
    className={twMerge(
      'dom-play',
      digitIndex === undefined ? 'opacity-0' : 'opacity-100',
    )}>
    {digitIndex === undefined ? (
      ''
    ) : (
      <span>{(digitIndex + 1).toString().padStart(3, '0')}</span>
    )}
  </div>
)

const Strut = ({digitIndex}: ChildProps) => (
  <div className={twMerge(strutClassName, 'min-w-3.5 *:leading-3.5')}>
    <div className='pb-0.5 text-center'>{digitIndex !== undefined && '┃'}</div>
  </div>
)
