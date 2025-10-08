import {type EndoOf} from '#Function'
import {withKey} from '#Record'
import {flow, Number, Predicate} from 'effect'
import {Codec} from 'effect-tree'
import type {ModifyAction, ModifyActionId, ModifyActionMap} from './types'
import {MAX_NODE_COUNT} from '../StatsView/stats'

const {Prufer} = Codec

const isMaxNodeCount: Predicate.Predicate<number[]> = code =>
  Prufer.computeNodeCount(code) >= MAX_NODE_COUNT

const isMinNodeCount: Predicate.Predicate<number[]> = code =>
  Prufer.computeNodeCount(code) <= 2

const [firstCodeNote, lastCodeNote] = [
  noFurtherNote('first'),
  noFurtherNote('last'),
]

export const actionMap: ModifyActionMap = {
  ...modifyAction('decCode', '⯇ Previous')('Step back to previous tree.', [
    code => code.length === 0,
    'You are at the first Prüfer encodable tree and can go no further.',
  ])(Prufer.previousCode),

  ...modifyAction('incCode', 'Next ⯈')('Step forwards to the next tree.', [
    Predicate.and(Prufer.isLastCode, isMaxNodeCount),
    'You are at the last Prüfer encodable tree of node count ≤ ' +
      `${MAX_NODE_COUNT.toString()} and can go no further.`,
  ])(Prufer.nextCode),

  ...modifyAction('firstCode', '⏮ First')(
    'Jump to the first tree in current node count.',
    [Prufer.isFirstCode, firstCodeNote],
  )(flow(Prufer.computeNodeCount, Prufer.getFirstCodeFor)),

  ...modifyAction('lastCode', 'Last ⏭')(
    'Jump to the last tree in current node count.',
    [Prufer.isLastCode, lastCodeNote],
  )(flow(Prufer.computeNodeCount, Prufer.getLastCodeFor)),

  ...modifyAction('decNodes', 'Remove Node')('Remove a node from the tree.', [
    isMinNodeCount,
    'Cannot encode a Prüfer tree with nodeCount ≤ 1.',
  ])(flow(Prufer.computeNodeCount, Number.decrement, Prufer.getLastCodeFor)),

  ...modifyAction('incNodes', 'Add Node')('Add a node to the tree.', [
    isMaxNodeCount,
    `You have reached the maximum node count of ${MAX_NODE_COUNT.toString()}`,
  ])(flow(Prufer.computeNodeCount, Number.increment, Prufer.getFirstCodeFor)),
}

function modifyAction(id: ModifyActionId, label: string) {
  return (
      note: string,
      disable?: [
        predicate: Predicate.Predicate<number[]>,
        disabledNote: string,
      ],
    ) =>
    (apply: EndoOf<number[]>): Record<ModifyActionId, ModifyAction> =>
      withKey(id)({
        id,
        label,
        note,
        apply,
        disable,
      })
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

export const randomCodeAction: Action<'randomCode'> = {
  id: 'randomCode',
  label: 'Random Tree',
  note: 'Goto a random tree with the same number of nodes.',
  disabledNote: undefined,
  apply: samplePruferCode(),
}

export const randomNodesAction: Action<'randomNodes'> = {
  id: 'randomNodes',
  label: 'Random Size',
  note: 'Set a random node count.',
  disabledNote: undefined,
  apply: (seed?: number) =>
    pipe(MAX_NODE_COUNT, sampleNodeCount, apply(seed), Prufer.getFirstCodeFor),
}
  */

function noFurtherNote(ordinal: string): string {
  return `You are at the ${ordinal} tree in this node count.`
}
