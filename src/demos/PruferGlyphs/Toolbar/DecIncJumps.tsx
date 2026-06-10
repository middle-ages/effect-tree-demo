import {Button} from '#Button'
import {Pill} from '#Pill'
import {Repeater} from '#Repeater'
import {mapTuple3} from '#Tuple'
import {type StyledProps, pipe} from '#util'
import {useCallback} from 'react'
import {
  type CodeStateEffect,
  type DirectionKey,
  type JumpKey,
  type ModifyAction,
  getDecIncActions,
} from '../hooks/actions'

interface Props extends StyledProps, CodeStateEffect {
  jump: JumpKey
}

export const DecIncJumps = (props: Props) => (
  <>
    <DirectionJumps key="dec" direction="dec" {...props} />
    <DirectionJumps key="inc" direction="inc" {...props} />
  </>
)

export const DirectionJumps = ({
  jump,
  direction,
  code,
  setCode,
  ...props
}: Props & {direction: DirectionKey}) => (
  <Pill {...props}>
    {pipe(
      direction,
      getDecIncActions(jump),
      mapTuple3(action => (
        <JumpButton key={action.id} {...{code, setCode, action}} />
      )),
    )}
  </Pill>
)

const JumpButton = ({
  action: {id, title, label, canRepeat, apply, buildState},
  code,
  setCode,
}: {
  action: ModifyAction
} & CodeStateEffect) => {
  const props = {
    ...buildState(code),
    id,
    title,
    onClick: useCallback(() => {
      setCode(apply)
    }, [apply, setCode]),
  }

  return canRepeat ? (
    <Repeater.Square {...props}>{label}</Repeater.Square>
  ) : (
    <Button.Focus {...props} className="p-0">
      {label}
    </Button.Focus>
  )
}
