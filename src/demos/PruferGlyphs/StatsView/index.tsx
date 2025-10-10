import {Numeric} from '#components'
import {type PrimedStats} from '#tree'
import {type StyledPropsWithChildren} from '#util'
import {twMerge} from 'tailwind-merge'

interface Props {
  stats: PrimedStats
  maxWidthPx?: number
}

export const StatsView = ({
  stats: {treeIndex, treeCount, nodeCount},
  maxWidthPx = 332,
}: Props) => {
  return (
    <>
      <div className="flex flex-col gap-1 set-fg-control">
        <Row>
          <div className="pr-1">Showing tree #</div>
          <Numeric {...{maxWidthPx}} value={treeIndex.value} />
        </Row>

        <Row>
          <div className="pr-1">out of all</div>
          <Numeric.Flat {...{maxWidthPx}} value={treeCount.value} />
        </Row>

        <Row>
          <div>possible</div>
          <Numeric.FixedWidth
            digits={3}
            value={nodeCount.value}
            className="mx-1"
          />
          <div>node vertex labeled trees.</div>
        </Row>
      </div>
    </>
  )
}

const Row = ({children, className, style}: StyledPropsWithChildren) => (
  <div
    className={twMerge(
      'flex items-center *:whitespace-nowrap *:first:form-row-h',
      className,
    )}
    {...{style}}>
    {children}
  </div>
)
