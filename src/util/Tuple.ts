export * from 'effect/Tuple'

/** A tuple of arity-3 of type `A`. */
export type Tuple3<A> = readonly [A, A, A]

/** A tuple of arity-4 of type `A`. */
export type Tuple4<A> = readonly [A, A, A, A]

/**
 * Drop the last element of a tuple.
 *
 * ```ts
 * const myTuple = [1, 'a', true] as const
 * type NumberString = DropLast<typeof myTuple>
 * // NumberString ≡ readonly [1, 'a']
 * ```
 */
export type Init<Tuple extends readonly [unknown, ...(readonly unknown[])]> =
  Tuple extends readonly [...infer Init extends readonly unknown[], unknown]
    ? Readonly<Init>
    : never

/**
 * ```ts
 * type Foo = [string, number, RegExp[]];
 * type Res = Tail<Foo>; // [number, RegExp[]]
 * ```
 */
export type Tail<A extends readonly unknown[]> = A['length'] extends 0
  ? never
  : A extends readonly [unknown, ...infer Tail extends readonly unknown[]]
    ? Readonly<Tail>
    : never

export const mapTuple3 =
  <A, B>(f: (a: A, i: number) => B) =>
  ([a, b, c]: Tuple3<A>): Tuple3<B> => [f(a, 0), f(b, 1), f(c, 2)]
