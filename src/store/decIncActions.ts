import * as Array from '#Array'
import {K, pipe} from '#Function'
import * as icons from '#icons'
import {MAX_NODE_COUNT} from '#model'
import {fanout} from '#Pair'
import * as Record from '#Record'
import {unlines, unwords} from '#String'
import type {ReducerCreators} from '@reduxjs/toolkit'
import {Codec} from 'effect-tree'
import {
  buildAction,
  toReducer,
  type ActionGroup,
  type ActionList,
  type DecIncKey,
  type DefinitionGroup,
  type DirectionKey,
  type TargetKey,
} from './action'
import {type RootDataState, type VoidDataReducer} from './data'
import {guard, maxNodeCountMessageBy} from './guard'
import {
  decHalfCode,
  decHalfNodeCount,
  decNodes,
  incHalfCode,
  incHalfNodeCount,
  prependDigits,
} from './helpers'

const {Prufer} = Codec

type DecIncActions = {
  [Target in TargetKey]: {
    [Direction in DirectionKey]: ActionGroup<Target, Direction>
  }
}

const decIncActions: DecIncActions = {
  code: {
    dec: group({
      firstCode: {
        label: icons.FirstCode,
        title: 'Jump to the first code in the current node count.',
        apply: Prufer.getFirstCode,
        guard: guard.first.code,
      },
      decHalfCode: {
        label: icons.DecHalfCode,
        canRepeat: true,
        apply: decHalfCode,
        guard: guard.first.code,
        title: unwords.rest(
          'Jump backwards to ½ the distance between the 1st Prüfer code',
          'for this node count and the Prüfer code of the current tree.',
        ),
      },
      decCode: {
        label: icons.DecCode,
        canRepeat: true,
        apply: Prufer.previousCode,
        guard: guard.first.tree,
        title: unwords.spaced.rest(
          'Step backwards to previous tree, removing a node in case',
          'this tree is the first tree for this node count.',
        ),
      },
    }),
    inc: group({
      incCode: {
        label: icons.IncCode,
        canRepeat: true,
        apply: Prufer.nextCode,
        guard: guard.last.tree,
        title: unwords.spaced.rest(
          'Step forwards to the next tree, adding a node to the Prüfer code',
          'in case this tree is the last tree for this node count.',
        ),
      },
      incHalfCode: {
        label: icons.IncHalfCode,
        canRepeat: true,
        apply: incHalfCode,
        guard: guard.last.code,
        title: unwords.spaced.rest(
          'Jump forwards ½ the distance between this Prüfer code',
          'and the final Prüfer code for this node count.',
        ),
      },
      lastCode: {
        label: icons.LastCode,
        apply: Prufer.getLastCode,
        guard: guard.last.code,
        title: 'Jump to the last tree in current node count.',
      },
    }),
  },
  nodeCount: {
    dec: group({
      firstNodeCount: {
        label: icons.FirstNodeCount,
        title: 'Set to smallest Prüfer encodable node count of 2 nodes.',
        apply: K([]),
        guard: guard.first.nodeCount,
      },
      decHalfNodeCount: {
        label: icons.DecHalfNodeCount,
        canRepeat: true,
        title: 'Cut node count by ½: clips the head half of the Prüfer code.',
        apply: decHalfNodeCount,
        guard: guard.first.nodeCount,
      },
      decNodes: {
        label: icons.DecNodeCount,
        canRepeat: true,
        title: 'Remove a tree node: clips head element of the Prüfer code.',
        apply: decNodes,
        guard: guard.first.nodeCount,
      },
    }),
    inc: group({
      incNodes: {
        label: icons.IncNodeCount,
        canRepeat: true,
        title: 'Add a node to the tree. Prepends a 𝟏 to the Prüfer code.',
        apply: Array.prepend(1),
        guard: guard.last.nodeCount,
      },
      incHalfNodeCount: {
        label: icons.IncHalfNodeCount,
        canRepeat: true,
        title: unlines.rest(
          'Jump to the node count at the mid-point of this node count and ',
          maxNodeCountMessageBy,
        ),
        apply: code => {
          const {nodeCount, previous} = incHalfNodeCount(code)
          return prependDigits(code, nodeCount, previous)
        },
        guard: guard.last.nodeCount,
      },
      lastNodeCount: {
        label: icons.LastNodeCount,
        title: `Set to node count ${maxNodeCountMessageBy}.`,
        apply: code =>
          prependDigits(code, MAX_NODE_COUNT, Prufer.computeNodeCount(code)),
        guard: guard.last.nodeCount,
      },
    }),
  },
}

export const getDecIncActions =
  <Target extends TargetKey>(target: Target) =>
  <Direction extends DirectionKey>(
    direction: Direction,
  ): ActionList<Target, Direction> => {
    console.log('getDecIncActions')
    console.log(decIncActions)
    console.log({target, direction})
    return Object.values(
      decIncActions[target][direction] as ActionGroup<Target, Direction>,
    ) as unknown[] & ActionList<Target, Direction>
  }

export const incDecReducers = (
  create: ReducerCreators<RootDataState>,
): Record<DecIncKey, VoidDataReducer> =>
  pipe(
    ['code', 'nodeCount'] as const,
    Array.flatMap(jump =>
      pipe(['dec', 'inc'] as const, Array.flatMap(getDecIncActions(jump))),
    ),
    Array.map(fanout(Record.pluck('id'), toReducer(create))),
    Record.fromEntries,
  ) as Record<DecIncKey, VoidDataReducer>

function group<Target extends TargetKey, Direction extends DirectionKey>(
  definitions: DefinitionGroup<Target, Direction>,
) {
  return pipe(
    definitions,
    Record.map(buildAction<DecIncKey<Target, Direction>>),
  ) as ActionGroup<Target, Direction>
}
