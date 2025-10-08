import {FastCheck as fc, pipe} from 'effect'
import type {ComponentProps, FC} from 'react'
import {mapProps} from 'react-compinators'
import type {StyledProps} from '#util'

export interface Seeded {
  seed: number
}

export const seedArgs = {seed: 42}

export const sampleOne =
  <P extends {}>(arbitrary: fc.Arbitrary<P>) =>
  ({seed}: Seeded): P =>
    fc.sample(arbitrary, {numRuns: 1, seed}).at(0) as P

/**
 * Convert a component and an arbitrary for its props into a component with
 * props of type `Seeded`.
 */
export const asSeeded =
  <Generated extends {}>(arbitrary: fc.Arbitrary<Generated>) =>
  <FromArgs extends {}>(
    Component: FC<
      Omit<Seeded & FromArgs & StyledProps, 'seed'> & {model: Generated}
    >,
  ): FC<Seeded & FromArgs> =>
    pipe(
      Component,
      mapProps<Seeded & FromArgs, ComponentProps<typeof Component>>(
        ({seed, ...args}) => ({
          ...args,
          model: sampleOne(arbitrary)({seed}),
        }),
      ),
    )

export const pangram = 'The quick brown fox jumped over the lazy dog.'

export const zipperPangram =
  'Sixty zippers were quickly picked from the woven jute bag.'

export const sentence =
  'Albert bought a bassoon and blew a puffing tune to the zebra, ' +
  'but do take your jacket and cap, it will be very cold tonight.'
