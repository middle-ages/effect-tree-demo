import {toEntries} from '#Record'
import {Button} from '#components'
import type {PrimedModifyActionMap} from './types'

interface Props {
  modifyActions: PrimedModifyActionMap
}

export const Toolbar = ({modifyActions}: Props) => {
  return (
    <div className="flex flex-col gap-0.5 truncate *:grow-0 *:shrink-0">
      {toEntries(modifyActions).map(([id, button]) => (
        <Button key={id} {...button} />
      ))}
    </div>
  )
}
