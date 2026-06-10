import {useZoomPan} from '#useZoomPan'
import {type StyledProps} from '#react/props'
import {PointPx} from '#react/point'
import {twMerge} from 'tailwind-merge'

interface Props extends StyledProps {
  svg: string
}

export const GraphView = ({svg, className, style}: Props) => {
  const {ref, isDragging, scale, translatePx, reset} = useZoomPan()

  const transform = [
    PointPx.translate(translatePx),
    `scale(${scale.toFixed(2)})`,
  ].join(' ')

  return (
    <div
      // Double click resets zoom.
      onDoubleClick={reset}
      className={twMerge(
        'rounded-md border-[1.5px] inset-xy-dim hover:inset-xy',
        'bg-paper contain-strict',
        className,
      )}
      {...{ref}}>
      <div
        className={twMerge(
          'flex fill-container origin-top-left justify-center contain-strict',
          'duration-150 ease-linear',
          isDragging ? 'cursor-grabbing' : 'cursor-grab dom-play',
        )}
        dangerouslySetInnerHTML={{__html: svg}}
        style={{transform, ...style}}
      />
    </div>
  )
}
