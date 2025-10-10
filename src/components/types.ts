export interface BaseItem<Id extends string = string> {
  id: Id
  label: string
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
  icon: string
}

export const simpleItem = (label: string): SelectItem => ({
  id: label,
  label,
  icon: '',
  title: '',
})
