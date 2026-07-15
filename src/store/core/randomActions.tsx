import {apply0} from '#Function'
import {fanout} from '#Pair'
import {fromEntries, pluck} from '#Record'
import type {Tuple3} from '#Tuple'
import {MAX_NODE_COUNT, sampleNodeCountAndCode, samplePruferCode} from '#model'
import {Array, pipe, Tuple} from '#util'
import type {ReducerCreators} from '@reduxjs/toolkit'
import {type CoreState, type VoidCoreReducer} from '../data'
import {type Action, type NoPayloadAction, type RandomCodeKey} from './action'
import {randomGuard as guard, maxNodeCountMessage} from './guard'
import * as helpers from './helpers'

export const randomCodeActionNames = ['randomBoth', 'randomNodes'] as const
export type RandomCodeActionName = (typeof randomCodeActionNames)[number]

export type RandomCodeReducers = Record<RandomCodeKey, VoidCoreReducer>

export type RandomCodeActions = {
  [Name in RandomCodeActionName]: NoPayloadAction<`core/${Name}`>
}

const dice = (
  <span
    style={{
      filter: 'drop-shadow(0.5px 0.5px 1.5px #883d)',
    }}
    className='mr-0.5 inline-block -translate-y-px scale-130 animate-shake-dice'>
    🎲
  </span>
)

export const randomCodeActions: Tuple3<Action<RandomCodeKey>> = [
  {
    id: 'randomCode',
    label: 'Prüfer Code',
    apply: samplePruferCode(),
    title: (
      <div className='max-w-45'>
        {dice} Jump to a random tree keeping the same node count.
      </div>
    ),
    guard,
  },
  {
    id: 'randomBoth',
    label: 'Both',
    apply: () =>
      pipe(MAX_NODE_COUNT, sampleNodeCountAndCode, apply0, Tuple.getSecond),
    title: (
      <div className='max-w-62'>
        {dice} Jump to a random tree at a random node count. Clicks both the{' '}
        <span className='emphasis'>Prüfer Code</span> and the{' '}
        <span className='emphasis'>Node Count</span> buttons simultaneously.
      </div>
    ),
  },
  {
    id: 'randomNodes',
    label: 'Node Count',
    apply: helpers.randomNodes,
    title: (
      <div className='max-w-70'>
        {dice} Jump to a random node count between{' '}
        <span className='font-serif'>2</span> and the node count{' '}
        {maxNodeCountMessage} by adding/removing digits to/from the head of the
        Prüfer code for the current tree.
      </div>
    ),
  },
]

const [randomCode, randomBoth, randomNodes] = randomCodeActions as [
  Action<'randomCode'>,
  Action<'randomBoth'>,
  Action<'randomNodes'>,
]

export const randomCodeActionMap = {
  randomCode,
  randomBoth,
  randomNodes,
} as const

const toVoidReducer =
  (create: ReducerCreators<CoreState>) =>
  <Id extends string>({apply}: Action<Id>): VoidCoreReducer =>
    create.reducer(({code, ...state}) => ({...state, code: apply(code)}))

export const randomCodeReducers: (
  create: ReducerCreators<CoreState>,
) => Record<RandomCodeKey, VoidCoreReducer> = create =>
  pipe(
    randomCodeActions,
    Array.map(fanout(pluck('id'), toVoidReducer(create))),
    fromEntries,
  )
