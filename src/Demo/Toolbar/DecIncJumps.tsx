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
  <Pill {...props}>
    <DirectionJumps key='dec' direction='dec' {...props} />
    <DirectionJumps key='inc' direction='inc' {...props} />
  </Pill>
)

interface DirectionProps extends Props {
  direction: DirectionKey
}

const DirectionJumps = ({target, direction}: DirectionProps) => (
  <>
    {pipe(
      direction,
      getDecIncActions(target),
      Array.map(action => <JumpButton key={action.id} {...{action}} />),
    )}
  </>
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
    <Button.Focus {...props} className='min-w-9'>
      {label}
    </Button.Focus>
  )
}

/*

    className={twMerge(
      'h-6 *:h-[calc(100%-1px)]',
      'last:border-l-[0.5px]',
      'first:border-r-[0.5px]',
      'last:border-l-border-right-dim!',
      'first:border-r-border-bottom',
      'first:rounded-l-[9px] first:rounded-r-none',
      'last:rounded-l-none last:rounded-r-[9px]',
      className,
    )}>

*/
