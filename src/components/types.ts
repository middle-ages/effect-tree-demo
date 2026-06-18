import type {StyledPropsWithChildren} from '#react'
import type {ReactNode} from 'react'

export interface BaseItem<Id extends string = string, LabelType = ReactNode> {
  id: Id
  label: LabelType
  title: string
}

export interface DisabledProps {
  isDisabled: boolean
  disabledNote?: string | undefined
}

export interface DisabledItemProps<Id extends string = string>
  extends Omit<BaseItem<Id>, 'label'>, DisabledProps, StyledPropsWithChildren {}

export interface SelectItem<Id extends string = string> extends BaseItem<Id> {
  icon: ReactNode
}
