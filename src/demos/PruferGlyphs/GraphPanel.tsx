import type {Tree} from 'effect-tree'
import {TreeGraphView} from '#TreeGraphView'

interface Props {
  tree: Tree<number>
}

export const GraphPanel = ({tree}: Props) => {
  return (
    <div className="mx-1 overflow-auto max-container-h">
      <TreeGraphView {...{tree}} />
    </div>
  )
}
