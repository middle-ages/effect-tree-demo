import {Numeric} from '#components'
import {type StyledPropsWithChildren} from '#util'
import {twMerge} from 'tailwind-merge'
import {type Stats} from './stats'
import type {PropsWithChildren} from 'react'

interface Props {
  stats: Stats
  maxWidthPx?: number
}

export const StatsView = ({
  stats: {treeIndex, treeCount, nodeCount},
  maxWidthPx,
}: Props) => {
  return (
    <>
      <div className="flex flex-col p-1 text-[var(--controlFg)]">
        <Row>
          <Text className="pr-px" suffix="">
            Tree #
          </Text>
          <Numeric {...{maxWidthPx}} value={treeIndex.value} />
        </Row>

        <Row>
          <Text>out of all</Text>
          <Numeric {...{maxWidthPx}} value={treeCount.value} />
        </Row>

        <Row>
          <Text>possible</Text>
          <Numeric {...{maxWidthPx}} value={nodeCount.value} />
          <Text>node</Text>
        </Row>

        <Row>
          <Text className="leading-9">vertex labeled trees.</Text>
        </Row>
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

const Row = ({children}: PropsWithChildren) => (
  <div
    className={`
          whitespace-nowrap overflow-hidden h-7
          transition *:transition
      `}>
    {children}
  </div>
)
