import {Button} from '#Button'
import {Pill} from '#Pill'
import {Repeater} from '#Repeater'
import {
  type JumpKey,
  useAppDispatch,
  useAppSelector,
  type ModifyAction,
  type DecIncJumpKey,
  type DirectionKey,
  getDecIncActions,
  selectCode,
} from '#store'
import {mapTuple3} from '#Tuple'
import {type StyledProps, pipe} from '#util'
import {useCallback} from 'react'

interface Props extends StyledProps {
  jump: JumpKey
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

export const DirectionJumps = ({jump, direction, ...props}: DirectionProps) => (
  <Pill {...props}>
    {pipe(
      direction,
      getDecIncActions(jump),
      mapTuple3(action => <JumpButton key={action.id} {...{action}} />),
    )}
  </Pill>
)

const JumpButton = ({
  action: {id, title, label, canRepeat, buildState},
}: {
  action: ModifyAction<DecIncJumpKey>
}) => {
  const code = useAppSelector(selectCode)
  const dispatch = useAppDispatch()
  const onClick = useCallback(() => dispatch([id]()), [dispatch, id])
  const props = {...buildState(code), id, title, onClick}

  return canRepeat ? (
    <Repeater.Square {...props}>{label}</Repeater.Square>
  ) : (
    <Button.Focus {...props} className='p-0'>
      {label}
    </Button.Focus>
  )
}
