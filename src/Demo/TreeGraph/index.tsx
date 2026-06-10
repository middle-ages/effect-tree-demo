import {GraphView} from '#GraphView'
import {TreeCode} from '#model'
import {useAppSelector} from '#store'
import type {StyledProps} from '#util'

export const TreeGraph = ({className, style}: StyledProps) => {
  const dot = useAppSelector(TreeCode.selectDot)
  return <GraphView {...{style, className, dot}} />
}
