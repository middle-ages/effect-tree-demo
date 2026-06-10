import {apply0, noop} from '#Function'
import {
  MAX_NODE_COUNT,
  sampleNodeCount,
  sampleNodeCountAndCode,
  samplePruferCode,
} from '#tree'
import {type Tuple3} from '#Tuple'
import {pipe, Tuple, type Dispatcher} from '#util'
import {Codec} from 'effect-tree'
import {maxNodeCountMessage} from './state'
import type {ModifyAction, StateBuilder} from './types'

export * from './decIncActions'
export type * from './types'

export type RandomCodeKey = 'randomCode' | 'randomBoth' | 'randomNodes'

export const randomCodeActions = [
  {
    id: 'randomCode',
    label: 'Code',
    title: 'Jump to a random tree with the same number of nodes.',
    apply: samplePruferCode(),
    buildState: (code: number[]) =>
      Codec.Prufer.isFirstCode(code)
        ? {
            isDisabled: true,
            disabledNote:
              'Nowhere to jump: there is only a single tree with two nodes.',
          }
        : {isDisabled: false},
  },
  {
    id: 'randomBoth',
    label: 'Both',
    title: `Jump to a random tree in some random node count. Clicking is equivalent to clicking both “Nodes” & “Code”.`,
    buildState: noop as StateBuilder,
    apply: () =>
      pipe(MAX_NODE_COUNT, sampleNodeCountAndCode, apply0, Tuple.getSecond),
  },
  {
    id: 'randomNodes',
    label: 'Nodes',
    title: `Set a random node count between 2 and ${maxNodeCountMessage}.`,
    buildState: noop as StateBuilder,
    apply: () =>
      pipe(
        MAX_NODE_COUNT,
        sampleNodeCount,
        apply0,
        Codec.Prufer.getFirstCodeFor,
      ),
  },
] as const satisfies Tuple3<ModifyAction<RandomCodeKey>>

export const buildSetNodeCount =
  (setCode: Dispatcher<number[]>) =>
  (nodeCount: number): void => {
    pipe(nodeCount, Codec.Prufer.getFirstCodeFor, setCode)
  }

export const buildSetTreeIndex =
  (setCode: Dispatcher<number[]>) =>
  (index: string): void => {
    setCode(code =>
      Codec.Prufer.fromOrdinal(
        BigInt(index),
        Codec.Prufer.computeNodeCount(code),
      ),
    )
  }
