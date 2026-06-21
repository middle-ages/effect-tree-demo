import * as Record from '#Record'
import {createListenerMiddleware, isAnyOf} from '@reduxjs/toolkit'
import {pipe} from '#Function'
import {actions, codeActions} from './dataSlice'
import {type RootState} from './data'
import {decode, DecodeRequest} from '#worker'
import {setComputed} from './computedSlice'

export const listenerMiddleware = (() => {
  const middleWare = createListenerMiddleware()

  middleWare.startListening({
    predicate: isAnyOf(...Record.typedValues(actions)),
    effect: async (_, listenerApi) => {
      const {data} = listenerApi.getState() as RootState
      const [promise] = decode(
        DecodeRequest(data.code, data.format, data.theme),
      )
      const result = await promise
      listenerApi.dispatch(
        setComputed({
          tree: result.tree,
          lines: result.lines,
          stats: result.stats,
        }),
      )
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
