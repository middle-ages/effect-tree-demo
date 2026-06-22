import {useZoomPan} from '#useZoomPan'
import {PointPx, type StyledProps} from '#util'
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
        'flex fill-container justify-center bg-paper contain-strict',
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
