import type {StyledPropsWithChildren} from '#util'
import {twMerge} from 'tailwind-merge'

interface Props extends StyledPropsWithChildren {
  isResize?: boolean | undefined
  isStriped?: boolean | undefined
  isPadded?: boolean | undefined
}

const striped = {
  backgroundImage: `repeating-linear-gradient(
    -45deg, #dd0 0,
    #bb0 0.3rem,
    #555 0.3rem,
    #666 0.6rem)`,
}

export const StoryFrame = ({
  isResize = true,
  isStriped = true,
  isPadded = true,
  className,
  style,
  children,
}: Props) => (
  <div
    className={twMerge(
      'relative overflow-hidden',
      isResize && 'resize',
      isPadded && 'm-1.5 p-0.5',
      className,
    )}
    style={{...(isStriped && striped), ...style}}>
    {children}
  </div>
)
