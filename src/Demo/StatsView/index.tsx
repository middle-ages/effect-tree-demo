import {BigIntInput} from '#BigIntInput'
import {FixedNumeric} from '#FixedNumeric'
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
import {unlines} from '#String'
import {flow, type StyledPropsWithChildren} from '#util'
import {type ReactNode} from 'react'

export const StatsView = () => {
  const {
    treeCount: {value: treeCount},
    treeIndex: {value: treeIndex},
    nodeCount: {value: nodeCount},
  } = useAppSelector(selectStats)
  const isFirst = treeCount === '1'
  const dispatch = useAppDispatch()

  return (
    <div className='flex h-21 flex-col contain-strict *:h-row-small *:leading-row-small *:first:pr-px'>
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
        className='contain-strict'
        top={isFirst ? 'single' : 'many'}
        subNodes={{
          single,
          many: (
            <Row prefix={<div className='min-w-16.5'>out of all</div>}>
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
        />
        {`node labeled tree${isFirst ? '' : 's'}.`}
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
    className='flex h-row-small items-baseline gap-1 contain-strict *:leading-row-small *:last:flex-1'
    {...{style}}>
    <div>{prefix}</div>
    <div {...{className}}>{children}</div>
  </div>
)

const single = <Row prefix={<div className='h-row-small'>of the single</div>} />

/*

      <div
          popoverTarget='nodeCountTooltip'
        id='nodeCountTooltip'
        popover='auto'
        role='tooltip'
        className='bg-yellow-100'>
        Node count tooltip!
      </div>

*/
