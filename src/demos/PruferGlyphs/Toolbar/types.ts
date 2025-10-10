import type {Predicate} from 'effect'
import type {BaseItem, VoidAction} from '#components'

export const codePillActionIds = [
  'firstCode',
  'lastCode',
  'decCode',
  'incCode',
] as const

export const nodePillActionIds = ['decNodes', 'incNodes'] as const

export const actionIds = [
  ...codePillActionIds,
  ...nodePillActionIds,
  'randomCode',
  'randomNodes',
] as const

export const setActionIds = ['setCode', 'setNodes'] as const

export type CodePillActionId = (typeof codePillActionIds)[number]
export type NodePillActionId = (typeof nodePillActionIds)[number]
export type ModifyActionId = (typeof actionIds)[number]
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

export interface ModifyAction extends BaseAction<ModifyActionId, [number[]]> {}

export interface ModifyActionMap extends Record<ModifyActionId, ModifyAction> {}

export interface PrimedModifyActionMap
  extends Record<ModifyActionId, VoidAction<ModifyActionId>> {}
