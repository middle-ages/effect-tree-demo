import type {ModifyActionId, VoidAction} from './types'

interface Props extends VoidAction<ModifyActionId> {}

export const Button = ({id, label, note, apply, disable}: Props) => {
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
