import {pairMap} from '#Pair'
import {Codec} from 'effect-tree'
import {singleton} from '#Record'
import {MAX_NODE_COUNT} from '#model'
import {pipe} from '#util'
import {disabledProps, enabledProps} from '#types'
import type {Predicate} from 'effect'
import type {StateBuilder} from '../state'

const {Prufer} = Codec

export const maxNodeCountMessage: string = `𝓶𝓪𝔁=${MAX_NODE_COUNT.toLocaleString()}`

const [firstCodeTitle, lastCodeTitle] = pipe(
  ['first', 'last'],
  pairMap<string, string>(
    edge =>
      `You are at the ${edge} Prüfer code for this node count ` +
      'and can go no further.',
  ),
)

const [firstNodeCountTitle, lastNodeCountTitle] = [
  'Cannot encode a Prüfer tree with fewer than 2 nodes.',
  `Cannot encode a Prüfer tree bigger than ${maxNodeCountMessage}.`,
]

const builder = <Key extends 'dec' | 'inc'>(
  key: Key,
  title: string,
  predicate: Predicate.Predicate<number[]>,
): Record<Key, StateBuilder> =>
  singleton(key, (code: number[]) =>
    predicate(code) ? disabledProps(title) : enabledProps,
  )

export const stateBuilders: Record<
  'code' | 'nodeCount',
  Record<'dec' | 'inc', StateBuilder>
> = {
  code: {
    ...builder('dec', firstCodeTitle, Prufer.isFirstCode),
    ...builder('inc', lastCodeTitle, Prufer.isLastCode),
  },
  nodeCount: {
    ...builder('dec', firstNodeCountTitle, code => code.length === 0),
    ...builder(
      'inc',
      lastNodeCountTitle,
      code => Prufer.computeNodeCount(code) >= MAX_NODE_COUNT,
    ),
  },
}
