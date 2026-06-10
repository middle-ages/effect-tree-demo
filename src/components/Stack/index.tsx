import {map, type NonEmptyArray} from '#Array'
import {Record, pipe, type StyledProps} from '#util'
import {useMemo, type ReactNode} from 'react'
import {twMerge} from 'tailwind-merge'

interface Props<Names extends NonEmptyArray<string>> extends StyledProps {
  top: Names[number]
  children: Record<Names[number], ReactNode>
}

export const Stack = <Names extends NonEmptyArray<string>>({
  top,
  children,
  ...props
}: Props<Names>) => {
  const stacked = useMemo(
    () =>
      pipe(
        children,
        Record.toEntries,
        map(([name, node]) => (
          <div
            key={name}
            className={twMerge(
              'dom-play',
              name === top
                ? '[content-visibility:visible]'
                : '[content-visibility:hidden] opacity-0',
            )}>
            {node}
          </div>
        )),
      ),
    [children, top],
  )

  return <div {...props}>{stacked}</div>
}
