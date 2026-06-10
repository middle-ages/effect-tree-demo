import type {
  KeyboardEventHandler,
  MouseEventHandler,
  PointerEventHandler,
  ReactNode,
} from 'react'

export interface BaseItem<Id extends string = string> {
  id: Id
  label: ReactNode
  title: string
}

export interface DisabledProps {
  isDisabled: boolean
  disabledNote?: string
}

export const disabledProps = (disabledNote: string): DisabledProps => ({
  isDisabled: true,
  disabledNote,
})

export const enabledProps: DisabledProps = {isDisabled: false}

export interface DisabledItem<Id extends string = string>
  extends BaseItem<Id>,
    DisabledProps {}

export interface SelectItem extends BaseItem {
  icon: ReactNode
}

export const simpleItem = (label: string): SelectItem => ({
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
