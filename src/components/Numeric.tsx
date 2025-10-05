import {twMerge} from 'tailwind-merge'
import type {StyledProps} from '../util.js'

interface Props extends StyledProps {
  value: number
}

export const Numeric = ({value, className, style}: Props) => {
  const [isBig, formatted] = big(value)
  const title = isBig ? value.toLocaleString() : ''
  return (
    <>
      <span
        className={twMerge('numeric', className)}
        {...{title}}
        style={{
          width: `calc(${(formatted.length + 1).toFixed(0)}ch + 2 * 2px + 2 * 1.5px)`,
          ...style,
        }}>
        {formatted}
      </span>{' '}
    </>
  )
}

const big = (value: number): [isBig: boolean, formatted: string] =>
  value >= Math.pow(10, 7)
    ? [true, value.toExponential()]
    : [false, value.toLocaleString()]
