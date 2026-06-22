import {BigIntInput} from '#BigIntInput'
import {FixedNumeric} from '#FixedNumeric'
import {NumericView} from '#NumericView'
import {Stack} from '#Stack'
import {flow, type StyledPropsWithChildren} from '#util'
import {type ReactNode} from 'react'
import {twMerge} from 'tailwind-merge'
import {
  setNodeCount,
  setTreeIndex,
  selectStats,
  useAppDispatch,
  useAppSelector,
  selectLeftWidthPx,
} from '#store'
import {unlines} from '#String'
import {MAX_NODE_COUNT} from '#model'

export const StatsView = () => {
  const {
    treeCount: {value: treeCount},
    treeIndex: {value: treeIndex},
    nodeCount: {value: nodeCount},
  } = useAppSelector(selectStats)
  const isFirst = treeCount === '1'
  const dispatch = useAppDispatch()

  const leftWidthPx = useAppSelector(selectLeftWidthPx)
  console.log(leftWidthPx)

  return (
    <div className='content-strict flex flex-col *:h-row-small *:pr-px'>
      <Row prefix='Tree #'>
        <BigIntInput
          value={treeIndex}
          onChange={flow(setTreeIndex, dispatch)}
          min={'1'}
          max={treeCount}
          title={unlines.rest(
            'Index in ordered set of all trees at this node count: ',
            `i=${treeIndex}`,
          )}
        />
      </Row>
      <Stack
        className='relative *:first:absolute-0'
        top={isFirst ? 'single' : 'many'}
        subNodes={{
          single,
          many: (
            <Row prefix='out of all' className='overflow-hidden'>
              <NumericView
                value={treeCount}
                title={`Number of trees at this node count: nⁿ⁻² = `}
              />
            </Row>
          ),
        }}
      />

      <div className='flex items-baseline whitespace-nowrap'>
        possible
        <FixedNumeric
          value={Number(nodeCount)}
          min={2}
          max={MAX_NODE_COUNT}
          title='Number of nodes in the tree.'
          onChange={flow(setNodeCount, dispatch)}
          className='mx-1'
          name='nodeCount'
          popoverTarget='nodeCountTooltip'
        />
        {`node labeled tree${isFirst ? '' : 's'}.`}
      </div>
      <div
        id='nodeCountTooltip'
        popover='auto'
        role='tooltip'
        className='bg-yellow-100'>
        Node count tooltip!
      </div>
    </div>
  )
}

const Row = ({
  children,
  className,
  style,
  prefix,
}: StyledPropsWithChildren & {prefix: ReactNode}) => (
  <div
    className='flex items-baseline gap-1 overflow-hidden whitespace-nowrap'
    {...{style}}>
    <div className='leading-row-small'>{prefix}</div>
    <div className={twMerge('flex-1', className)}>{children}</div>
  </div>
)

const single = <Row prefix={<div className='absolute-0'>of the single</div>} />
