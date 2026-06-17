import {K} from '#Function'
import {primeStats} from '#model'
import {pluck} from '#Record'
import {
  asyncThunkCreator,
  buildCreateSlice,
  createSelector,
  type ReducerCreators,
} from '@reduxjs/toolkit'
import {Array} from 'effect'
import {Codec} from 'effect-tree'
import {
  initialState,
  type ReducerOf,
  type SetDigitPayload,
  type TreeCode,
} from './action'
import {incDecReducers} from './decIncActions'
import {randomCodeReducers} from './randomActions'

interface BuildReducer<A> {
  (create: ReducerCreators<TreeCode>): ReducerOf<A>
}

export type CodeSlice = typeof codeSlice

const codeSelector = pluck('code')<TreeCode>

const treeSelector = createSelector([codeSelector], Codec.Prufer.decode)

const statsSelector = createSelector(
  [codeSelector, treeSelector],
  primeStats.untupled,
)

const setCodeReducer: BuildReducer<number[]> = create =>
  create.reducer<number[]>((state, {payload: code}) => ({...state, code}))

const setDigitReducer: BuildReducer<SetDigitPayload> = create =>
  create.reducer<SetDigitPayload>((state, {payload: {index, digit}}) => ({
    ...state,
    code: Array.modify(state.code, index, K(digit)),
  }))

const setTreeIndexReducer: BuildReducer<string> = create =>
  create.reducer<string>(({code, ...state}, {payload: index}) => ({
    ...state,
    code: Codec.Prufer.fromOrdinal(
      BigInt(index),
      Codec.Prufer.computeNodeCount(code),
    ),
  }))

const setNodeCountReducer: BuildReducer<number> = create =>
  create.reducer<number>((state, {payload: nodeCount}) => ({
    ...state,
    code: Codec.Prufer.getFirstCodeFor(nodeCount),
  }))

export const codeSlice = buildCreateSlice({
  creators: {asyncThunk: asyncThunkCreator},
})({
  name: 'code',
  initialState,
  reducers: create => ({
    setCode: setCodeReducer(create),
    setDigit: setDigitReducer(create),
    setTreeIndex: setTreeIndexReducer(create),
    setNodeCount: setNodeCountReducer(create),
    ...incDecReducers(create),
    ...randomCodeReducers(create),
  }),
  selectors: {
    selectCode: codeSelector,
    selectTree: treeSelector,
    selectStats: statsSelector,
    selectDot: createSelector([treeSelector], Codec.treeToGraphViz),
  },
})

export const {
  setCode,
  setDigit,

  setTreeIndex,
  setNodeCount,

  firstCode,
  decHalfCode,
  decCode,

  incCode,
  incHalfCode,
  lastCode,

  firstNodeCount,
  decHalfNodeCount,
  decNodes,

  incNodes,
  incHalfNodeCount,
  lastNodeCount,

  randomCode,
  randomBoth,
  randomNodes,
} = codeSlice.actions

export const {selectCode, selectTree, selectStats, selectDot} =
  codeSlice.selectors
