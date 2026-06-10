import {type UseMeasure} from '#useMeasure'
import {useMergeRefPair} from '#useMergeRefs'
import {useZoomPan} from '#useZoomPan'
import {PointPx, type StyledProps} from '#util'
import {Graphviz} from '@hpcc-js/wasm-graphviz'
import {use, useMemo} from 'react'
import {twMerge} from 'tailwind-merge'
import {dotToSvg} from './dotToSvg'
import {withMeasure} from '#compinators'

interface Props extends UseMeasure, StyledProps {
  dot: string
}

const graphvizLoading: Promise<Graphviz> = Graphviz.load()

const Measured = ({
  ref: measureRef,
  sizePx: availablePx,
  dot,
  className,
  style,
}: Props) => {
  const graphviz = use(graphvizLoading)

  const {svg} = useMemo(
    () => dotToSvg(graphviz)(dot, availablePx),
    [availablePx, dot, graphviz],
  )

  const {ref: zoomPanRef, isDragging, scale, translatePx, reset} = useZoomPan()

  const transform = [
    PointPx.translate(translatePx),
    `scale(${scale.toFixed(2)})`,
  ].join(' ')

  const ref = useMergeRefPair(measureRef, zoomPanRef)

  return (
    <div
      onDoubleClick={reset}
      className={twMerge(
        'flex fill-container justify-center',
        isDragging ? 'cursor-grabbing' : 'cursor-grab',
      )}
      {...{ref}}>
      <div
        className={twMerge(
          'origin-top-left',
          !isDragging && 'dom-play ease-linear',
          className,
        )}
        dangerouslySetInnerHTML={{__html: svg}}
        style={{transform, ...style}}
      />
    </div>
  )
}

export const GraphView = withMeasure(Measured)
