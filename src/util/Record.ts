import {dual} from '#Function'
import {square} from '#Pair'
import {Array, Predicate, Record, Tuple, pipe} from 'effect'
import type {UnionToTuple} from 'type-fest'

export * from 'effect/Record'

/**
 * The object with the keys `keys` and all its values set to `value`
 */
export const monoRecord =
  <const V>(value: V) =>
  <const KS extends readonly [string, ...string[]]>(
    ...keys: KS
  ): Record<KS[number], V> => {
    const result = {} as Record<KS[number], V>
    for (const key of keys) {
      result[key as KS[number]] = value
    }
    return result
  }

/**
 * Just like `pluck` but takes the object type as type parameter on an empty
 * first argument list.
 */
export const pluckOf =
  <T>() =>
  <const K extends keyof T>(key: K) =>
  (o: T): T[K] =>
    o[key]

/** Filter record entries so that only defined entries remain. */
export const filterDefined = <const Key extends PropertyKey, Value extends {}>(
  record: Partial<Record<Key, Value | undefined>>,
) =>
  pipe(record, Record.filter(Predicate.isNotUndefined)) as Partial<
    Record<Key, Value>
  >

/**
 * Merge two records, with `Self` given precedence over `That`.
 */
export const merge: {
  <Self extends {}, That extends {}>(self: Self, that: That): That & Self
  <That extends {}>(that: That): <Self extends {}>(self: Self) => That & Self
} = dual(
  2,
  <Self extends {}, That extends {}>(self: Self, that: That): That & Self => ({
    ...that,
    ...self,
  }),
)

export const _mergeLiteral: {
  <const Self extends {}, const That extends {}>(
    self: Self,
    that: That,
  ): That & Self
  <const That extends {}>(
    that: That,
  ): <const Self extends {}>(self: Self) => That & Self
} = dual(
  2,
  <const Self extends {}, const That extends {}>(
    self: Self,
    that: That,
  ): That & Self => ({...that, ...self}),
)

/**
 * Merge two literal records, with `Self` given precedence over `That`.
 */
export const mergeLiteral = Object.assign(_mergeLiteral, {
  uncurried: <const Self extends {}, const That extends {}>(
    self: Self,
    that: That,
  ): That & Self => mergeLiteral(self, that),
})

/**
 * Flip string/numeric record keys and values.
 */
export const flip = <const Key extends string | number>(
  record: Record<Key, string>,
) =>
  Object.fromEntries(Object.entries(record).map(Tuple.swap)) as Record<
    string,
    Key
  >

/**
 * Pluck a single value from the given record by key.
 */
export const pluck =
  <const Key extends string>(key: Key) =>
  <Data extends Record<Key, unknown>>(record: Data): Data[Key] =>
    record[key]

/**
 * A curried version `Record.singleton`.
 */
export const withKey =
  <const Key extends string>(key: Key) =>
  <Value>(value: Value) =>
    ({
      [key]: value,
    }) as Record<Key, Value>

/**
 * The type of tuple returned by `typedKeys`.
 */
export type TypedKeys<R extends Record<never, unknown>> = UnionToTuple<keyof R>

/**
 * Just like `Object.keys` but returns a tuple of keys correctly typed for
 * literal records. Note the order may not be the same as the order of the entries.
 *
 * ```ts
 * const keys: readonly ['foo', 'bar', 'a'] = typedKeys({a: 1, foo: '5', bar: true})
 * ```
 */
export const typedKeys = <const R extends Record<never, unknown>>(record: R) =>
  Record.keys(record) as unknown as Readonly<TypedKeys<R>>

/**
 * The type of tuple returned by `typedValues`.
 */
export type TypedValues<R extends Readonly<Record<never, unknown>>> =
  UnionToTuple<R[keyof R]>

/**
 * Just like `Object.values` but returns a tuple of values correctly typed for
 * literal records. Note the order may not be the same as the order of the entries.
 *
 * ```ts
 * const values: readonly ['a', 'foo', 'bar'] = typedKeys({a: 1, foo: '5', bar: true})
 * ```
 */
export const typedValues = <const R extends Record<never, unknown>>(
  record: R,
) => Record.values(record) as unknown as Readonly<TypedValues<R>>

/***
 * The type of number returned by `keyCount`.
 */
export type KeyCount<T extends Record<never, unknown>> = UnionToTuple<
  keyof T
>['length']

/**
 * Return the number of keys in the given record.
 *
 * ```ts
 * const count: 2 = keyCount({a: 1, foo: '5', bar: true})
 * ```
 */
export const keyCount = <R extends Record<never, unknown>>(record: R) =>
  Object.keys(record).length as KeyCount<R>

/**
 * Convert a tuple into a record where each element is both the key and the value.
 */
export const isoRecord = <const Key extends string>(keys: readonly Key[]) =>
  Object.fromEntries(pipe(keys, Array.map(square))) as {[K in Key]: K}

/**
 * True if the given field value is not null or undefined.
 */
export const isNonNullField =
  <const Key extends string>(key: Key) =>
  <Data extends Record<Key, unknown>>(record: Data): boolean =>
    record[key] != null

/**
 * Get the value of the given literal string key from the given record.
 */
export const byLiteralKey = Object.assign(
  <Key extends string>() =>
    <Data extends Record<Key, unknown>>(self: Data) =>
    (key: Key): Data[Key] =>
      self[key],
  {
    flip:
      <Data extends Record<never, unknown>>(self: Data) =>
      <Key extends keyof Data>(key: Key): Data[Key] =>
        self[key],
  },
)
