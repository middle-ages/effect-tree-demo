import {Numeric} from '#components'
import {twMerge} from 'tailwind-merge'
import {px, type StyledPropsWithChildren} from '#util'
import {type Stats} from './stats'

interface Props {
  stats: Stats
  maxWidthPx?: number
}

export const StatsView = ({
  stats: {treeIndex, treeCount, nodeCount},
  maxWidthPx,
}: Props) => {
  const index = treeIndex.value
  return (
    <>
      <div
        className={`
          flex flex-col p-2
          text-[var(--controlFg)]
          *:whitespace-nowrap *:overflow-hidden *:h-7
      `}>
        <div>
          {index === 1n ? (
            <Text>The</Text>
          ) : (
            <Text className="pr-px" suffix="">
              Tree #
            </Text>
          )}
          <Numeric
            {...{maxWidthPx}}
            {...(index === 1n && {width: px(72)})}
            value={index === 1n ? 'first tree' : index}
          />
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
}

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
