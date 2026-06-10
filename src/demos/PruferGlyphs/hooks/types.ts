import {type StateEffect} from '#react'
import type {BaseItem, DisabledProps} from '#types'

export type CodeStateEffect = StateEffect<'code', number[]>

export interface StateBuilder {
  (code: number[]): DisabledProps
}

export interface ModifyAction<
  Id extends string = string,
  In extends unknown[] = number[],
  Out = number[],
> extends BaseItem<Id> {
  buildState: StateBuilder
  apply: (input: In) => Out
  canRepeat?: boolean
}
