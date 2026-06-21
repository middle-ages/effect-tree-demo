import {withClassName} from '#compinators'
import {type PrimedStat} from '#model'
import {ScrollPanel} from '#ScrollPanel'
import {selectLines, selectStats, useAppSelector} from '#store'
import {Fragment} from 'react/jsx-runtime'

type TreeStats = Record<'nodeCount' | 'maxDegree' | 'maxDepth', PrimedStat>

const Label = withClassName.span(
  'text-small text-fg-control min-w-0 truncate text-right',
)
const Value = withClassName.span('text-small font-serif text-ink text-right')

export const TextView = () => {
  const [stats, lines] = [
    useAppSelector(selectStats),
    useAppSelector(selectLines),
  ]
  return (
    <div className='relative h-full min-w-48 p-px'>
      <ScrollPanel className='scroller-focus z-1 rounded-md border-inset-2 bg-paper before:top-[0.5px]'>
        <pre className='px-1 font-mono text-smallest text-ink'>{lines}</pre>
      </ScrollPanel>
      <Overlay {...stats} />
    </div>
  )
}

const Overlay = ({nodeCount, maxDegree, maxDepth}: TreeStats) => (
  <div
    className='absolute top-2 z-0 grid size-fit auto-rows-[1.75rem] grid-cols-[min-content_4rch] opacity-60'
    style={{left: 'max(100% - 16rch, 0.5rch)'}}>
    {[nodeCount, maxDegree, maxDepth].map(({id, label, title, value}) => (
      <Fragment key={id}>
        <div {...{title}} className='subgrid-2 cursor-default *:bg-paper/90'>
          <Label>{label}:</Label>
          <Value>{value.toLocaleString()}</Value>
        </div>
      </Fragment>
    ))}
  </div>
)
