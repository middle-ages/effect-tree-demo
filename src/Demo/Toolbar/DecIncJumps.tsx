import * as Array from '#Array'
import {Button} from '#Button'
import {pipe} from '#Function'
import {Pill} from '#Pill'
import {type StyledProps} from '#react/props'
import {Repeater} from '#Repeater'
import * as store from '#store'
import {
  type DirectionKey,
  getDecIncActions,
  type TargetKey,
  useAppDispatch,
  useAppSelector,
} from '#store'
import {useCallback} from 'react'

interface Props extends StyledProps {
  target: TargetKey
}

export const DecIncJumps = (props: Props) => (
  <>
    <DirectionJumps key='dec' direction='dec' {...props} />
    <DirectionJumps key='inc' direction='inc' {...props} />
  </>
)

interface DirectionProps extends Props {
  direction: DirectionKey
}

const DirectionJumps = ({target, direction, ...props}: DirectionProps) => (
  <Pill {...props}>
    {pipe(
      direction,
      getDecIncActions(target),
      Array.map(action => <JumpButton key={action.id} {...{action}} />),
    )}
  </Pill>
)

const JumpButton = ({
  action: {id, title, label, canRepeat, guard},
}: {
  action: store.Action<store.AnyDecIncKey>
}) => {
  const dispatch = useAppDispatch()
  const [selector, disabledNote] = store.guardSelector(guard)
  const guardResult = useAppSelector(selector)
  const disabledState = store.disabledProps(guardResult, disabledNote)
  const props = {
    ...disabledState,
    id,
    title,
    onClick: useCallback(() => dispatch(store[id]()), [dispatch, id]),
  }

  return canRepeat ? (
    <Repeater.Square {...props}>{label}</Repeater.Square>
  ) : (
    <Button.Focus {...props} className='p-0'>
      {label}
    </Button.Focus>
  )
}
