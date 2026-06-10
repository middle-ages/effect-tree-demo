import {Pill} from '#Pill'
import {type StyledProps} from '#react/props'
import * as store from '#store'
import {JumpButton} from './JumpButton'
import {RepeatJumpButton} from './RepeatJumpButton'

const {
  dec: [decNodes, decHalfNodeCount, firstNodeCount],
  inc: [incNodes, incHalfNodeCount, lastNodeCount],
} = store.decIncActions.nodeCount

export const NodeCountJumps = (props: StyledProps) => (
  <Pill {...props}>
    <JumpButton
      key='firstNodeCount'
      {...firstNodeCount}
      className='head-button'
    />
    <RepeatJumpButton key='decHalfNodeCount' {...decHalfNodeCount} />
    <RepeatJumpButton key='decNodes' {...decNodes} />
    <RepeatJumpButton key='incNodes' {...incNodes} />
    <RepeatJumpButton key='incHalfNodeCount' {...incHalfNodeCount} />
    <JumpButton
      key='lastNodeCount'
      {...lastNodeCount}
      className='last-button'
    />
  </Pill>
)
