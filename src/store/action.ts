import type {EndoOf} from '#Function'
import * as Record from '#Record'
import type {RootDataState} from '#store'
import type {BaseItem} from '#types'
import type {
  ActionCreatorWithoutPayload,
  ReducerCreators,
} from '@reduxjs/toolkit'
import type {VoidDataReducer} from './data'
import {type Guard} from './guard'
import type {Simplify} from 'effect/Types'

/**
 * A tree action that modifies the current tree code and serves as a model for
 * some button.
 */
export interface Action<Id extends string> extends BaseItem<Id> {
  /** Actual state mutation run by this action. */
  apply: EndoOf<number[]>

  /** Optionally true if this action can be repeated. */
  canRepeat?: boolean

  /** Optional guard used for computing disabled state and disabled note. */
  guard?: Guard
}

export const directionKeys = ['dec', 'inc'] as const
export const targetKeys = ['code', 'nodeCount'] as const

export type DirectionKey = (typeof directionKeys)[number]
export type TargetKey = (typeof targetKeys)[number]
export type ActionMap = typeof actionMap
export type RandomCodeKey = (typeof actionMap.random)[number]
export type AnyDecIncKey = Simplify<DecIncKey>

export type DecIncKey<
  Target extends TargetKey = TargetKey,
  Direction extends DirectionKey = DirectionKey,
> = ActionMap['decInc'][Target][Direction][number]

export type RandomAction = Action<RandomCodeKey>
export type DecIncAction = CodeAction | NodeCountAction

export type CodeAction<Direction extends DirectionKey = DirectionKey> = Action<
  DecIncKey<'code', Direction>
>

export type NodeCountAction<Direction extends DirectionKey = DirectionKey> =
  Action<DecIncKey<'nodeCount', Direction>>

export type NoPayloadAction<Id extends string> = ActionCreatorWithoutPayload<Id>
export type NoPayloadActionName = (typeof noPayloadActionNames)[number]

export type NoPayloadActions = {
  [Name in NoPayloadActionName]: NoPayloadAction<`data/${Name}`>
}

/**
 * ```ts
 * type DecCodeActions = DirectionTargetActions<'dec', 'code'>
 * // DecCodeActions = 'firstCode' | 'decHalfCode' | 'decCode'
 * ```
 */
export type ActionGroup<
  Target extends TargetKey = TargetKey,
  Direction extends DirectionKey = DirectionKey,
> = {[Id in DecIncKey<Target, Direction>]: Action<Id>}

export type DefinitionGroup<
  Target extends TargetKey = TargetKey,
  Direction extends DirectionKey = DirectionKey,
> = {[Id in DecIncKey<Target, Direction>]: Omit<Action<Id>, 'id'>}

export type ActionList<
  Target extends TargetKey = TargetKey,
  Direction extends DirectionKey = DirectionKey,
> = Record.TypedValues<ActionGroup<Target, Direction>>

export const actionMap = {
  decInc: {
    code: {
      dec: ['firstCode', 'decHalfCode', 'decCode'],
      inc: ['incCode', 'incHalfCode', 'lastCode'],
    },
    nodeCount: {
      dec: ['firstNodeCount', 'decHalfNodeCount', 'decNodes'],
      inc: ['incNodes', 'incHalfNodeCount', 'lastNodeCount'],
    },
  },
  random: ['randomCode', 'randomBoth', 'randomNodes'],
} as const

export const decIncActionNames = [
  ...actionMap.decInc.code.dec,
  ...actionMap.decInc.code.inc,
  ...actionMap.decInc.nodeCount.dec,
  ...actionMap.decInc.nodeCount.inc,
] as const

export const randomActionNames = actionMap.random

export const noPayloadActionNames = [
  ...decIncActionNames,
  ...randomActionNames,
] as const

export const buildAction = <Id extends string>(
  action: Omit<Action<Id>, 'id'>,
  id: Id,
): Action<Id> => ({...action, id})

/**
 * Convert an `Action` into a `VoidDataReducer`.
 */
export const toReducer =
  (create: ReducerCreators<RootDataState>) =>
  <Id extends string>({apply}: Action<Id>): VoidDataReducer =>
    create.reducer(({code, ...state}) => ({...state, code: apply(code)}))
