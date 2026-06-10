import {Pill} from '#Pill'
import {type StyledProps} from '#react/props'
import * as store from '#store'
import {JumpButton} from './JumpButton'
import {RepeatJumpButton} from './RepeatJumpButton'

const {
  dec: [decCode, decHalfCode, firstCode],
  inc: [{title, ...incCode}, incHalfCode, lastCode],
} = store.decIncActions.code

export const CodeJumps = (props: StyledProps) => {
  // Don't show incCode tooltip if still showing welcome message.
  const isWelcomeOpen = store.useAppSelector(store.selectIsWelcomeOpen)

  return (
    <Pill {...props}>
      <JumpButton key='firstCode' className='head-button' {...firstCode} />
      <RepeatJumpButton key='decHalfCode' {...decHalfCode} />
      <RepeatJumpButton key='decCode' {...decCode} />
      <RepeatJumpButton
        key='incCode'
        {...incCode}
        {...(!isWelcomeOpen && {title})}
      />
      <RepeatJumpButton key='incHalfCode' {...incHalfCode} />
      <JumpButton key='lastCode' className='last-button' {...lastCode} />
    </Pill>
  )
}
