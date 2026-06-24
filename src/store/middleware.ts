import {flow, pipe} from '#Function'
import * as Record from '#Record'
import {createListenerMiddleware, isAnyOf} from '@reduxjs/toolkit'
import type {Branch} from 'effect-tree'
import type {RootState} from './data'
import * as data from './data'
import {actions} from './dataSlice'
import {
  buildRequest,
  requestCompute,
  type ComputeTag,
  type Listener,
  type ResponseMap,
} from './worker'

const dispatchRest =
  (listener: Listener<ComputeTag>) =>
  (
    state: RootState,
  ): Promise<
    [
      lines: ResponseMap['lines'] | undefined,
      stats: ResponseMap['stats'] | undefined,
      svg: ResponseMap['svg'] | undefined,
    ]
  > =>
    Promise.all([
      requestCompute('lines')(({computed: {tree}, data: {format, theme}}) =>
        buildRequest('lines')({tree, format, theme}),
      )(listener, state),

      requestCompute('stats')(({computed: {tree}, data: {code}}) =>
        buildRequest('stats')({tree, code}),
      )(listener, state),

      requestCompute('svg')(flow(data.pluckComputed, buildRequest('svg')))(
        listener,
        state,
      ),
    ] as const)

export const listenerMiddleware = (() => {
  const middleware = createListenerMiddleware()

  middleware.startListening({
    predicate: isAnyOf(...Record.typedValues(actions)),
    effect: async (_, listener) => {
      listener.cancelActiveListeners()

      const previousState = listener.getState() as RootState

      const tree: Branch<number> | undefined = await dispatchTree(
        listener,
        previousState,
      )

      if (tree !== undefined) {
        await pipe(
          tree,
          data.setTree(previousState.computed),
          data.setComputedState(previousState),
          dispatchRest(listener),
        )
      }
    },
  })

  return middleware
})()

function dispatchTree(
  listener: Listener<'tree'>,
  state: RootState,
): Promise<ResponseMap['tree'] | undefined> {
  return pipe(
    flow(
      data.pluckData,
      data.pluckCode,
      Record.withKey('code'),
      buildRequest('tree'),
    ),
    requestCompute('tree'),
  )(listener, state)
}
