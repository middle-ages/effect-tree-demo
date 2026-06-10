import {K} from '#Function'
import {primeStats} from '#model'
import {pluck} from '#Record'
import {
  asyncThunkCreator,
  buildCreateSlice,
  createSelector,
  type PayloadAction,
} from '@reduxjs/toolkit'
import {Array} from 'effect'
import {Codec} from 'effect-tree'
import {initialState, type SetDigitPayload, type TreeCode} from './action'
import {incDecReducers} from './decIncActions'
import {randomCodeReducers} from './randomActions'

const codeSelector = pluck('code')<TreeCode>
const treeSelector = createSelector([codeSelector], Codec.Prufer.decode)
const statsSelector = createSelector([codeSelector, treeSelector], primeStats)

export const codeSlice = buildCreateSlice({
  creators: {asyncThunk: asyncThunkCreator},
})({
  name: 'code',
  initialState,
  reducers: create => ({
    setCode: create.reducer(
      (state, {payload: code}: PayloadAction<number[]>) => ({
        ...state,
        code,
      }),
    ),
    setDigit: create.reducer(
      (state, {payload: {index, digit}}: PayloadAction<SetDigitPayload>) => ({
        ...state,
        code: Array.modify(state.code, index, K(digit)),
      }),
    ),
    setTreeIndex: create.reducer(
      ({code, ...state}, {payload: index}: PayloadAction<string>) => ({
        ...state,
        code: Codec.Prufer.fromOrdinal(
          BigInt(index),
          Codec.Prufer.computeNodeCount(code),
        ),
      }),
    ),
    setNodeCount: create.reducer(
      (state, {payload: nodeCount}: PayloadAction<number>) => ({
        ...state,
        code: Codec.Prufer.getFirstCodeFor(nodeCount),
      }),
    ),
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
