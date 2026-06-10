import * as rx from 'rxjs'

export const mergeObservable =
  <Other>(other: rx.Observable<Other>) =>
  <Self>(self: rx.Observable<Self>): rx.Observable<Self | Other> =>
    rx.merge(self, other)

export const subscribe = <O>(observable: rx.Observable<O>): (() => void) => {
  const subscription = observable.subscribe()
  return () => {
    subscription.unsubscribe()
  }
}
