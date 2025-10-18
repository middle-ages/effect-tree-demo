import {withClassName} from '#compinators'
import {type PrimedStat} from '#tree'
import {twMerge} from 'tailwind-merge'
import type {StyledProps} from '#util'

type TreeStats = Record<'nodeCount' | 'maxDegree' | 'maxDepth', PrimedStat>

interface Props extends StyledProps {
  lines: string[]
  stats: TreeStats
}

const Label = withClassName.div('truncate set-fg-terminal-dim text-sm')
const Value = withClassName.div('text-lg truncate font-serif')

export const TextView = ({lines, style, className, stats}: Props) => {
  return (
    <div
      {...{style}}
      className={twMerge('relative overflow-hidden min-w-72', className)}>
      <div
        className={`fill-container-h rounded-md set-bg-terminal
                    border-inset scrollable-y [&::after]:top-full`}>
        <pre
          className={`p-1 font-mono leading-none
                      absolute-full *:first:mt-1 text-lg`}>
          {lines.join('\n')}
        </pre>
      </div>
      <Overlay {...stats} />
    </div>
  )
}

const Overlay = ({nodeCount, maxDegree, maxDepth}: TreeStats) => (
  <div className="absolute top-2 right-6">
    <div
      className={`grid grid-cols-[min-content_4rch] gap-x-1.5 text-right
                  *:subgrid-2 *:*:leading-6! *:cursor-default`}>
      <div title={nodeCount.title}>
        <Label>{nodeCount.label}:</Label>
        <Value>{nodeCount.value.toLocaleString()}</Value>
      </div>
      <div title={maxDegree.title}>
        <Label>{maxDegree.label}:</Label>
        <Value>{maxDegree.value.toLocaleString()}</Value>
      </div>
      <div title={maxDepth.title}>
        <Label>{maxDepth.label}:</Label>
        <Value>{maxDepth.value.toLocaleString()}</Value>
      </div>
    </div>
  </div>
)
