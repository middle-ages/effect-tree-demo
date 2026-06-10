import {Button} from '#Button'
import {TreeCode} from '#model'
import {Pill} from '#Pill'
import {Repeater} from '#Repeater'
import {useAppDispatch, useAppSelector} from '#store'
import {mapTuple3} from '#Tuple'
import {type StyledProps, pipe} from '#util'
import {useCallback} from 'react'

interface Props extends StyledProps {
  jump: TreeCode.JumpKey
}

export const DecIncJumps = (props: Props) => (
  <>
    <DirectionJumps key='dec' direction='dec' {...props} />
    <DirectionJumps key='inc' direction='inc' {...props} />
  </>
)

interface DirectionProps extends Props {
  direction: TreeCode.DirectionKey
}

export const DirectionJumps = ({jump, direction, ...props}: DirectionProps) => (
  <Pill {...props}>
    {pipe(
      direction,
      TreeCode.getDecIncActions(jump),
      mapTuple3(action => <JumpButton key={action.id} {...{action}} />),
    )}
  </Pill>
)

const JumpButton = ({
  action: {id, title, label, canRepeat, buildState},
}: {
  action: TreeCode.ModifyAction<TreeCode.DecIncJumpKey>
}) => {
  const code = useAppSelector(TreeCode.selectCode)
  const dispatch = useAppDispatch()
  const onClick = useCallback(() => dispatch(TreeCode[id]()), [dispatch, id])
  const props = {...buildState(code), id, title, onClick}

  return canRepeat ? (
    <Repeater.Square {...props}>{label}</Repeater.Square>
  ) : (
    <Button.Focus {...props} className='p-0'>
      {label}
    </Button.Focus>
  )
}
