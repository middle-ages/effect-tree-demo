import * as Array from '#Array'
import {dual, flow, K, pipe} from '#Function'
import {map, fromEntries, mapEntries, pluck} from '#Record'
import {getFirst} from '#Tuple'
import type {BaseItem} from '#types'
import {
  Codec,
  maximumNodeDegree,
  maximumNodeHeight,
  type Tree,
} from 'effect-tree'
import {pick} from 'effect/Struct'
import type {ReactNode} from 'react'
import type {Simplify} from 'type-fest'

const {Prufer} = Codec

export const MAX_NODE_COUNT: number = 200

export const quickStatIds = [
  'nodeCount',
  'treeCount',
  'treeIndex',
  'maxNodes',
] as const

export const slowStatIds = ['maxDegree', 'maxDepth'] as const
export const statIds = [...quickStatIds, ...slowStatIds] as const

export type QuickStatId = (typeof quickStatIds)[number]
export type SlowStatId = (typeof slowStatIds)[number]
export type StatId = (typeof statIds)[number]

export type Stats<Id extends StatId = StatId> = Record<Id, Stat>
export type PrimedStats<Id extends StatId = StatId> = Record<Id, PrimedStat>
export type QuickStats = PrimedStats<QuickStatId>
export type StatValues<Id extends StatId = StatId> = Record<Id, string>

interface _PrimedStat extends BaseStat {
  value: string
}

/**
 * A stat that _has been computed_ and is ready for display.
 */
export type PrimedStat = Simplify<_PrimedStat>

/**
 * A stat that _can be computed_ given a Prüfer code and a tree.
 */
interface _Stat extends BaseStat {
  compute: ComputeStat
}

/**
 * A stat that _can be computed_ given a Prüfer code and a tree.
 */
export type Stat = Simplify<_Stat>

interface BaseStat extends BaseItem<StatId, string> {}

interface ComputeStat {
  (data: {code: number[]; tree: Tree<number>}): bigint
}

const stats = pipe(
  [
    make(
      'nodeCount',
      'node count',
      <div className='max-w-34'>Node count of the current tree.</div>,
    )(flow(pluck('code'), Prufer.computeNodeCount, BigInt)),

    make(
      'treeCount',
      'Trees',
      <div className='max-w-38'>
        Number of labeled sorted trees at this node count.
      </div>,
    )(flow(pluck('code'), Prufer.computeNodeCount, Prufer.labeledTreeCount)),

    make(
      'treeIndex',
      'Ordinal',
      <div className='max-w-38'>
        Index of current tree in ordered set of all trees in this node count.
      </div>,
    )(flow(pluck('code'), Prufer.toOrdinal, getFirst)),

    make(
      'maxNodes',
      'Max Nodes',
      <div className='max-w-38'>Maximum node count limit.</div>,
    )(K(BigInt(MAX_NODE_COUNT))),

    make(
      'maxDegree',
      'max degree',
      <div className='max-w-31'>
        Child count of the node with most children.
      </div>,
    )(flow(pluck('tree'), maximumNodeDegree, BigInt)),

    make(
      'maxDepth',
      'max depth',
      <div className='max-w-43'>
        Maximum hop count to the tree root from any node in this tree.
      </div>,
    )(flow(pluck('tree'), maximumNodeHeight, BigInt)),
  ],
  Array.map(stat => [stat.id, stat] as const),
  fromEntries,
) as Stats

export const primeStat = <const Id extends StatId>(
  statId: Id,
  value: bigint | number | string,
): PrimedStat => {
  const {compute: _, ...rest} = stats[statId]
  return {...rest, value: value.toString()}
}

const primeStatsOf: <Id extends StatId>(
  statIds: readonly Id[],
) => {
  (code: number[], tree: Tree<number>): PrimedStats<Id>
  (tree: Tree<number>): (code: number[]) => PrimedStats<Id>
} = <Id extends StatId>(statIds: readonly Id[]) =>
  dual(2, (code: number[], tree: Tree<number>): PrimedStats<Id> =>
    mapEntries(
      pick(stats, ...statIds) as Pick<Stats<Id>, Id>,
      ({compute}, key) => [key, primeStat(key, compute({code, tree}))],
    ),
  )

export const [maxDegree, maxDepth]: [
  (code: number[], tree: Tree<number>) => PrimedStats<'maxDegree'>,
  (code: number[], tree: Tree<number>) => PrimedStats<'maxDepth'>,
] = [primeStatsOf(['maxDegree']), primeStatsOf(['maxDepth'])]

export const primeQuickStats: (
  tree: Tree<number>,
) => (code: number[]) => PrimedStats<QuickStatId> = tree => code =>
  primeStatsOf(quickStatIds)(code, tree)

function make(id: StatId, label: string, title: ReactNode) {
  return (
    compute: ({code, tree}: {code: number[]; tree: Tree<number>}) => bigint,
  ): Stat => ({
    id,
    label,
    title,
    compute,
  })
}

export const primedToValues = <Id extends StatId>(
  stats: PrimedStats<Id>,
): StatValues<Id> => mapEntries(stats, ({id, value}) => [id, value])

export const primedFromValues = <Id extends StatId>(
  values: StatValues<Id>,
): PrimedStats<Id> => map(values, (value, id) => primeStat(id, value))
