import * as Array from '#Array'
import {pipe} from '#Function'
import {
  primedFromValues,
  primedToValues,
  primeQuickStats,
  type StatValues,
} from '#model'
import * as Record from '#Record'
import {
  createListenerMiddleware,
  isAnyOf,
  type ListenerEffectAPI,
  type PayloadAction,
  type ThunkDispatch,
  type UnknownAction,
} from '@reduxjs/toolkit'
import type {Branch} from 'effect-tree'
import * as Predicate from 'effect/Predicate'
import {setIsWelcomeOpen} from './appSlice'
import {setComputed} from './computedSlice'
import {actions, checkGuard, decIncActionMap} from './core'
import type {RootState} from './data'
import * as data from './data'
import {computeRest, computeTree, type TotalResponseTuple} from './worker'

export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>

type Listener = ListenerEffectAPI<RootState, AppDispatch>

export const rootMiddleware = (() => {
  const middleware = createListenerMiddleware<RootState, AppDispatch>()

  middleware.startListening({
    predicate: isAnyOf(...Record.typedValues(actions)),
    effect: async (action, listener) => {
      listener.cancelActiveListeners()
      const initialState = listener.getState()
      const {
        app: {isWelcomeOpen},
        computed: previousComputed,
        core: {code},
      } = initialState

      if (isWelcomeOpen) {
        listener.dispatch(setIsWelcomeOpen(false))
      }

      const tree: Branch<number> | undefined = await computeTree(
        listener,
        initialState,
      )

      if (tree === undefined) {
        listener.cancel()
        return
      }

      const newState = pipe(
        tree,
        data.setTree(previousComputed),
        data.setComputedState(initialState),
      )

      const response = await pipe(newState, computeRest(listener))
      if (Array.some(response as unknown[], Predicate.isUndefined)) {
        listener.cancel()
        return
      }

      const [lines, maxDegree, maxDepth, svg] = response as TotalResponseTuple &
        unknown[]

      const stats: StatValues = primedToValues({
        ...pipe(code, primeQuickStats(tree)),
        ...primedFromValues({maxDegree, maxDepth}),
      })

      listener.dispatch(setComputed({tree, lines, svg, stats, code}))

      dispatchRepeatAction(listener, action)
    },
  })

  return middleware
})()

const dispatchRepeatAction = (listener: Listener, action: UnknownAction) => {
  const {repeatAction, code} = listener.getState().core

  if (isRepeatAction(action) && repeatAction !== undefined) {
    const id = action.type.replace(/^core\//, '')

    if (
      repeatAction === id &&
      !pipe(code, checkGuard(decIncActionMap[id].guard))
    ) {
      listener.dispatch(action)
    }
  }
}

const isRepeatAction = (
  action: UnknownAction,
): action is PayloadAction<
  {isRepeating: boolean},
  `core/${data.RepeatActionName}`
> => {
  if (!('payload' in action)) {
    return false
  }

  const payload = action['payload']
  return (
    payload !== undefined &&
    payload !== null &&
    typeof payload === 'object' &&
    'isRepeating' in payload &&
    (payload.isRepeating as boolean)
  )
}
