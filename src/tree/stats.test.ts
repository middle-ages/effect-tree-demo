import {Codec} from 'effect-tree'
import {expect, test} from 'vitest'
import {primeStats, type StatId} from './stats'
import {Array, pipe, Record} from 'effect'

test('primeStats', () => {
  const code = [1, 2, 3, 4]

  const actual = pipe(
    primeStats(code, Codec.Prufer.decode(code)),
    Record.values,
    Array.map(({id, value}): [StatId, bigint] => [id, value]),
  )

  expect(actual).toEqual([
    ['nodeCount', 6n],
    ['treeCount', 1296n],
    ['treeIndex', 52n],
    ['maxNodes', 100n],
    ['maxDepth', 5n],
    ['maxDegree', 2n],
  ])
})
