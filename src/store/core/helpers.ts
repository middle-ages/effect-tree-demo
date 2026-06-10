import {range, appendAll, drop, map, replicate} from '#Array'
import {pairMap} from '#Pair'
import {constant, flow, tupled, pipe, type EndoOf} from '#Function'
import {bigHalf, floorHalf} from '#Number'
import {MAX_NODE_COUNT, sampleNodeCount} from '#model'
import {mapFirst} from '#Tuple'
import {Codec} from 'effect-tree'

const {labeledTreeCount, toOrdinal, computeNodeCount, fromOrdinal} =
  Codec.Prufer

export const prependDigits = (
  code: number[],
  nodeCount: number,
  old: number,
): number[] => pipe(1, replicate(nodeCount - old), appendAll(code))

export const decHalfCode: EndoOf<number[]> = flow(
  toOrdinal,
  mapFirst(bigHalf),
  tupled(fromOrdinal),
)

export const incHalfCode: EndoOf<number[]> = code => {
  const [ordinal, nodeCount] = toOrdinal(code)
  const max = labeledTreeCount(nodeCount)
  return fromOrdinal(
    ordinal === max - 1n
      ? max
      : ordinal + (labeledTreeCount(nodeCount) - ordinal) / 2n,
    nodeCount,
  )
}

export const decNodes: EndoOf<number[]> = code =>
  pipe(
    code,
    drop(1),
    map(n => Math.min(n, code.length + 1)),
  )

export const incHalfNodeCount = (
  code: number[],
): {
  previous: number
  nodeCount: number
} => {
  const previous = computeNodeCount(code)
  return {
    previous,
    nodeCount:
      previous > MAX_NODE_COUNT - 1
        ? MAX_NODE_COUNT
        : previous + floorHalf(MAX_NODE_COUNT - previous),
  }
}

export const decHalfNodeCount: EndoOf<number[]> = code => {
  const halfLength = Math.max(1, floorHalf(code.length))
  return code.slice(halfLength).map(n => Math.min(n, halfLength) + 1)
}

export const randomNodes: EndoOf<number[]> = code => {
  const oldCount = Codec.Prufer.computeNodeCount(code)
  const tryCount = sampleNodeCount(MAX_NODE_COUNT)()

  // Avoid collisions: we always want a different node count, unless
  // MAX_NODE_COUNT===2.
  const newCount =
    tryCount +
    (oldCount === tryCount
      ? tryCount === MAX_NODE_COUNT
        ? -1
        : MAX_NODE_COUNT === 2
          ? 0
          : 1
      : 0)

  const [oldDigitCount, newDigitCount] = pipe(
    [oldCount, newCount],
    pairMap(Codec.Prufer.codeCount),
  )

  return oldDigitCount < newDigitCount
    ? [...range(1, newDigitCount - oldDigitCount).map(constant(1)), ...code]
    : code.slice(0, newDigitCount)
}
