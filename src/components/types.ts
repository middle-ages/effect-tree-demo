import type {StyledPropsWithChildren} from '#react'
import type {
  KeyboardEventHandler,
  MouseEventHandler,
  PointerEventHandler,
  ReactNode,
} from 'react'

export interface BaseItem<Id extends string = string, LabelType = ReactNode> {
  id: Id
  label: LabelType
  title: string
}

export interface DisabledProps {
  isDisabled: boolean
  disabledNote?: string | undefined
}

export const disabledProps = (disabledNote: string): DisabledProps => ({
  isDisabled: true,
  disabledNote,
})

export const enabledProps: DisabledProps = {isDisabled: false}

export interface DisabledItemProps<Id extends string = string>
  extends Omit<BaseItem<Id>, 'label'>, DisabledProps, StyledPropsWithChildren {}

export interface SelectItem<Id extends string = string> extends BaseItem<Id> {
  icon: ReactNode
}

export const simpleItem = <const Id extends string = string>(
  label: Id,
): SelectItem => ({
  id: label,
  label,
  icon: '',
  title: '',
})

export interface ButtonEventListener {
  onPointerDown: PointerEventHandler<HTMLButtonElement>
  onPointerUp: PointerEventHandler<HTMLButtonElement>
  onClick: MouseEventHandler<HTMLButtonElement>
}

export interface KeyboardEventListener<E extends HTMLElement = HTMLElement> {
  onKeyUp: KeyboardEventHandler<E>
  onKeyDown: KeyboardEventHandler<E>
}
