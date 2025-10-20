import {Numeric} from '#Numeric'
import {type PrimedStats} from '#tree'
import {type StyledPropsWithChildren} from '#util'
import {twMerge} from 'tailwind-merge'

interface Props {
  stats: PrimedStats
  maxWidthPx?: number
}

export const StatsView = ({
  stats: {treeIndex, treeCount, nodeCount},
  maxWidthPx = 293,
}: Props) => {
  const isFirst = treeCount.value === 1n
  return (
    <>
      <div className="flex flex-col">
        <Row>
          <div className="pr-1">Showing tree #</div>
          <Numeric {...{maxWidthPx}} value={treeIndex.value} />
        </Row>

        <Row>
          {isFirst ? (
            <div>of the single</div>
          ) : (
            <>
              <div className="pr-1.5">out of all</div>
              <Numeric.Flat maxWidthPx={339} value={treeCount.value} />
            </>
          )}
        </Row>

        <Row>
          <div>possible</div>
          <Numeric.FixedWidth
            digits={3}
            value={nodeCount.value}
            className="mx-1"
          />
          <div>node vertex labeled tree{isFirst ? '' : 's'}.</div>
        </Row>
      </div>
    </>
  )
}

const Row = ({children, className, style}: StyledPropsWithChildren) => (
  <div
    className={twMerge(
      'flex items-center *:whitespace-nowrap form-row-h',
      className,
    )}
    {...{style}}>
    {children}
  </div>
)
