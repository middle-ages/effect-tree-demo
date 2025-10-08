import type {StyledPropsWithChildren} from '#util'
import {twMerge} from 'tailwind-merge'

interface Props extends StyledPropsWithChildren {
  isStriped?: boolean | undefined
}

const striped = {
  backgroundImage: `repeating-linear-gradient(
         -45deg, #dd0 0,
         #bb0 0.3rem,
         #555 0.3rem,
         #666 0.6rem)`,
}

export const StoryFrame = ({
  isStriped = true,
  className,
  style,
  children,
}: Props) => {
  return (
    <div
      className={twMerge(
        'relative overflow-hidden resize m-1.5 p-1',
        className,
      )}
      style={{...(isStriped && striped), ...style}}>
      <div className="bg-[var(--bg)] size-full">{children}</div>
    </div>
  )
}
