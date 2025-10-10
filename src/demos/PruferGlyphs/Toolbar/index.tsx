import {toEntries} from '#Record'
import {Button} from '#components'
import type {PrimedModifyActionMap} from './types'

interface Props {
  modifyActions: PrimedModifyActionMap
}

export const Toolbar = ({modifyActions}: Props) => {
  return (
    <div className="flex flex-col gap-1 *:flex-none">
      {toEntries(modifyActions).map(([id, button]) => (
        <Button key={id} {...button} />
      ))}
    </div>
  )
}
