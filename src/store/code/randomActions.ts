import {apply0, constant, noop} from '#Function'
import {pairMap} from '#Pair'
import {fromEntries} from '#Record'
import {unlines} from '#String'
import type {Tuple3} from '#Tuple'
import {
  MAX_NODE_COUNT,
  sampleNodeCount,
  sampleNodeCountAndCode,
  samplePruferCode,
} from '#model'
import {Array, pipe, Tuple} from '#util'
import type {ReducerCreators} from '@reduxjs/toolkit'
import {Codec} from 'effect-tree'
import {
  toBuilderEntry,
  type Modifier,
  type ModifyAction,
  type RootDataState,
  type StateBuilder,
} from '../state'
import {maxNodeCountMessage} from './state'

export type RandomCodeKey = 'randomCode' | 'randomBoth' | 'randomNodes'

export type RandomCodeReducers = Record<RandomCodeKey, Modifier>

export const randomCodeActions: Tuple3<ModifyAction<RandomCodeKey>> = [
  {
    id: 'randomCode',
    label: 'Code',
    title: 'Jump to a random tree with the same node count.',
    apply: samplePruferCode(),
    buildState: (code: number[]) =>
      Codec.Prufer.computeNodeCount(code) === 2
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
    title: unlines.rest(
      'Jump to a random tree in some random node count. ',
      'Clicking is equivalent to clicking both “Code” & “Nodes”',
      'simultaneously.',
    ),
    buildState: noop as StateBuilder,
    apply: () =>
      pipe(MAX_NODE_COUNT, sampleNodeCountAndCode, apply0, Tuple.getSecond),
  },
  {
    id: 'randomNodes',
    label: 'Nodes',
    title: unlines.rest(
      `Jump to a random node count between 2 and ${maxNodeCountMessage} `,
      'by adding or removing digits to/from the head of the current tree ',
      'Prüfer code.',
    ),
    buildState: noop as StateBuilder,
    apply: (code: number[]) => {
      const oldCount = Codec.Prufer.computeNodeCount(code)
      const tryCount = sampleNodeCount(MAX_NODE_COUNT)()

      // Avoid collisions: we always want a different node count, unless
      // MAX_NODE_COUNT===2.
      const newCount =
        tryCount +
        (oldCount === tryCount
          ? tryCount === MAX_NODE_COUNT
            ? -1
            : MAX_NODE_COUNT === 2
              ? 0
              : 1
          : 0)

      const [oldDigitCount, newDigitCount] = pipe(
        [oldCount, newCount],
        pairMap(Codec.Prufer.codeCount),
      )

      return oldDigitCount < newDigitCount
        ? [
            ...Array.range(1, newDigitCount - oldDigitCount).map(constant(1)),
            ...code,
          ]
        : code.slice(0, newDigitCount)
    },
  },
]

export const randomCodeReducers = (create: ReducerCreators<RootDataState>) =>
  pipe(
    randomCodeActions,
    Array.map(toBuilderEntry(create)),
    fromEntries,
  ) as RandomCodeReducers
