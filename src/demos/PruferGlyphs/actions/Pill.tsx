import {toEntries} from '#Record'
import type {
  ModifyActionId,
  PillActionId,
  PrimedModifyActionMap,
  VoidAction,
} from '../actions'

interface Props {
  actions: Pick<PrimedModifyActionMap, PillActionId>
}

export const Toolbar = ({actions}: Props) => {
  return (
    <div className="flex gap-1">
      {toEntries(actions).map(([id, button]) => (
        <Button key={id} {...button} />
      ))}
    </div>
  )
}

const Button = ({
  id,
  label,
  note,
  apply: onClick,
  disable,
}: VoidAction<ModifyActionId>) => {
  const disabled: boolean = disable === undefined ? false : disable[0]
  const title: string = disabled && disable !== undefined ? disable[1] : note
  return (
    <button className="button" {...{id, title, onClick, disabled}}>
      {label}
    </button>
  )
}
