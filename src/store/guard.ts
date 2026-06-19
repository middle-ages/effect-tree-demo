import {pipe} from '#Function'
import {pairMap} from '#Pair'
import {unwords} from '#String'
import {MAX_NODE_COUNT} from '#model/stats'
import {type DisabledProps} from '#types'

export type Guard = [selector: GuardSelector, disabledNote: string]

export type GuardSelector = `selectIs${
  | 'FirstCode'
  | 'LastCode'
  | 'FirstNodeCount'
  | 'LastNodeCount'
  | 'FirstTree'
  | 'LastTree'}`

export type Edge = 'first' | 'last'
export type Signal = 'code' | 'nodeCount' | 'tree'

export const maxNodeCountMessage = `𝓶𝓪𝔁=${MAX_NODE_COUNT.toLocaleString()}`

export const maxNodeCountMessageBy = unwords.spaced.rest(
  maxNodeCountMessage,
  'by prepending 𝟏s to the Prüfer code.',
)

const cannotBuild = 'Cannot build a Prüfer tree'

const [firstNodeCountTitle, lastNodeCountTitle] = [
  `${cannotBuild} with fewer than 2 nodes.`,
  `${cannotBuild} bigger than ${maxNodeCountMessage}.`,
]

const [firstCodeTitle, lastCodeTitle] = pipe(
  ['first', 'last'],
  pairMap<string, string>(edge =>
    unwords.spaced.rest(
      `You are at the ${edge} Prüfer code for this node count `,
      'and can go no further.',
    ),
  ),
)

const [firstTreeTitle, lastTreeTitle] = [
  unwords.spaced.rest(
    `${cannotBuild} with a code smaller than the smallest possible'
    'Prüfer-encodable tree.`,
  ),
  unwords.spaced.rest(
    `${cannotBuild} with a code larger than the largest possible'
    'Prüfer code for a tree of node count ${maxNodeCountMessage}.`,
  ),
]

export const guard: Record<Edge, Record<Signal, Guard>> = {
  first: {
    code: ['selectIsFirstCode', firstCodeTitle],
    nodeCount: ['selectIsFirstNodeCount', firstNodeCountTitle],
    tree: ['selectIsLastTree', firstTreeTitle],
  },
  last: {
    code: ['selectIsLastCode', lastCodeTitle],
    nodeCount: ['selectIsLastNodeCount', lastNodeCountTitle],
    tree: ['selectIsLastTree', lastTreeTitle],
  },
}

export const randomGuard: Guard = [
  'selectIsFirstNodeCount',
  'Nowhere to jump: there is only a single tree with two nodes.',
]

const disabled = (disabledNote: string): DisabledProps => ({
  isDisabled: true,
  disabledNote,
})

const enabled: DisabledProps = {isDisabled: false}

export const disabledProps = (
  isDisabled: boolean,
  disabledNote: string,
): DisabledProps => (isDisabled ? disabled(disabledNote) : enabled)
