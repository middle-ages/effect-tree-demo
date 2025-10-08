import {tupled} from '#Function'
import {flow, K} from '#util'
import {Tuple} from 'effect'
import {
  Codec,
  maximumNodeDegree,
  maximumNodeHeight,
  type Tree,
} from 'effect-tree'

const {Prufer} = Codec

export const MAX_NODE_COUNT = 100n

export type StatId = (typeof statIds)[number]

export interface Stats extends Record<StatId, Stat> {}

export interface Stat {
  id: StatId
  label: string
  title: string
  value: bigint
}

export const statIds = [
  'nodeCount',
  'treeCount',
  'treeIndex',
  'maxNodes',
  'maxDepth',
  'maxDegree',
] as const

const makeStat =
  (code: number[], tree: Tree<number>) =>
  (id: StatId, label: string, title: string) =>
  (compute: (code: number[], tree: Tree<number>) => bigint): Stat => ({
    id,
    label,
    title,
    value: compute(code, tree),
  })

export const stats = (code: number[], tree: Tree<number>): Stats => {
  const make = makeStat(code, tree)

  return {
    nodeCount: make(
      'nodeCount',
      'Nodes',
      'Number of nodes.',
    )(flow(Prufer.computeNodeCount, BigInt)),

    treeCount: make(
      'treeCount',
      'Trees',
      'Number of labeled sorted trees at this node count.',
    )(flow(Prufer.computeNodeCount, Prufer.labeledTreeCount)),

    treeIndex: make(
      'treeIndex',
      'Ordinal',
      'Index of current tree in ordered set of all trees in this node count.',
    )(flow(Prufer.toOrdinal, Tuple.getFirst)),

    maxNodes: make(
      'maxNodes',
      'Max Nodes',
      'Maximum node count limit.',
    )(K(MAX_NODE_COUNT)),

    maxDepth: make(
      'maxDepth',
      'Depth',
      'Maximum hops from a leaf node to root.',
    )((_, tree) => BigInt(maximumNodeHeight(tree))),

    maxDegree: make(
      'maxDegree',
      'Degree',
      'Size of the  largest forest.',
    )((_, tree) => BigInt(maximumNodeDegree(tree))),
  }
}

stats.tupled = tupled(stats) as (
  pair: readonly [code: number[], tree: Tree<number>],
) => Stats
