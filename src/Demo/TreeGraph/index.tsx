import {GraphView} from '#GraphView'
import type {StyledProps} from '#react/props'
import {selectSvg, useAppSelector} from '#store'

interface Props extends StyledProps {}

export const TreeGraph = (props: Props) => {
  const svg = useAppSelector(selectSvg)
  return <GraphView {...{...props, svg}} />
}
