import {apply0} from '#Function'
import {fanout} from '#Pair'
import {fromEntries, pluck} from '#Record'
import {unwords} from '#String'
import type {Tuple3} from '#Tuple'
import {MAX_NODE_COUNT, sampleNodeCountAndCode, samplePruferCode} from '#model'
import {Array, pipe, Tuple} from '#util'
import type {ReducerCreators} from '@reduxjs/toolkit'
import {toReducer, type Action, type RandomCodeKey} from './action'
import {type DataState, type VoidDataReducer} from './data'
import {randomGuard as guard, maxNodeCountMessage} from './guard'
import {randomNodes} from './helpers'

export const randomCodeActionNames = ['randomBoth', 'randomNodes'] as const
export type RandomCodeActionName = (typeof randomCodeActionNames)[number]

export type RandomCodeReducers = Record<RandomCodeKey, VoidDataReducer>

export const randomCodeActions: Tuple3<Action<RandomCodeKey>> = [
  {
    id: 'randomCode',
    label: 'Code',
    apply: samplePruferCode(),
    title: 'Jump to a random tree with the same node count.',
    guard,
  },
  {
    id: 'randomBoth',
    label: 'Both',
    apply: () =>
      pipe(MAX_NODE_COUNT, sampleNodeCountAndCode, apply0, Tuple.getSecond),
    title: unwords.spaced.rest(
      'Jump to a random tree in some random node count.',
      'Clicking is equivalent to clicking both “Code” & “Nodes”',
      'simultaneously.',
    ),
  },
  {
    id: 'randomNodes',
    label: 'Nodes',
    apply: randomNodes,
    title: unwords.spaced.rest(
      `Jump to a random node count between 2 and ${maxNodeCountMessage}`,
      'by adding or removing digits to/from the head of the current tree',
      'Prüfer code.',
    ),
  },
]

export const randomCodeReducers: (
  create: ReducerCreators<DataState>,
) => Record<RandomCodeKey, VoidDataReducer> = create =>
  pipe(
    randomCodeActions,
    Array.map(fanout(pluck('id'), toReducer(create))),
    fromEntries,
  ) as Record<RandomCodeKey, VoidDataReducer>
