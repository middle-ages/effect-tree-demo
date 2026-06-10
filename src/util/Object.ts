import {map} from 'effect/Array'
import {swap} from 'effect/Tuple'
import {type Simplify, type UnionToIntersection} from 'effect/Types'

/** `Object.fromEntries` for literal records */
export const typedFromEntries = <
  const T extends readonly [...(readonly [PropertyKey, unknown][])],
>(
  entries: T,
) => Object.fromEntries(entries) as FromEntries<T>

/** Invert key/values of a literal object. */
export const invertLiteral = <T extends object>(o: T) =>
  Object.fromEntries(map(Object.entries(o), swap)) as InvertedObject<T>

/** Invert key/values of an object. */
export const invert = <K extends string, V extends string>(o: Record<K, V>) =>
  Object.fromEntries(map(Object.entries(o), swap)) as Record<V, K>

/**
 * For example:
 *
 * ```ts
 * ObjectToUnion<{a: number, b: boolean}> ≡ {a: number} | {b: boolean}
 * ```
 */
export type ObjectToUnion<T extends object> = {
  [K in keyof T]: Record<K, T[K]>
}[keyof T]

/**
 * The inverted object of `T`.
 *
 * ```ts
 * type ABC = {A: 'X'; B: 'Y', C: 'Z'}
 * type XYZ = InvertedObject<ABC> // {X: 'A'; Y: 'B', Z: 'C'}
 * ```
 */
export type InvertedObject<T extends object> = Readonly<
  UnionToIntersection<
    {
      [K in keyof T]: Record<T[K] & PropertyKey, K>
    }[keyof T]
  >
>

/**
 * ```ts
 * type MyObject = FromEntries<
 *   readonly [['a', number], ['b', RegExp], ['c', boolean]]
 * > ≡ {a: number; b: RegExp; c: boolean}
 * ```
 */
export type FromEntries<
  T extends readonly (readonly [PropertyKey, unknown])[],
> = Simplify<
  Readonly<
    UnionToIntersection<
      {
        [K in keyof T]: Record<T[K][0], T[K][1]>
      }[number]
    >
  >
>

export type PartialOrUndefined<T> = {
  [K in keyof T]?: T[K] | undefined
}
