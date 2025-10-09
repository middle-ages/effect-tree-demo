import {withClassName} from '#compinators'
import * as Tree from 'effect-tree'
import {useMemo} from 'react'
import {drawRomanTree, type NumericFormat} from './roman/roman'
import type {Stat} from './StatsView/stats.js'

type TreeStats = Record<'maxDegree' | 'maxDepth', Stat>

interface Props extends TreeStats {
  tree: Tree.Tree<number>

  // How do we format the labels of the numeric tree we are drawing?
  format: NumericFormat
}

const Label = withClassName('text-sm leading-6 opacity-65 truncate')
const Value = withClassName('font-serif text-lg leading-[25px]')

export const TextView = ({tree, format, ...overlayProps}: Props) => {
  const lines: string[] = useMemo(
    () => drawRomanTree(tree, format),
    [tree, format],
  )
  return (
    <div
      className={`
         size-full flex-1 relative overflow-auto
         border-inset-colors border-3 rounded-md
         text-[var(--terminalText)] bg-black
    `}>
      <pre
        className={`
          p-1 text-2xl *:leading-none font-mono;
          absolute top-0 left-0 size-full`}>
        {lines.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </pre>
      <Overlay {...overlayProps} />
    </div>
  )
}
//  <TextTree
//    className="relative *:px-2 *:pl-1 flex-1 textView"
//    tree={
//    <Overlay {...{code}} />
//  </TextTree>

const Overlay = ({maxDegree, maxDepth}: TreeStats) => {
  return (
    <div className="sticky z-50 top-0 left-full w-fit font-light text-[var(--terminalText)]">
      <div className="grid grid-cols-[min-content_3ch] gap-x-1 py-1.5 px-2 text-right">
        <Label>{maxDegree.label}:</Label>
        <Value>{maxDegree.value.toLocaleString()}</Value>
        <Label>{maxDepth.label}:</Label>
        <Value>{maxDepth.value.toLocaleString()}</Value>
      </div>
    </div>
  )
}

/*
        <div className="grid grid-cols-subgrid" title={maxDepth.title}>
        </div>
        <div className="grid grid-cols-subgrid" title={maxDepth.title}>
        </div>

import {prefix} from '#String'
import type {StyledPropsWithChildren} from '#util'
import {Array, pipe} from 'effect'
import {drawTree, type Tree as TreeModel} from 'effect-tree'
import {useMemo} from 'react'
import {Text} from './Text'

import {twMerge} from 'tailwind-merge'

interface Props extends StyledPropsWithChildren {
  lines: string[]
}

export const Text = ({lines, style, className, children}: Props) => {
  return (
    <div className="relative *:*:truncate *:*:leading-none">
      <div
        className={twMerge('absolute top-0 left-0 size-full', className)}
        {...{style}}>
        {lines.map((line, i) => (
          <div key={i}>{}</div>
        ))}
      </div>
      {children}
    </div>
  )
}

*/
