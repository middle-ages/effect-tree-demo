import {withClassName} from '#compinators'
import {type PrimedStat} from '#tree'
import {twMerge} from 'tailwind-merge'
import type {StyledProps} from '../../util.js'

type TreeStats = Record<'maxDegree' | 'maxDepth', PrimedStat>

interface Props extends StyledProps {
  lines: string[]
  stats: TreeStats
}

const Label = withClassName.div(
  'truncate set-fg-terminal-dim text-sm font-light leading-[25px]',
)

const Value = withClassName.div('text-lg truncate font-serif leading-[26px]')

export const TextView = ({lines, style, className, stats}: Props) => {
  return (
    <div
      {...{style}}
      className={twMerge('relative overflow-hidden', className)}>
      <div
        className={`h-[100cqh] rounded-md set-bg-terminal border-inset
                    scrollable [&::after]:top-full min-h-14`}>
        <pre
          className={`px-1 font-mono leading-none
                      absolute-full *:first:mt-1 text-xl`}>
          {lines.join('\n')}
        </pre>
      </div>
      <Overlay {...stats} />
    </div>
  )
}

const Overlay = ({maxDegree, maxDepth}: TreeStats) => {
  return (
    <div className="absolute top-0 right-4 overflow-hidden">
      <div
        className={`grid grid-cols-[min-content_3ch] gap-x-1
                    text-right pr-1 pt-1`}>
        <div
          className="grid grid-cols-subgrid col-span-2"
          title={maxDegree.title}>
          <Label>{maxDegree.label}:</Label>
          <Value>{maxDegree.value.toLocaleString()}</Value>
        </div>
        <div
          className="grid grid-cols-subgrid col-span-2"
          title={maxDepth.title}>
          <Label>{maxDepth.label}:</Label>
          <Value>{maxDepth.value.toLocaleString()}</Value>
        </div>
      </div>
    </div>
  )
}
