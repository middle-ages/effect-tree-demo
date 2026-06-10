import {withClassName} from '#compinators'
import {anchorName, rem} from '#Css'
import {primedFromValues, type PrimedStat} from '#model'
import {ScrollPanel} from '#ScrollPanel'
import {Spinner} from '#Spinner'
import {selectLines, selectStats, useAppSelector} from '#store'
import {useTooltip} from '#Tooltip'
import {twMerge} from 'tailwind-merge'

type TreeStats = Record<'nodeCount' | 'maxDegree' | 'maxDepth', PrimedStat>

const Label = withClassName.div(
  'text-small text-fg-control/75 min-w-0 truncate text-right pl-1 leading-7',
)
const Value = withClassName.div(
  'text-small font-serif text-ink/85 text-right pr-1 leading-7 dom-play',
)

const parentClassName = twMerge(
  'rounded-md border-[1.5px] inset-xy-dim hover:inset-xy',
  'scroller-focus bg-paper relative',
)

const remPerLine = 0.938

export const TextView = () => {
  const [stats, lines] = [
    primedFromValues(useAppSelector(selectStats)),
    useAppSelector(selectLines),
  ]

  const linesHeight = rem((lines.length - 1) * remPerLine)
  const height = `calc(${linesHeight} + 4 * var(--spacing))`

  return (
    <div className='relative size-full min-w-47.25 rounded-md p-[2.5px]'>
      {lines.length === 0 ? (
        <div
          className={twMerge(
            parentClassName,
            'flex size-full place-items-center',
          )}>
          <Spinner />
        </div>
      ) : (
        <>
          <ScrollPanel tabIndex={0} className={parentClassName}>
            <pre
              className='w-fit px-1 font-mono text-smallest text-ink contain-content'
              dangerouslySetInnerHTML={{__html: lines.join('')}}
              style={{height}}
            />
          </ScrollPanel>
          <Overlay {...stats} />
        </>
      )}
    </div>
  )
}

const Overlay = ({nodeCount, maxDegree, maxDepth}: TreeStats) => (
  <div
    className='absolute top-1.25 grid size-fit auto-rows-7 grid-cols-[min-content_5rch]'
    style={{right: 'clamp(2rch, 1%, 2rch)'}}>
    {[nodeCount, maxDegree, maxDepth].map(stat => (
      <OverlayStat key={stat.id} {...stat} />
    ))}
  </div>
)

const hoveredLabel = twMerge(
  '*:first:font-medium',
  '*:first:tracking-normal!',
  '*:first:text-ink',
  '*:first:yellow-glow',
)

const OverlayStat = ({id: baseId, label, title, value}: PrimedStat) => {
  const id = `${baseId}-overlay`
  const {ref, isOpen, tooltip} = useTooltip({
    id,
    title,
    className: '*:first:-translate-y-1.5',
  })
  return (
    <div
      key={id}
      {...{id, ref}}
      className={twMerge(
        'subgrid-2 box-content cursor-default',
        'rounded focus-none dom-play',
        'bg-paper/80',
        isOpen && hoveredLabel,
        '*:first:tracking-[0.1px]',
      )}
      tabIndex={-1}
      style={{...anchorName(id), appearance: 'none'}}>
      <Label>{label}:</Label>
      <Value>{value.toLocaleString()}</Value>
      {tooltip}
    </div>
  )
}
