import {pipe} from '#Function'
import type {PrimedStats} from '#model'
import * as Record from '#Record'
import {compute, LinesRequest, StatsRequest, TreeRequest} from '#worker'
import {createListenerMiddleware, isAnyOf} from '@reduxjs/toolkit'
import type {Branch} from 'effect-tree'
import {setComputed} from './computedSlice'
import {type RootState} from './data'
import {actions} from './dataSlice'

export const listenerMiddleware = (() => {
  const middleWare = createListenerMiddleware()

  middleWare.startListening({
    predicate: isAnyOf(...Record.typedValues(actions)),
    effect: async (_, listenerApi) => {
      listenerApi.cancelActiveListeners()

      const {
        data: {code, ...style},
      } = listenerApi.getState() as RootState

      const tree: Branch<number> = await pipe({code}, TreeRequest, compute)

      const lines: string[] = await pipe(
        {tree, ...style},
        LinesRequest,
        compute,
      )

      const stats: PrimedStats = await pipe({tree, code}, StatsRequest, compute)

      listenerApi.dispatch(setComputed({tree, lines, stats}))
    },
  })

  return middleWare
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
