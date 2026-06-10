import {withClassName} from '#compinators'
import {type PrimedStat} from '#tree'
import {Fragment} from 'react/jsx-runtime'

type TreeStats = Record<'nodeCount' | 'maxDegree' | 'maxDepth', PrimedStat>

interface Props extends TreeStats {
  lines: string[]
}

const Label = withClassName.span(
  'bg-paper/80 text-fg-control-disabled min-w-0 truncate',
)
const Value = withClassName.span('bg-paper/80 font-serif text-ink text-right')

export const TextView = ({lines, ...stats}: Props) => {
  return (
    <>
      <pre className="px-1 font-mono absolute-full text-smaller text-ink">
        {lines}
      </pre>
      <Overlay {...stats} />
    </>
  )
}

const Overlay = ({nodeCount, maxDegree, maxDepth}: TreeStats) => (
  <div
    className={`grid grid-cols-[minmax(4rem,1fr)_min-content_4ch]
                sticky top-1 w-full pr-1.5`}>
    {[nodeCount, maxDegree, maxDepth].map(({id, label, title, value}) => (
      <Fragment key={id}>
        <div />
        <div
          {...{title}}
          className="subgrid-2 *:leading-row-small *:h-row-small cursor-default">
          <Label>{label}:</Label>
          <Value>{value.toLocaleString()}</Value>
        </div>
      </Fragment>
    ))}
  </div>
)
