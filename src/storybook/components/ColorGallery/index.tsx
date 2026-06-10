import {tokens} from '#tokens'
import {Array, identity, Order, pipe, Record, String} from '#util'
import {hsl, srgb} from '@thi.ng/color'
import {useCallback, useMemo, useState} from 'react'
import {twMerge} from 'tailwind-merge'
import {ScrollPanel} from '../ScrollPanel'

interface Entry {
  name: string
  red: string
  green: string
  blue: string
  alpha: string
  bright: string
  color: string
}

const gridClass = `grid grid-cols-[repeat(7,min-content)_1fr]
                   justify-baseline w-[calc(100%+0.5rch)] gap-x-1`

const subgridClass = `grid grid-cols-subgrid col-span-8 not-first:py-0.5
                      h-row-small -ml-1 pr-2 *:leading-row-smaller`

const {light} = tokens
const sortKeys = [
  'name',
  'red',
  'green',
  'blue',
  'alpha',
  'bright',
  'color',
] as const

type SortKey = (typeof sortKeys)[number]
type Direction = 'ascending' | 'descending'

export const ColorGallery = () => {
  const {flipDirection, direction, handlers, sortBy, sorted} = useSorted()

  return (
    <ScrollPanel
      header="Color Palette"
      className="*:last:*:first:px-1 *:last:before:top-row-small">
      <div className={gridClass}>
        <div
          className={twMerge(
            'sticky top-0 text-fg-control *:text-center',
            'z-1 text-sm bg-[#dcdade]',
            'h-row-small bg-border-right pt-1',
            subgridClass,
          )}>
          <div />
          {sortKeys.map(name => (
            <HeaderCell
              key={name}
              {...{name, direction, sortBy, flipDirection, handlers}}
            />
          ))}
        </div>
        {sorted.map(({name, red, green, blue, bright, alpha, color}, i) => {
          return (
            <div
              key={name}
              className={twMerge(
                'text-ink size-full pl-1 bg-input-active',
                subgridClass,
              )}>
              <div className="text-ordinal text-right translate-y-px">
                {(i + 1).toString() + '.'}
              </div>
              <div className="ml-1" title={color}>
                {name}
              </div>
              <ColorCell value={red} />
              <ColorCell value={green} />
              <ColorCell value={blue} />
              <ColorCell value={alpha} />
              <ColorCell value={bright} />
              <div
                className={`h-row-smaller p-1 ml-2
                            inner-shadow rounded w-[calc(100%-1rch)]`}>
                <div
                  style={{background: color}}
                  className="size-full rounded-xs"
                />
              </div>
            </div>
          )
        })}
      </div>
    </ScrollPanel>
  )
}

const ColorCell = ({value}: {value: string}) => (
  <div className="font-mono text-center text-fg-control text-sm leading-row p-0 m-0">
    {value.toUpperCase()}
  </div>
)

const useSorted = (): {
  sortBy: SortKey
  direction: Direction
  sorted: Entry[]
  handlers: Record<SortKey, () => void>
  flipDirection: () => void
} => {
  const [sortBy, setSortBy] = useState<SortKey>('bright')
  const [direction, setDirection] = useState<Direction>('descending')

  const flipDirection = useCallback(() => {
    setDirection(old => (old === 'ascending' ? 'descending' : 'ascending'))
  }, [])

  const handlers = useMemo(() => {
    const click = (key: SortKey) =>
      key === sortBy
        ? flipDirection
        : () => {
            setSortBy(key)
            setDirection('ascending')
          }

    return pipe(
      sortKeys,
      Array.map(key => [key, click(key)] as const),
      Record.fromEntries,
    ) as Record<SortKey, () => void>
  }, [flipDirection, sortBy])

  const entries = pipe(
    light,
    Record.toEntries,
    Array.map(([name, color]) => {
      const alpha = color.slice(7, 9)
      const l = hsl(srgb(color))[2]
      return {
        name,
        red: color.slice(1, 3),
        green: color.slice(3, 5),
        blue: color.slice(5, 7),
        alpha: alpha === '' ? 'FF' : alpha,
        bright: (l ?? 0).toFixed(2),
        color,
      }
    }),
  )

  const order: Order.Order<Entry> = pipe(
    String.Order,
    Order.mapInput((entry: Entry): string => entry[sortBy]),
    direction === 'ascending' ? identity : Order.reverse,
  )

  const sorted = pipe(entries, Array.sort(order))

  return {sortBy, direction, handlers, sorted, flipDirection}
}

const Chevron = ({
  direction,
  sortKey,
  sortBy,
  onClick,
}: {
  direction: Direction
  sortBy: SortKey
  sortKey: SortKey
  onClick: () => void
}) => (
  <button
    disabled={sortKey !== sortBy}
    {...(sortKey === sortBy && {onClick})}
    className={`button block h-row-smallest border-0 relative
                *:text-shadow-fg-control-disabled
                enabled:hover:*:text-light enabled:hover:*:bg-fg-control-hover
                text-shadow-none rounded-none pl-1 pr-1.5`}>
    <div
      className={twMerge(
        'block chevron-down leading-2.5 origin-center box-content',
        'bg-border-right rounded-full size-2.5 border border-line-darkest',
        sortKey === sortBy ? 'cursor-pointer' : 'opacity-40',
        direction === 'descending' &&
          sortKey === sortBy &&
          'chevron-up origin-center',
      )}>
      ❯
    </div>
  </button>
)

const HeaderCell = ({
  name,
  direction,
  sortBy,
  flipDirection,
  handlers,
}: {
  name: SortKey
  direction: Direction
  sortBy: SortKey
  handlers: Record<SortKey, () => void>
  flipDirection: () => void
}) => (
  <div className="flex w-full place-content-center-safe &:hover:text-ink">
    <button
      onClick={handlers[name]}
      className="button cursor-pointer text-smallest h-row-smallest flex-1 border-0 rounded-none focus:z-1 px-2.5">
      {String.toUpperCaseFirst(name)}
    </button>
    <div className="w-fit *:m-auto">
      <Chevron
        {...{direction, sortBy}}
        sortKey={name}
        onClick={flipDirection}
      />
    </div>
  </div>
)
