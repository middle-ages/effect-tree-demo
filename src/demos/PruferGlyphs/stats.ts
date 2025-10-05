import {Array, flow, K} from '#util'
import {Codec} from 'effect-tree'

const {Prufer} = Codec

export const MAX_NODE_COUNT = 100

export type StatId = (typeof statIds)[number]

export interface Stats extends Record<StatId, Stat> {}

export interface Stat {
  id: StatId
  label: string
  title: string
  value: number
}

export const statIds = [
  'nodeCount',
  'treeCount',
  'treeIndex',
  'maxNodes',
] as const

const makeStat =
  (code: number[]) =>
  (id: StatId, label: string, title: string) =>
  (compute: (code: number[]) => number): Stat => {
    const value = compute(code)
    return {
      id,
      label,
      title,
      value,
    }
  }

export const stats = (code: number[]): Stats => {
  const make = makeStat(code)

  return {
    nodeCount: make(
      'nodeCount',
      'Nodes',
      'Number of nodes.',
    )(Prufer.computeNodeCount),

    treeCount: make(
      'treeCount',
      'Trees',
      'Number of labeled sorted trees at this node count.',
    )(flow(Prufer.computeNodeCount, Prufer.labeledTreeCount)),

    treeIndex: make(
      'treeIndex',
      'Ordinal',
      'Index of current tree in ordered set of all trees in this node count.',
    )(flow(Prufer.toOrdinal, Array.unsafeGet(0))),

    maxNodes: make(
      'maxNodes',
      'Max Nodes',
      'Maximum node count limit.',
    )(K(MAX_NODE_COUNT)),
  }
}
