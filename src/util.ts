import type {LazyArg} from 'effect/Function'

export * as Array from './util/Array.js'
export * as Function from './util/Function.js'
export * as Number from './util/Number.js'
export * as Object from './util/Object.js'
export * as Order from './util/Order.js'
export * as Pair from './util/Pair.js'
export * as Record from './util/Record.js'
export * as String from './util/String.js'
export * as Test from './util/Test.js'
export * as These from './util/These.js'
export * as Tuple from './util/Tuple.js'

export * from './util/react.jsx'

export {flow, identity, pipe} from 'effect'
export {tupled} from 'effect/Function'

export const K =
  <T>(value: T): LazyArg<T> =>
  () =>
    value
