import type {Predicate} from 'effect'
import {type NonEmptyArray} from '#Array'
import type {BaseItem, VoidAction} from '#types'

export const codeJumpIds = [
  'firstCode',
  'lastCode',
  'decCode',
  'incCode',
] as const

export const nodeCountJumpIds = [
  'firstNodeCount',
  'decNodes',
  'incNodes',
  'lastNodeCount',
] as const

export const randomJumpIds = ['randomCode', 'randomNodes'] as const

export const setActionIds = ['setCode', 'setNodes'] as const

export type CodeJumpId = (typeof codeJumpIds)[number]
export type NodeCountJumpId = (typeof nodeCountJumpIds)[number]
export type RandomJumpId = (typeof randomJumpIds)[number]
export type SetActionId = (typeof setActionIds)[number]

export interface BaseAction<
  Id extends string,
  In extends unknown[] = [],
  Out = number[],
> extends BaseItem<Id> {
  apply: (...input: In) => Out
  disable:
    | [predicate: Predicate.Predicate<number[]>, disabledNote: string]
    | undefined
}

export interface ModifyAction<Id extends string = string>
  extends BaseAction<Id, [number[]]> {}

export const actionKeys = ['code', 'nodeCount', 'random'] as const

export type ActionKey = (typeof actionKeys)[number]

export type ActionMap = Record<ActionKey, NonEmptyArray<ModifyAction>>

export type PrimedActionMap = Record<ActionKey, NonEmptyArray<VoidAction>>
