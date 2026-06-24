import {flow, pipe} from '#Function'
import * as Record from '#Record'
import {createListenerMiddleware, isAnyOf} from '@reduxjs/toolkit'
import type {Branch} from 'effect-tree'
import type {RootState} from './data'
import * as data from './data'
import {actions} from './dataSlice'
import {
  LinesRequest,
  requestCompute,
  StatsRequest,
  SvgRequest,
  TreeRequest,
  type ComputeTag,
  type Listener,
  type ResponseMap,
} from './worker'

const dispatchTree: {
  (
    listener: Listener<'tree'>,
    state: RootState,
  ): Promise<ResponseMap['tree'] | undefined>
} = pipe(
  flow(data.pluckData, data.pluckCode, Record.withKey('code'), TreeRequest),
  requestCompute('tree'),
)

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
        LinesRequest({tree, format, theme}),
      )(listener, state),

      requestCompute('stats')(({computed: {tree}, data: {code}}) =>
        StatsRequest({tree, code}),
      )(listener, state),

      requestCompute('svg')(flow(data.pluckComputed, SvgRequest))(
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

/*


      // Can cancel other running instances
      listenerApi.cancelActiveListeners()

      // Run async logic
      const data = await fetchData()

      // Pause until action dispatched or state changed
      if (await listenerApi.condition(matchSomeAction)) {
        // Use the listener API methods to dispatch, get state,
        // unsubscribe the listener, start child tasks, and more
        listenerApi.dispatch(todoAdded('Buy pet food'))

        // Spawn "child tasks" that can do more work and return results
        const task = listenerApi.fork(async forkApi => {
          // Can pause execution
          await forkApi.delay(5)
          // Complete the child by returning a value
          return 42
        })

        const result = await task.result
        // Unwrap the child result in the listener
        if (result.status === 'ok') {
          // Logs the `42` result value that was returned
          console.log('Child succeeded: ', result.value)
        }

      }
       */
