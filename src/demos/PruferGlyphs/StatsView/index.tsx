import {Numeric} from '#components'
import {type StyledPropsWithChildren} from '#util'
import {twMerge} from 'tailwind-merge'
import {type Stats} from './stats'

interface Props {
  stats: Stats
  maxWidthPx?: number
}

export const StatsView = ({
  stats: {treeIndex, treeCount, nodeCount},
  maxWidthPx,
}: Props) => (
  <>
    <div
      className={`
          flex flex-col p-1
          text-[var(--controlFg)]
          *:whitespace-nowrap *:overflow-hidden *:h-7
          *:transition-all *:*:transition-all transition-all
      `}>
      <div>
        <Text className="pr-px" suffix="">
          Tree #
        </Text>
        <Numeric {...{maxWidthPx}} value={treeIndex.value} />
      </div>

      <div>
        <Text>out of all</Text>
        <Numeric {...{maxWidthPx}} value={treeCount.value} />
      </div>

      <div>
        <Text>possible</Text>
        <Numeric {...{maxWidthPx}} value={nodeCount.value} />
        <Text>node</Text>
      </div>
      <div>
        <Text className="leading-9">vertex labeled trees.</Text>
      </div>
    </div>
  </>
)

const Text = ({
  children,
  className,
  style,
  suffix = ' ',
}: StyledPropsWithChildren & {
  suffix?: string
}) => (
  <>
    {' '}
    <span
      {...{style}}
      className={twMerge('inline-block leading-7 -translate-y-1.5', className)}>
      {children}
    </span>
    {suffix}
  </>
)
