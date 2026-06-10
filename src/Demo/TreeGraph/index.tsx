import {GraphView} from '#GraphView'
import type {StyledProps} from '#react/props'
import {Spinner} from '#Spinner'
import {selectSvg, useAppSelector} from '#store'

interface Props extends StyledProps {}

export const TreeGraph = (props: Props) => {
  const svg = useAppSelector(selectSvg)
  return svg === '' ? (
    <div className='flex size-full place-items-center bg-paper dom-play contain-strict *:dom-play'>
      <Spinner />
    </div>
  ) : (
    <GraphView {...{...props, svg}} />
  )
}
