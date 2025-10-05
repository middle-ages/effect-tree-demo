import {Arbitrary, Codec} from 'effect-tree'
import fc from 'fast-check'

const pruferCodeArbitrary: fc.Arbitrary<number[]> =
  Arbitrary.Tree.pruferEncodableArbitrary.map(Codec.PruferIsomorphism.to)

export const samplePruferCode =
  () =>
  (seed?: number): number[] => {
    const [code] = fc.sample(pruferCodeArbitrary, {
      numRuns: 1,
      ...(seed !== undefined && {seed}),
    })
    if (code === undefined) {
      throw new Error('Cannot sample prüfer code arbitrary.')
    }
    return code
  }

export const sampleNodeCount = (maxNodeCount: number) => (seed?: number) =>
  fc.sample(fc.integer({min: 3, max: maxNodeCount}), {
    ...(seed !== undefined && {seed}),
    numRuns: 1,
  })[0] as number
