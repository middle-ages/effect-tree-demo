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
import {twMerge} from 'tailwind-merge'

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

const DirectionJumps = ({
  target,
  direction,
  className,
  ...props
}: DirectionProps) => (
  <Pill
    {...props}
    className={twMerge(
      'h-6 *:h-[calc(100%-1px)]',
      'last:border-l-[0.5px]',
      'first:border-r-[0.5px]',
      'last:border-l-border-right-dim!',
      'first:border-r-border-bottom',
      'first:rounded-l-lg first:rounded-r-none',
      'last:rounded-l-none last:rounded-r-lg',
      className,
    )}>
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
    <Repeater.Square className='min-w-9' {...props}>
      {label}
    </Repeater.Square>
  ) : (
    <Button.Focus {...props} className='min-w-8'>
      {label}
    </Button.Focus>
  )
}
