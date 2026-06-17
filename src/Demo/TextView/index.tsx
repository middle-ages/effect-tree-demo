import {withClassName} from '#compinators'
import {linesSelector, TreeCode, type PrimedStat} from '#model'
import {ScrollPanel} from '#ScrollPanel'
import {useAppSelector} from '#store'
import {Fragment} from 'react/jsx-runtime'

type TreeStats = Record<'nodeCount' | 'maxDegree' | 'maxDepth', PrimedStat>

const Label = withClassName.span(
  'text-small text-fg-control min-w-0 truncate text-right',
)
const Value = withClassName.span('text-small font-serif text-ink text-right')

export const TextView = () => {
  const [stats, lines] = [
    useAppSelector(TreeCode.selectStats),
    useAppSelector(linesSelector),
  ]
  return (
    <div className='relative size-full min-w-48 overflow-hidden p-0.5'>
      <ScrollPanel className='scroller-focus z-1 rounded-sm border-inset-2 bg-paper before:top-[0.5px]'>
        <pre className='px-1 font-mono text-sm text-ink'>{lines}</pre>
      </ScrollPanel>
      <Overlay {...stats} />
    </div>
  )
}

const Overlay = ({nodeCount, maxDegree, maxDepth}: TreeStats) => (
  <div
    className='absolute top-1.5 z-0 grid size-fit auto-rows-[1.75rem] grid-cols-[min-content_4rch] opacity-60'
    style={{left: 'max(100% - 15.5rch, 0.5rch)'}}>
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
