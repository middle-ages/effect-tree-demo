import {map, type NonEmptyArray} from '#Array'
import {pipe} from '#Function'
import {type StyledProps} from '#react/props'
import * as Record from '#Record'
import {type ReactNode} from 'react'
import {twMerge} from 'tailwind-merge'

interface Props<Names extends NonEmptyArray<string>> extends StyledProps {
  top: Names[number]
  subNodes: Record<Names[number], ReactNode>
}

export const Stack = <Names extends NonEmptyArray<string>>({
  top,
  subNodes,
  className,
  ...props
}: Props<Names>) => (
  <div {...props} className={twMerge('relative', className)}>
    {pipe(
      subNodes,
      Record.toEntries,
      map(([name, node]) => (
        <div
          key={name}
          className={twMerge(
            'dom-play *:h-full',
            name !== top && 'absolute-0 opacity-0',
          )}>
          {node}
        </div>
      )),
    )}
  </div>
)
