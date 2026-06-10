import {tupled} from '#Function'
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
import {mapEntries, withKey} from '#Record'
import {MAX_NODE_COUNT} from '#tree'
import {Array, flow, pipe, Tuple} from '#util'
import {Codec} from 'effect-tree'
import {maxNodeCountMessage, stateBuilders} from './state'
import type {ModifyAction} from './types'
import type {Tuple3} from '#Tuple'

const {
  Prufer: {
    computeNodeCount,
    fromOrdinal,
    getFirstCode,
    getFirstCodeFor,
    getLastCode,
    labeledTreeCount,
    nextCode,
    previousCode,
    toOrdinal,
  },
} = Codec

export const decIncJumps = {
  code: {
    dec: ['firstCode', 'decHalfCode', 'decCode'],
    inc: ['incCode', 'incHalfCode', 'lastCode'],
  } as const satisfies Record<DirectionKey, readonly string[]>,
  nodeCount: {
    dec: ['firstNodeCount', 'decHalfNodeCount', 'decNodes'],
    inc: ['incNodes', 'incHalfNodeCount', 'lastNodeCount'],
  } as const satisfies Record<DirectionKey, readonly string[]>,
} as const satisfies Record<JumpKey, unknown>

const define =
  <Jump extends JumpKey>(jump: Jump) =>
  <Direction extends DirectionKey>(direction: Direction) =>
  (
    definitions: Record<
      DecIncJumpKey<Jump, Direction>,
      Omit<ModifyAction, 'buildState' | 'id'>
    >,
  ) =>
    pipe(
      definitions,
      mapEntries((definition, id) => [
        id,
        {id, buildState: stateBuilders[jump][direction], ...definition},
      ]),
      withKey(direction),
    ) as Record<Direction, DirectionActions<Jump, Direction>>

const [defineCode, defineNodeCount] = [define('code'), define('nodeCount')]

const decIncActions: DecIncActions = {
  code: {
    ...defineCode('dec')({
      firstCode: {
        label: FirstCode,
        title: 'Jump to the first code in the current node count.',
        apply: getFirstCode,
      },
      decHalfCode: {
        label: DecHalfCode,
        canRepeat: true,
        title: 'Jump backwards to ½ of the current Prüfer code.',
        apply: flow(toOrdinal, Tuple.mapFirst(bigHalf), tupled(fromOrdinal)),
      },
      decCode: {
        label: DecCode,
        canRepeat: true,
        title: 'Step back to previous tree.',
        apply: previousCode,
      },
    }),
    ...defineCode('inc')({
      incCode: {
        label: IncCode,
        canRepeat: true,
        title: 'Step forwards to the next tree.',
        apply: nextCode,
      },
      incHalfCode: {
        label: IncHalfCode,
        canRepeat: true,
        title:
          'Jump forwards ½ the distance between this code ' +
          'and the last code for this node count.',
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
      lastCode: {
        label: LastCode,
        title: 'Jump to the last tree in current node count.',
        apply: getLastCode,
      },
    }),
  },
  nodeCount: {
    ...defineNodeCount('dec')({
      firstNodeCount: {
        label: FirstNodeCount,
        title: 'Set to smallest Prüfer encodable node count of 2 nodes.',
        apply: () => [],
      },
      decHalfNodeCount: {
        label: DecHalfNodeCount,
        canRepeat: true,
        title: 'Cut node count by ½: clips half of the Prüfer code.',
        apply: code => {
          const halfLength = Math.max(1, floorHalf(code.length))
          return code
            .slice(0, halfLength - 1)
            .map(n => Math.min(n, halfLength) + 1)
        },
      },
      decNodes: {
        label: DecNodeCount,
        canRepeat: true,
        title: 'Remove a tree node: clips head element of the Prüfer code.',
        apply: code => {
          const length = code.length + 1
          return pipe(
            code,
            Array.drop(1),
            Array.map(n => Math.min(n, length)),
          )
        },
      },
    }),

    ...defineNodeCount('inc')({
      incNodes: {
        label: IncNodeCount,
        canRepeat: true,
        title: 'Add a node to the tree. Prepends a 1 to the code.',
        apply: Array.prepend(1),
      },
      incHalfNodeCount: {
        label: IncHalfNodeCount,
        canRepeat: true,
        title:
          'Jump to the node count at the mid-point of this node count and ' +
          `${maxNodeCountMessage}.`,
        apply: code => {
          const {nodeCount, old} = computeIncHalfNodeCount(code)
          return pipe(
            1,
            Array.replicate(nodeCount - old),
            Array.prependAll(code),
          )
        },
      },
      lastNodeCount: {
        label: LastNodeCount,
        title: `Set to node count ${maxNodeCountMessage}.`,
        apply: () => getFirstCodeFor(MAX_NODE_COUNT),
      },
    }),
  },
}

const computeIncHalfNodeCount = (
  code: number[],
): {old: number; nodeCount: number} => {
  const old = computeNodeCount(code)
  return {
    old,
    nodeCount:
      old > MAX_NODE_COUNT - 1
        ? MAX_NODE_COUNT
        : old + floorHalf(MAX_NODE_COUNT - old),
  }
}

export type DirectionKey = 'dec' | 'inc'
export type JumpKey = 'code' | 'nodeCount'

export type DecIncJumpKey<
  Jump extends JumpKey,
  Direction extends DirectionKey,
> = (typeof decIncJumps)[Jump][Direction][number]

export type DecIncActions = {
  [Jump in JumpKey]: {
    [Direction in DirectionKey]: DirectionActions<Jump, Direction>
  }
}

export type DirectionActions<
  Jump extends JumpKey,
  Direction extends DirectionKey,
> = {
  [Id in DecIncJumpKey<Jump, Direction>]: ModifyAction<Id>
}

export const getDecIncActions =
  <const Jump extends JumpKey>(jump: Jump) =>
  <const Direction extends DirectionKey>(direction: Direction) =>
    Object.values(decIncActions[jump][direction]) as unknown as Tuple3<
      ModifyAction<DecIncJumpKey<Jump, Direction>>
    >
