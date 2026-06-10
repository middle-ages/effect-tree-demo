import {BigIntInput} from '#BigIntInput'
import {FixedNumeric} from '#FixedNumeric'
import {NumericView} from '#NumericView'
import {Stack} from '#Stack'
import {MAX_NODE_COUNT, type PrimedStat} from '#tree'
import {type Dispatcher, type StyledPropsWithChildren} from '#util'
import {useMemo, type ReactNode} from 'react'
import {twMerge} from 'tailwind-merge'
import {buildSetNodeCount, buildSetTreeIndex} from '../hooks/actions'

interface Props
  extends Record<'treeIndex' | 'treeCount' | 'nodeCount', PrimedStat> {
  setCode: Dispatcher<number[]>
}

const rowHeight = 'h-row-small'
const rowLineHeight = 'leading-row-small'

export const StatsView = ({
  treeIndex,
  treeCount,
  nodeCount,
  setCode,
}: Props) => {
  const isFirst = treeCount.value === '1'

  const [setNodeCount, setTreeIndex] = useMemo(
    () => [buildSetNodeCount(setCode), buildSetTreeIndex(setCode)],
    [setCode],
  )

  return (
    <>
      <Row prefix="Tree #">
        <BigIntInput
          value={treeIndex.value}
          onChange={setTreeIndex}
          min={'1'}
          max={treeCount.value}
          title={`Index in ordered set of all trees at this node count: i=${treeIndex.value.toLocaleString()}`}
          spacingLeft={0.5}
          spacingRight={0.5}
          maximized
        />
      </Row>
      <Stack
        className={twMerge('relative *:first:absolute-0', rowHeight)}
        top={isFirst ? 'single' : 'many'}
        children={{
          single: singleRow,
          many: (
            <Row prefix="out of all" className="overflow-hidden">
              <NumericView
                value={treeCount.value}
                title={`Number of trees at this node count: nⁿ⁻² = `}
              />
            </Row>
          ),
        }}
      />

      <div
        className={twMerge(
          'flex items-baseline whitespace-nowrap',
          rowHeight,
          rowLineHeight,
        )}>
        possible
        <FixedNumeric
          digits={3}
          value={Number(nodeCount.value)}
          min={2}
          max={MAX_NODE_COUNT}
          title="Number of nodes in the tree."
          onChange={setNodeCount}
          className="mx-1"
        />
        {`node labeled tree${isFirst ? '' : 's'}.`}
      </div>
    </>
  )
}

const Row = ({
  children,
  className,
  style,
  prefix,
}: StyledPropsWithChildren & {prefix: ReactNode}) => (
  <div
    className={twMerge(
      'flex gap-1 items-baseline whitespace-nowrap',
      rowHeight,
    )}
    {...{style}}>
    <div className={rowLineHeight}>{prefix}</div>
    <div className={twMerge('flex-1', className)}>{children}</div>
  </div>
)

const singleRow = (
  <Row prefix={<div className="absolute-0">of the single</div>} />
)
