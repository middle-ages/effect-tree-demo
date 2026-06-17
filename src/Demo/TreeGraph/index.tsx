import {GraphView} from '#GraphView'
import {selectDot, useAppSelector} from '#store'
import type {StyledProps} from '#util'

export const TreeGraph = ({className, style}: StyledProps) => {
  const dot = useAppSelector(selectDot)
  return <GraphView {...{style, className, dot}} />
}
