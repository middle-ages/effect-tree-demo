import {type NonEmptyArray} from '#Array'
import {apply0, tupled, type EndoOf} from '#Function'
import {
  DecCode,
  DecHalfCode,
  DecHalfNodeCount,
  DecNodeCount,
  FirstCode,
  FirstNodeCount,
  IncCode,
  IncHalfCode,
  IncHalfNodeCount,
  IncNodeCount,
  LastCode,
  LastNodeCount,
} from '#icons'
import {bigHalf, floorHalf} from '#Number'
import {
  MAX_NODE_COUNT,
  sampleNodeCount,
  sampleNodeCountAndCode,
  samplePruferCode,
} from '#tree'
import {flow, Number, pipe, Tuple} from '#util'
import {Codec} from 'effect-tree'
import {type Predicate} from 'effect/Predicate'
import type {ActionMap, ModifyAction} from './types'

const {
  Prufer: {
    computeNodeCount,
    fromOrdinal,
    getFirstCode,
    getFirstCodeFor,
    getLastCode,
    getLastCodeFor,
    getNextFirstCode,
    getPreviousLastCode,
    isFirstCode,
    isLastCode,
    labeledTreeCount,
    nextCode,
    previousCode,
    toOrdinal,
  },
} = Codec

const codeEdgeTitle: EndoOf<string> = where =>
  `You are at the ${where} Prüfer code for this node count ` +
  'and can go no further.'

const [firstCodeTitle, lastCodeTitle] = [
  codeEdgeTitle('first'),
  codeEdgeTitle('last'),
]

const maxNodeCountTitle = `(𝓶𝓪𝔁=${MAX_NODE_COUNT.toLocaleString()})`

const disableMinNodeCount: [Predicate<number[]>, string] = [
  code => computeNodeCount(code) <= 2,
  'Cannot encode a Prüfer tree with nodeCount ≤ 1.',
]

const disableMaxNodeCount: [Predicate<number[]>, string] = [
  code => computeNodeCount(code) >= MAX_NODE_COUNT,
  `Cannot encode a Prüfer tree with nodeCount > 𝓶𝓪𝔁 ${maxNodeCountTitle}.`,
]

const codeJumps: NonEmptyArray<ModifyAction> = [
  {
    id: 'firstCode',
    label: FirstCode,
    title: 'Jump to the first code in the current node count.',
    disable: [isFirstCode, firstCodeTitle],
    apply: getFirstCode,
  },

  {
    id: 'decHalfCode',
    label: DecHalfCode,
    title: 'Jump backwards to ½ of the current Prüfer code.',
    disable: [isFirstCode, firstCodeTitle],
    apply: flow(toOrdinal, Tuple.mapFirst(bigHalf), tupled(fromOrdinal)),
  },

  {
    id: 'decCode',
    label: DecCode,
    title: 'Step back to previous tree.',
    disable: [isFirstCode, firstCodeTitle],
    apply: previousCode,
  },

  {
    id: 'incCode',
    label: IncCode,
    title: 'Step forwards to the next tree.',
    disable: [isLastCode, lastCodeTitle],
    apply: nextCode,
  },

  {
    id: 'incHalfCode',
    label: IncHalfCode,
    title:
      'Jump forwards ½ the distance between this code ' +
      'and the last code for this node count.',
    disable: [isLastCode, lastCodeTitle],
    apply: code => {
      const [ordinal, nodeCount] = toOrdinal(code)
      const max = labeledTreeCount(nodeCount)
      return fromOrdinal(
        ordinal === max - 1n
          ? max
          : ordinal + (labeledTreeCount(nodeCount) - ordinal) / 2n,
        nodeCount,
      )
    },
  },

  {
    id: 'lastCode',
    label: LastCode,
    title: 'Jump to the last tree in current node count.',
    disable: [isLastCode, lastCodeTitle],
    apply: getLastCode,
  },
]

const nodeCountJumps: NonEmptyArray<ModifyAction> = [
  {
    id: 'firstNodeCount',
    label: FirstNodeCount,
    title: 'Set to smallest Prüfer encodable node count of 2 nodes.',
    disable: disableMinNodeCount,
    apply: () => [],
  },

  {
    id: 'decHafNodeCount',
    label: DecHalfNodeCount,
    title: 'Cut node count by ½ and go to the last code of the new node count.',
    disable: disableMinNodeCount,
    apply: flow(computeNodeCount, floorHalf, getLastCodeFor),
  },

  {
    id: 'decNodes',
    label: DecNodeCount,
    title: 'Remove a node from the tree.',
    disable: disableMinNodeCount,
    apply: getPreviousLastCode,
  },

  {
    id: 'incNodes',
    label: IncNodeCount,
    title: 'Add a node to the tree.',
    disable: disableMaxNodeCount,
    apply: getNextFirstCode,
  },

  {
    id: 'incHalfNodeCount',
    label: IncHalfNodeCount,
    title:
      'Jump to first code of the mid-point of this node count ' +
      `and the 𝓶𝓪𝔁 node count ${maxNodeCountTitle}.`,
    disable: disableMaxNodeCount,
    apply: code => {
      const nodeCount = computeNodeCount(code)
      return getFirstCodeFor(
        nodeCount === MAX_NODE_COUNT - 1
          ? MAX_NODE_COUNT
          : nodeCount + floorHalf(MAX_NODE_COUNT - nodeCount),
      )
    },
  },

  {
    id: 'lastNodeCount',
    label: LastNodeCount,
    title: `Set to maximum node count ${maxNodeCountTitle}.`,
    disable: disableMaxNodeCount,
    apply: () => getFirstCodeFor(MAX_NODE_COUNT),
  },
]

const randomJumps: NonEmptyArray<ModifyAction> = [
  {
    id: 'randomCode',
    label: 'Prüfer Code',
    title: 'Jump to a random tree with the same number of nodes.',
    disable: [
      flow(computeNodeCount, Number.isEqualTo(2)),
      'Nowhere to jump: there is only a single tree with two nodes.',
    ],
    apply: samplePruferCode(),
  },

  {
    id: 'randomBoth',
    label: 'Both',
    title: `Jump to a random tree in some random node count.`,
    disable: undefined,
    apply: () =>
      pipe(MAX_NODE_COUNT, sampleNodeCountAndCode, apply0, Tuple.getSecond),
  },

  {
    id: 'randomNodes',
    label: 'Node Count',
    title: `Set a random node count between 2 and ${MAX_NODE_COUNT.toLocaleString()}.`,
    disable: undefined,
    apply: () => pipe(MAX_NODE_COUNT, sampleNodeCount, apply0, getFirstCodeFor),
  },
]

export const actionMap: ActionMap = {
  code: codeJumps,
  nodeCount: nodeCountJumps,
  random: randomJumps,
}

/*
  export const setCodeAction: Action<'setCode', [number[]]> = {
    id: 'setCode',
    label: 'Prüfer Code',
    note: 'Set a Prüfer code for the generated tree.',
    disabledNote: undefined,
    apply: identity,
  }

  export const setNodesAction: Action<'setNodes', [number]> = {
    id: 'setNodes',
    label: 'Set Size',
    note: 'Set the number of nodes.',
    disabledNote: undefined,
    apply: Prufer.getFirstCodeFor,
  }

    */
