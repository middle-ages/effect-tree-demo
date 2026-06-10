import {pluck} from '#Record'
import {tupled} from '#Function'
import {Array, flow, K} from '#util'
import {pipe, Record, Tuple} from 'effect'
import {
  Codec,
  maximumNodeDegree,
  maximumNodeHeight,
  type Tree,
} from 'effect-tree'

const {Prufer} = Codec

export const MAX_NODE_COUNT: number = 100

export type StatId = (typeof statIds)[number]

export interface Stats extends Record<StatId, Stat> {}
export interface PrimedStats extends Record<StatId, PrimedStat> {}

export interface BaseStat {
  id: StatId
  label: string
  title: string
}

interface ComputeStat {
  (data: {code: number[]; tree: Tree<number>}): bigint
}

export interface Stat extends BaseStat {
  compute: ComputeStat
}

export interface PrimedStat extends BaseStat {
  value: string
}

export const statIds = [
  'nodeCount',
  'treeCount',
  'treeIndex',
  'maxNodes',
  'maxDepth',
  'maxDegree',
] as const

const stats: Stats = pipe(
  [
    make(
      'nodeCount',
      'node count',
      'Number of nodes.',
    )(flow(pluck('code'), Prufer.computeNodeCount, BigInt)),

    make(
      'treeCount',
      'Trees',
      'Number of labeled sorted trees at this node count.',
    )(flow(pluck('code'), Prufer.computeNodeCount, Prufer.labeledTreeCount)),

    make(
      'treeIndex',
      'Ordinal',
      'Index of current tree in ordered set of all trees in this node count.',
    )(flow(pluck('code'), Prufer.toOrdinal, Tuple.getFirst)),

    make(
      'maxNodes',
      'Max Nodes',
      'Maximum node count limit.',
    )(K(BigInt(MAX_NODE_COUNT))),

    make(
      'maxDepth',
      'max depth',
      'Maximum hops from a leaf node to root.',
    )(({tree}) => BigInt(maximumNodeHeight(tree))),

    make(
      'maxDegree',
      'max degree',
      'Size of the  largest forest.',
    )(({tree}) => BigInt(maximumNodeDegree(tree))),
  ],
  Array.map(stat => [stat.id, stat] as const),
  Record.fromEntries,
)

export const primeStats = (code: number[], tree: Tree<number>): PrimedStats => {
  return pipe(
    stats,
    Record.mapEntries(({compute, ...stat}, key) => [
      key,
      {...stat, value: compute({code, tree}).toString()},
    ]),
  )
}

primeStats.tupled = tupled(primeStats) as (
  pair: readonly [code: number[], tree: Tree<number>],
) => PrimedStats

function make(id: StatId, label: string, title: string) {
  return (
    compute: ({code, tree}: {code: number[]; tree: Tree<number>}) => bigint,
  ): Stat => ({
    id,
    label,
    title,
    compute,
  })
}
