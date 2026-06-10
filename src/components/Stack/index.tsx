import {map, type NonEmptyArray} from '#Array'
import {Record, pipe, type StyledProps} from '#util'
import {useMemo, type ReactNode} from 'react'
import {twMerge} from 'tailwind-merge'

interface Props<Names extends NonEmptyArray<string>> extends StyledProps {
  top: Names[number]
  subNodes: Record<Names[number], ReactNode>
}

export const Stack = <Names extends NonEmptyArray<string>>({
  top,
  subNodes,
  ...props
}: Props<Names>) => {
  const stacked = useMemo(
    () =>
      pipe(
        subNodes,
        Record.toEntries,
        map(([name, node]) => (
          <div
            key={name}
            className={twMerge(
              'dom-play',
              name === top
                ? '[content-visibility:visible]'
                : 'opacity-0 [content-visibility:hidden]',
            )}>
            {node}
          </div>
        )),
      ),
    [subNodes, top],
  )

  return <div {...props}>{stacked}</div>
}
