import {type NonEmptyArray} from '#Array'
import {apply0, type EndoOf} from '#Function'
import {MAX_NODE_COUNT, sampleNodeCount, samplePruferCode} from '#tree'
import {flow, Number, pipe} from '#util'
import {Codec} from 'effect-tree'
import {and, type Predicate} from 'effect/Predicate'
import type {ActionMap, ModifyAction} from './types'

const {
  Prufer: {
    computeNodeCount,
    previousCode,
    nextCode,
    getLastCodeFor,
    getFirstCodeFor,
    isLastCode,
    isFirstCode,
  },
} = Codec

const isMaxNodeCount: Predicate<number[]> = code =>
  computeNodeCount(code) >= MAX_NODE_COUNT

const isMinNodeCount: Predicate<number[]> = code => computeNodeCount(code) <= 2

const codeJumps: NonEmptyArray<ModifyAction> = [
  action('firstCode', '⏮', 'Jump to the first tree in current node count.', [
    isFirstCode,
    minCodeNote(),
  ])(flow(computeNodeCount, getFirstCodeFor)),

  action('decCode', '⯇', 'Step back to previous tree.', [
    and(isFirstCode, isMinNodeCount),
    minCodeNote(),
  ])(previousCode),

  action('incCode', '⯈', 'Step forwards to the next tree.', [
    and(isLastCode, isMaxNodeCount),
    maxCodeNote(),
  ])(nextCode),

  action('lastCode', '⏭', 'Jump to the last tree in current node count.', [
    isLastCode,
    maxCodeNote(),
  ])(flow(computeNodeCount, getLastCodeFor)),
]

const nodeCountJumps: NonEmptyArray<ModifyAction> = [
  action('firstNodeCount', '⏮', 'Set to smallest encodable node count.', [
    isMinNodeCount,
    minCodeNote(),
  ])(() => []),

  action('decNodes', '⯇', 'Remove a node from the tree.', [
    isMinNodeCount,
    minCodeNote(),
  ])(flow(computeNodeCount, Number.decrement, getLastCodeFor)),

  action('incNodes', '⯈', 'Add a node to the tree.', [
    isMaxNodeCount,
    maxCodeNote(),
  ])(flow(computeNodeCount, Number.increment, getFirstCodeFor)),

  action('lastNodeCount', '⏭', 'Set to maximum node count.', [
    isMaxNodeCount,
    maxCodeNote(),
  ])(() => getFirstCodeFor(MAX_NODE_COUNT)),
]

const randomJumps: NonEmptyArray<ModifyAction> = [
  action(
    'randomCode',
    'Random Code',
    'Jump to a random tree with the same number of nodes.',
    [
      flow(computeNodeCount, Number.isEqualTo(2)),
      'Nowhere to jump: there is only a single tree with two nodes.',
    ],
  )(samplePruferCode()),

  action(
    'randomNodes',
    'Random Size',
    `Set a random node count between 2 and ${MAX_NODE_COUNT.toLocaleString()}.`,
  )(() => pipe(MAX_NODE_COUNT, sampleNodeCount, apply0, getFirstCodeFor)),
]

export const actionMap: ActionMap = {
  code: codeJumps,
  nodeCount: nodeCountJumps,
  random: randomJumps,
}

function action<const Id extends string>(
  id: Id,
  label: string,
  title: string,
  disable?: [predicate: Predicate<number[]>, disabledNote: string],
) {
  return (apply: EndoOf<number[]>): ModifyAction<Id> => ({
    id,
    label,
    title,
    apply,
    disable,
  })
}

function minCodeNote(): string {
  return 'Cannot encode a Prüfer tree with nodeCount ≤ 1.'
}

function maxCodeNote(): string {
  return (
    'You are at the last Prüfer encodable tree of node count ≤ ' +
    `${MAX_NODE_COUNT.toLocaleString()} and can go no further.`
  )
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
