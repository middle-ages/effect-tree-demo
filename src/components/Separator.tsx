import {setVars, type StyledProps} from '#util'
import {twMerge} from 'tailwind-merge'
import {square} from '#Pair'

interface Props extends StyledProps {
  spacing: number | [top: number, bottom: number]
}

export const Separator = ({spacing, className, style}: Props) => {
  const [top, bottom] = spacing instanceof Array ? spacing : square(spacing)
  return (
    <div
      className={twMerge(
        'w-full px-1',
        'pt-[calc(var(--top)*var(--spacing))]',
        'pb-[calc(var(--bottom)*var(--spacing))]',
        className,
      )}
      style={{...setVars({top, bottom}), ...style}}>
      <div className="border-color-inset border-[1.5px] opacity-50" />
    </div>
  )
}
