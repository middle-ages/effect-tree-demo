import type {Predicate} from 'effect'

export const pillActionIds = [
  'firstCode',
  'lastCode',
  'decCode',
  'incCode',
] as const

export const modifyActionIds = [
  ...pillActionIds,
  'decNodes',
  'incNodes',
] as const

export const setActionIds = [
  'setCode',
  'randomCode',
  'setNodes',
  'randomNodes',
] as const

export type PillActionId = (typeof pillActionIds)[number]
export type ModifyActionId = (typeof modifyActionIds)[number]
export type SetActionId = (typeof setActionIds)[number]

export interface BaseAction<Id, In extends unknown[] = [], Out = number[]> {
  id: Id
  label: string
  note: string
  apply: (...input: In) => Out
  disable:
    | [predicate: Predicate.Predicate<number[]>, disabledNote: string]
    | undefined
}

export interface VoidAction<Id>
  extends Omit<BaseAction<Id, [], void>, 'disable'> {
  disable: [isDisabled: boolean, disabledNote: string] | undefined
}

export interface ModifyAction extends BaseAction<ModifyActionId, [number[]]> {}
export interface ModifyActionMap extends Record<ModifyActionId, ModifyAction> {}

export interface PrimedModifyActionMap
  extends Record<ModifyActionId, VoidAction<ModifyActionId>> {}
