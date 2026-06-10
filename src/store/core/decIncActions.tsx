import * as Array from '#Array'
import {K, pipe} from '#Function'
import * as icons from '#icons'
import {MAX_NODE_COUNT} from '#model'
import {fanout} from '#Pair'
import * as Record from '#Record'
import type {ReducerCreators} from '@reduxjs/toolkit'
import {Codec} from 'effect-tree'
import {isRepeatActionName, type CoreReducer, type CoreState} from '../data'
import {
  buildAction,
  type ActionGroup,
  type DecIncAction,
  type DecIncKey,
  type DecIncPayload,
  type DefinitionGroup,
  type DirectionKey,
  type TargetKey,
} from './action'
import {guard, maxNodeCountMessageBy} from './guard'
import {
  decHalfCode,
  decHalfNodeCount,
  decNodes,
  incHalfCode,
  incHalfNodeCount,
  prependDigits,
} from './helpers'
import {Repeater} from '#Repeater'

const {Prufer} = Codec

export type DecIncReducer = CoreReducer<DecIncPayload>

type DecIncActions = {
  [Target in TargetKey]: {
    [Direction in DirectionKey]: ActionGroup<Target, Direction>
  }
}

const repeatMessage = (
  <div className='mt-1 leading-4.5'>
    Hold for ½ a second or click the inner button (
    <Repeater.Inner.Thumbnail />) to repeat.
  </div>
)

const actions: DecIncActions = {
  code: {
    dec: group({
      firstCode: {
        label: icons.FirstCode,
        title: (
          <div className='max-w-35'>
            Jump to the first tree at this node count.
          </div>
        ),
        apply: Prufer.getFirstCode,
        guard: guard.first.code,
      },
      decHalfCode: {
        label: icons.DecHalfCode,
        canRepeat: true,
        apply: decHalfCode,
        guard: guard.first.code,
        title: (
          <div className='max-w-52'>
            <div>
              Jump backwards to <span className='serif'>½</span> the distance
              between the first Prüfer code for this node count and the Prüfer
              code of the current tree.
            </div>
            {repeatMessage}
          </div>
        ),
      },
      decCode: {
        label: icons.DecCode,
        canRepeat: true,
        apply: Prufer.previousCode,
        guard: guard.first.tree,
        title: (
          <div className='max-w-73'>
            <div>
              Step backwards to the previous tree. If this tree is the first in
              its node count remove a tree node and step to the last tree in the
              new node count.
            </div>
            {repeatMessage}
          </div>
        ),
      },
    }),
    inc: group({
      incCode: {
        label: icons.IncCode,
        canRepeat: true,
        apply: Prufer.nextCode,
        guard: guard.last.tree,
        title: (
          <div className='max-w-51'>
            <div>
              Step forwards to the next tree, adding a node in case this tree is
              the last tree for this node count.
            </div>
            {repeatMessage}
          </div>
        ),
      },
      incHalfCode: {
        label: icons.IncHalfCode,
        canRepeat: true,
        apply: incHalfCode,
        guard: guard.last.code,
        title: (
          <div className='max-w-60'>
            <div>
              Jump forwards ½ the distance between this Prüfer code and the
              final Prüfer code for this node count.
            </div>
            {repeatMessage}
          </div>
        ),
      },
      lastCode: {
        label: icons.LastCode,
        apply: Prufer.getLastCode,
        guard: guard.last.code,
        title: (
          <div className='w-35'>Jump to the last tree at this node count.</div>
        ),
      },
    }),
  },
  nodeCount: {
    dec: group({
      firstNodeCount: {
        label: icons.FirstNodeCount,
        title: (
          <div className='max-w-50'>
            Jump to smallest Prüfer encodable node count of{' '}
            <span className='font-serif'>2</span> nodes.
          </div>
        ),
        apply: K([]),
        guard: guard.first.nodeCount,
      },
      decHalfNodeCount: {
        label: icons.DecHalfNodeCount,
        canRepeat: true,
        title: (
          <div className='max-w-53'>
            <div>
              Cut node count by ½: clips the head half of the Prüfer code.
            </div>
            {repeatMessage}
          </div>
        ),
        apply: decHalfNodeCount,
        guard: guard.first.nodeCount,
      },
      decNodes: {
        label: icons.DecNodeCount,
        canRepeat: true,
        title: (
          <div className='max-w-51'>
            <div>
              Remove a tree node by clipping the head element of the Prüfer
              code.
            </div>
            {repeatMessage}
          </div>
        ),
        apply: decNodes,
        guard: guard.first.nodeCount,
      },
    }),
    inc: group({
      incNodes: {
        label: icons.IncNodeCount,
        canRepeat: true,
        title: (
          <div className='max-w-56'>
            <div>
              Add a node to the tree by prepending a single 𝟏 to its Prüfer
              code.
            </div>
            {repeatMessage}
          </div>
        ),
        apply: Array.prepend(1),
        guard: guard.last.nodeCount,
      },
      incHalfNodeCount: {
        label: icons.IncHalfNodeCount,
        canRepeat: true,
        title: (
          <div className='max-w-64'>
            <div>
              Jump to the node count at the mid-point of this node count and the{' '}
              {maxNodeCountMessageBy}
            </div>
            {repeatMessage}
          </div>
        ),
        apply: code => {
          const {nodeCount, previous} = incHalfNodeCount(code)
          return prependDigits(code, nodeCount, previous)
        },
        guard: guard.last.nodeCount,
      },
      lastNodeCount: {
        label: icons.LastNodeCount,
        title: (
          <div className='max-w-50'>
            Set to node count {maxNodeCountMessageBy}
          </div>
        ),
        apply: code =>
          prependDigits(code, MAX_NODE_COUNT, Prufer.computeNodeCount(code)),
        guard: guard.last.nodeCount,
      },
    }),
  },
}

export const decIncActions = {
  code: {
    dec: [
      actions.code.dec.decCode,
      actions.code.dec.decHalfCode,
      actions.code.dec.firstCode,
    ],
    inc: [
      actions.code.inc.incCode,
      actions.code.inc.incHalfCode,
      actions.code.inc.lastCode,
    ],
  },
  nodeCount: {
    dec: [
      actions.nodeCount.dec.decNodes,
      actions.nodeCount.dec.decHalfNodeCount,
      actions.nodeCount.dec.firstNodeCount,
    ],
    inc: [
      actions.nodeCount.inc.incNodes,
      actions.nodeCount.inc.incHalfNodeCount,
      actions.nodeCount.inc.lastNodeCount,
    ],
  },
} as const

export const decIncActionMap = {
  decCode: decIncActions.code.dec[0],
  decHalfCode: decIncActions.code.dec[1],
  firstCode: decIncActions.code.dec[2],

  incCode: decIncActions.code.inc[0],
  incHalfCode: decIncActions.code.inc[1],
  lastCode: decIncActions.code.inc[2],

  decNodes: decIncActions.nodeCount.dec[0],
  decHalfNodeCount: decIncActions.nodeCount.dec[1],
  firstNodeCount: decIncActions.nodeCount.dec[2],

  incNodes: decIncActions.nodeCount.inc[0],
  incHalfNodeCount: decIncActions.nodeCount.inc[1],
  lastNodeCount: decIncActions.nodeCount.inc[2],
}

const toReducer =
  (create: ReducerCreators<CoreState>) =>
  ({apply, id}: DecIncAction): CoreReducer<DecIncPayload> =>
    create.reducer<DecIncPayload>(
      ({code, repeatAction: _, ...state}, {payload: {isRepeating}}) => ({
        ...state,
        code: apply(code),
        repeatAction: isRepeatActionName(id) && isRepeating ? id : undefined,
      }),
    )

export const decIncReducers = (
  create: ReducerCreators<CoreState>,
): Record<DecIncKey, CoreReducer<DecIncPayload>> =>
  pipe(
    ['code', 'nodeCount'] as const,
    Array.flatMap(target =>
      pipe(
        ['dec', 'inc'] as const,
        Array.flatMap(direction => decIncActions[target][direction]),
      ),
    ),
    Array.map(fanout(Record.pluck('id'), toReducer(create))),
    Record.fromEntries,
  )

function group<Target extends TargetKey, Direction extends DirectionKey>(
  definitions: DefinitionGroup<Target, Direction>,
): ActionGroup<Target, Direction> {
  return pipe(
    definitions,
    Record.map(buildAction<DecIncKey<Target, Direction>>),
  ) as ActionGroup<Target, Direction>
}

/*
      title: <>{title} Hold for ½ of a second to repeat.</>,
      */
