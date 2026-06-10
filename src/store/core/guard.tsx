import {constTrue, pipe} from '#Function'
import {pairMap, type Pair} from '#Pair'
import {MAX_NODE_COUNT} from '#model/stats'
import {type DisabledProps} from '#types'
import {Codec} from 'effect-tree'
import {and, type Predicate} from 'effect/Predicate'
import type {ReactNode} from 'react'

export type Guard = [
  selector: GuardSelector | 'selectConstantTrue',
  disabledNote: ReactNode,
]

export type GuardSelector = `selectIs${
  | 'FirstCode'
  | 'LastCode'
  | 'FirstNodeCount'
  | 'LastNodeCount'
  | 'FirstTree'
  | 'LastTree'}`

export type Edge = 'first' | 'last'
export type Signal = 'code' | 'nodeCount' | 'tree'

export const normalizeGuard = (guard?: Guard): Guard =>
  guard === undefined ? ['selectConstantTrue', ''] : guard

export const maxNodeCountMessage = (
  <>
    𝓶𝓪𝔁 of <span className='font-serif'>{MAX_NODE_COUNT.toLocaleString()}</span>
  </>
)

export const maxNodeCountMessageBy = (
  <>
    {maxNodeCountMessage} by prepending 𝟏s to the Prüfer code of the current
    tree.
  </>
)

const cannotBuild = 'Cannot build a Prüfer tree'

const firstNodeCountTitle = <span>{cannotBuild} with fewer than 2 nodes.</span>
const lastNodeCountTitle = (
  <span>
    {cannotBuild} bigger than {maxNodeCountMessage}.
  </span>
)

const [firstCodeTitle, lastCodeTitle] = pipe(
  ['first', 'last'],
  pairMap<ReactNode, string>(edge => (
    <span key={edge}>
      You are at the {edge} Prüfer code for this node count and can go no
      further.
    </span>
  )),
)

const firstTreeTitle = (
  <span>
    {cannotBuild} with a code smaller than the smallest possible
    Prüfer-encodable tree.
  </span>
)

const lastTreeTitle = (
  <span>
    {cannotBuild} with a code larger than the largest possible Prüfer code for a
    tree of node count {maxNodeCountMessage}.
  </span>
)

export const guard: Record<Edge, Record<Signal, Guard>> = {
  first: {
    code: ['selectIsFirstCode', firstCodeTitle],
    nodeCount: ['selectIsFirstNodeCount', firstNodeCountTitle],
    tree: ['selectIsFirstTree', firstTreeTitle],
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

const disabled = (disabledNote: ReactNode): DisabledProps => ({
  isDisabled: true,
  disabledNote,
})

const enabled: DisabledProps = {isDisabled: false}

export const disabledProps = (
  isDisabled: boolean,
  disabledNote: ReactNode,
): DisabledProps => (isDisabled ? disabled(disabledNote) : enabled)

const [selectIsFirstCode, selectIsLastCode]: Pair<Predicate<number[]>> = [
  Codec.Prufer.isFirstCode,
  Codec.Prufer.isLastCode,
]

const [selectIsFirstNodeCount, selectIsLastNodeCount]: Pair<
  Predicate<number[]>
> = [
  code => code.length === 0,
  code => Codec.Prufer.computeNodeCount(code) >= MAX_NODE_COUNT,
]

export const guardPredicateMap: Record<GuardSelector, Predicate<number[]>> = {
  selectIsFirstCode,
  selectIsLastCode,
  selectIsFirstNodeCount,
  selectIsLastNodeCount,
  selectIsFirstTree: and(selectIsFirstCode, selectIsFirstNodeCount),
  selectIsLastTree: and(selectIsFirstNodeCount, selectIsLastNodeCount),
}

export const checkGuard = (guard: Guard | undefined): Predicate<number[]> => {
  if (guard === undefined) return constTrue
  const [selector] = guard
  return selector === 'selectConstantTrue'
    ? constTrue
    : guardPredicateMap[selector]
}
