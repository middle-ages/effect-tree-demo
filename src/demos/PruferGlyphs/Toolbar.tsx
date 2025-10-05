import {toEntries} from '#Record'
import type {ModifyActionId, PrimedModifyActionMap, VoidAction} from './actions'

interface Props {
  modifyActions: PrimedModifyActionMap
}

export const Toolbar = ({modifyActions}: Props) => {
  return (
    <div className="flex flex-col gap-1 truncate">
      {toEntries(modifyActions).map(([id, button]) => (
        <Button key={id} {...button} />
      ))}
    </div>
  )
}

const Button = ({
  id,
  label,
  note,
  apply,
  disable,
}: VoidAction<ModifyActionId>) => {
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
