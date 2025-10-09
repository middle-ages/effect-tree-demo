import type {VoidAction} from './types'

interface Props<Id extends string> extends VoidAction<Id> {}

export const Button = <Id extends string>({
  id,
  label,
  note,
  apply,
  disable,
}: Props<Id>) => {
  const disabled: boolean = disable === undefined ? false : disable[0]
  const title: string = disabled && disable !== undefined ? disable[1] : note
  return (
    <button
      className="button"
      {...{id, title, disabled}}
      onClick={() => {
        if (!disabled) {
          apply()
        }
      }}>
      {label}
    </button>
  )
}
