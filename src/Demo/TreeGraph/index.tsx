import {withMeasure} from '#compinators'
import {GraphView} from '#GraphView'
import {dotToSvg} from '#model'
import type {StyledProps} from '#react/props'
import {selectDot, useAppSelector} from '#store'
import type {UseMeasure} from '#useMeasure'
import {Graphviz} from '@hpcc-js/wasm-graphviz'
import {use} from 'react'

const graphvizLoading: Promise<Graphviz> = Graphviz.load()

interface Props extends UseMeasure, StyledProps {}

const Measured = ({ref, sizePx, className, style}: Props) => {
  const graphviz = use(graphvizLoading)
  const dot = useAppSelector(selectDot)
  const {svg} = dotToSvg(graphviz)(dot, sizePx)
  return <GraphView {...{style, className, svg, ref}} />
}

export const TreeGraph = withMeasure(Measured)
