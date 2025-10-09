/**
 * A primed action has all a component needs to display and run it.
 */
export interface VoidAction<Id extends string> {
  id: Id
  label: string
  note: string
  apply: () => void
  disable: [isDisabled: boolean, disabledNote: string] | undefined
}
