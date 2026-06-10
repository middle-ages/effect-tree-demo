import type {EndoOf} from '#Function'
import type {BaseItem, DisabledProps} from '#types'
import type {CaseReducer, ReducerCreators} from '@reduxjs/toolkit'

/**
 * A function that builds the state for an action button from the current tree.
 */
export interface StateBuilder {
  (code: number[]): DisabledProps
}

/**
 * A tree action that modifies the current tree code.
 */
export interface ModifyAction<Id extends string> extends BaseItem<Id> {
  buildState: StateBuilder
  apply: EndoOf<number[]>
  canRepeat?: boolean
}

export interface TreeCode {
  code: number[]
}

/**
 * A reducer that sets the tree code and requires a new tree code.
 */
export type Setter = CaseReducer<TreeCode, {payload: number[]; type: string}>

/**
 * A reducer that applies some function on the current tree code and requires no
 * payload.
 */
export type Modifier = CaseReducer<TreeCode, {payload: void; type: string}>

export const initialState: TreeCode = {code: [1, 2, 3]}

export interface SetDigitPayload {
  digit: number
  index: number
}

/**
 * Convert a `ModifyAction` into a `Modifier`.
 */
export const toBuilderEntry =
  (create: ReducerCreators<TreeCode>) =>
  <Id extends string>({id, apply}: ModifyAction<Id>): [Id, Modifier] => [
    id,
    create.reducer(({code, ...state}: TreeCode) => ({
      ...state,
      code: apply(code),
    })),
  ]
