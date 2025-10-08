import type {LazyArg} from 'effect/Function'

export * as Array from './util/Array'
export * as Function from './util/Function'
export * as Number from './util/Number'
export * as Object from './util/Object'
export * as Order from './util/Order'
export * as Pair from './util/Pair'
export * as Record from './util/Record'
export * as String from './util/String'
export * as Test from './util/Test'
export * as These from './util/These'
export * as Tuple from './util/Tuple'

export * from './util/css'

export * from './util/react'

export {flow, identity, pipe} from 'effect'
export {tupled} from 'effect/Function'

export const K =
  <T>(value: T): LazyArg<T> =>
  () =>
    value
