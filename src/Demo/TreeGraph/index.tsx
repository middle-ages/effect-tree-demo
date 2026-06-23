import {GraphView} from '#GraphView'
import type {StyledProps} from '#react/props'
import {selectComputedSvg, useAppSelector} from '#store'

interface Props extends StyledProps {}

export const TreeGraph = (props: Props) => {
  const svg = useAppSelector(selectComputedSvg)
  return <GraphView {...{...props, svg}} />
}
