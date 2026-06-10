import type {StyledPropsWithChildren} from '#react/props'
import type {ReactNode} from 'react'

export interface BaseItem<Id extends string = string, LabelType = ReactNode> {
  id: Id
  label: LabelType
  title?: ReactNode
}

export interface DisabledProps {
  isDisabled?: boolean
  disabledNote?: ReactNode
}

export interface DisabledItemProps<Id extends string = string>
  extends Omit<BaseItem<Id>, 'label'>, DisabledProps, StyledPropsWithChildren {}

export interface SelectItem<Id extends string = string> extends Omit<
  BaseItem<Id>,
  'title'
> {
  icon: ReactNode
  title: string
}
