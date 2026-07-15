import {BigIntInput} from '#BigIntInput'
import {FixedNumeric} from '#FixedNumeric'
import {flow} from '#Function'
import {MAX_NODE_COUNT} from '#model'
import {NumericView} from '#NumericView'
import {Stack} from '#Stack'
import {
  selectStats,
  setNodeCount,
  setTreeIndex,
  useAppDispatch,
  useAppSelector,
} from '#store'
import {type PropsWithChildren, type ReactNode} from 'react'

const rowCount = 3
const rowHeightSpacing = 7

const rowHeightExpression = `(${rowHeightSpacing.toFixed(2)} * var(--spacing))`
const rowHeight = `calc(${rowHeightExpression})`
const totalHeight = `calc(${rowCount.toString()} * ${rowHeightExpression})`
const rowStyle = {height: rowHeight}

export const StatsView = () => {
  const {treeIndex, treeCount, nodeCount} = useAppSelector(selectStats)
  const isFirst = treeCount === '1'
  const dispatch = useAppDispatch()

  return (
    <div
      className='contain-strict *:first:pr-[1.5px]'
      style={{height: totalHeight}}>
      <Row prefix='Tree #'>
        <BigIntInput
          id='treeIndex'
          value={treeIndex}
          onChange={flow(setTreeIndex, dispatch)}
          min={'1'}
          max={treeCount}
          title={
            <div className='max-w-35'>
              Index in ordered set of all trees at this node count.
            </div>
          }
          className='mr-px origin-left scale-x-100 duration-300 starting:scale-x-0 starting:opacity-0'
        />
      </Row>
      <Stack
        style={rowStyle}
        top={isFirst ? 'single' : 'many'}
        subNodes={{
          single,
          many: (
            <Row prefix={<div className='min-w-16.5'>out of all</div>}>
              <NumericView
                id='treeCount'
                value={treeCount}
                title={
                  <div className='max-w-48'>
                    Number of trees at this node count: <code>nⁿ⁻²</code> where{' '}
                    <code>n</code> is <i>node count</i>.
                  </div>
                }
              />
            </Row>
          ),
        }}
      />

      <div className='flex items-baseline leading-row-small' style={rowStyle}>
        possible
        <FixedNumeric
          id='nodeCount'
          value={Number(nodeCount)}
          min={2}
          max={MAX_NODE_COUNT}
          title={
            <div className='max-w-34'>Node count of the current tree.</div>
          }
          onChange={flow(setNodeCount, dispatch)}
          className='mx-1.5'
        />
        {`node labeled tree${isFirst ? '' : 's'}.`}
      </div>
    </div>
  )
}

const Text = ({prefix}: {prefix: ReactNode}) => (
  <span
    className='inline-block leading-row-small whitespace-nowrap'
    style={rowStyle}>
    {prefix}
  </span>
)

const Row = ({children, prefix}: PropsWithChildren<{prefix: ReactNode}>) => (
  <div className='flex items-baseline gap-1.5 *:last:flex-1' style={rowStyle}>
    <Text {...{prefix}} />
    {children}
  </div>
)

const single = <Row prefix={<div style={rowStyle}>of the single</div>} />
