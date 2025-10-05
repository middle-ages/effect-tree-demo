import {type Stats} from './stats'
import {Numeric} from '#components'

interface Props {
  stats: Stats
}

export const StatsView = ({
  stats: {treeIndex, treeCount, nodeCount},
}: Props) => {
  return (
    <>
      {' '}
      <div className="separator" />{' '}
      <div
        className={`
      leading-relaxed text-[var(--controlFg)] truncate 
      *:my-1 *:h-8 *:leading-8
      `}>
        <div>
          Showing
          <Ordinal value={treeIndex.value} />
        </div>

        <div>
          in the list of
          <Count value={treeCount.value} />
        </div>

        <div>
          possible
          <Count value={nodeCount.value} />
        </div>

        <div>node uniquely labeled numeric trees.</div>
      </div>
    </>
  )
}

const Ordinal = ({value}: {value: number}) =>
  value === 1 ? (
    <>
      {' the '}
      <span className="numeric italic">first tree</span>
    </>
  ) : (
    <>
      {' tree '}
      <span className="text-sm pr-px">#</span>
      <Numeric {...{value}} />
    </>
  )

const Count = ({value}: {value: number}) => (
  <>
    {' '}
    <Numeric {...{value}} />
  </>
)
