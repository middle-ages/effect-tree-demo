import {type NonEmptyArray} from '#Array'
import {type Tuple3} from '#Tuple'
import type {PointerEventHandler, ReactNode} from 'react'
import type {StyledProps} from '../util.js'

export interface BaseItem<Id extends string = string> {
  id: Id
  label: ReactNode
  title: string
}

/**
 * A primed action has all a component needs to display and run it.
 */
export interface VoidAction<Id extends string = string> extends BaseItem<Id> {
  apply: () => void
  disable: [isDisabled: boolean, disabledNote: string] | undefined
}

export interface SelectItem extends BaseItem {
  icon: ReactNode
}

export const simpleItem = (label: string): SelectItem => ({
  id: label,
  label,
  icon: '',
  title: '',
})

export interface MouseListener {
  onPointerDown?: PointerEventHandler
  onPointerUp?: PointerEventHandler
}

export interface PillProps extends StyledProps {
  actions: NonEmptyArray<VoidAction>
  isActive?: boolean
}

export interface MultiPressProps {
  actions: Tuple3<VoidAction>
  isActive: boolean
  listener: MouseListener
}
