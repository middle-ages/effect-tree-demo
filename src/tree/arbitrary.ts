import {pipe} from 'effect'
import {Arbitrary, Codec} from 'effect-tree'
import fc from 'fast-check'

const {
  Tree: {getPruferCodeArbitrary},
} = Arbitrary

/**
 * Generate a random prüfer code at the same node count as the given code.
 */
export const samplePruferCode =
  (seed?: number) =>
  (givenCode: number[]): number[] => {
    const arbitrary = pipe(
      givenCode,
      Codec.Prufer.computeNodeCount,
      getPruferCodeArbitrary,
    )
    const [code] = fc.sample(arbitrary, {
      numRuns: 1,
      ...(seed !== undefined && {seed}),
    })

    if (code === undefined) {
      throw new Error('Cannot sample prüfer code arbitrary.')
    }

    return code
  }

/**
 * Sample a random count of nodes.
 */
export const sampleNodeCount =
  (max: number) =>
  (seed?: number): number => {
    const arbitrary = fc.integer({min: 2, max})

    const [code] = fc.sample(arbitrary, {
      numRuns: 1,
      ...(seed !== undefined && {seed}),
    })

    if (code === undefined) {
      throw new Error('Cannot sample node count arbitrary.')
    }

    return code
  }
