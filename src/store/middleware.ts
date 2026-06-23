import {flow, pipe} from '#Function'
import type {PrimedStats} from '#model'
import * as Record from '#Record'
import * as Tuple from '#Tuple'
import {
  compute,
  LinesRequest,
  StatsRequest,
  TreeRequest,
  SvgRequest,
  type ComputeTag,
  type RequestMap,
  type RequestMessage,
  type ResponseMap,
  buildResponse,
  type ResponseMessage,
  computeTags,
} from './worker'
import {
  createListenerMiddleware,
  isAnyOf,
  type PayloadAction,
} from '@reduxjs/toolkit'
import type {Branch} from 'effect-tree'
import {setStats, setLines, setTree} from './computedSlice'
import {pluckCode, pluckData, type FromState, type RootState} from './data'
import {actions} from './dataSlice'
import {Option} from 'effect'
import * as Pair from '#Pair'

type BuildRequest<Tag extends ComputeTag = ComputeTag> = FromState<
  RequestMessage<Tag>
>

type Response<Tag extends ComputeTag = ComputeTag> = Promise<
  ResponseMessage<Tag>
>

type Request<Tag extends ComputeTag = ComputeTag> = FromState<
  (f: BuildRequest<Tag>) => Response<Tag>
>

type Compute<Tag extends ComputeTag = ComputeTag> = FromState<Response<Tag>>

const request =
  <Tag extends ComputeTag>(tag: Tag): Request<Tag> =>
  state =>
  f => {
    const [respond, computed] = pipe(
      state,
      f,
      Pair.fanout(buildResponse(tag), compute<Tag>),
    )
    return computed.then(respond)
  }

const [requestTree, requestLines, requestStats, requestSvg]: [
  Request<'tree'>,
  Request<'lines'>,
  Request<'stats'>,
  Request<'svg'>,
] = [request('tree'), request('lines'), request('stats'), request('svg')]

const computeTree: Compute<'tree'> = state =>
  pipe(
    state,
    request('tree'),
  )(flow(pluckData, pluckCode, Record.withKey('code'), TreeRequest))

const computeLines: Compute<'lines'> = state =>
  pipe(
    state,
    request('lines'),
  )(({computed: {tree}, data: {format, theme}}) =>
    pipe({tree, format, theme}, LinesRequest),
  )

const computeStats: Compute<'stats'> = state =>
  pipe(
    state,
    request('stats'),
  )(({computed: {tree}, data: {code}}) => pipe({tree, code}, StatsRequest))

const computeSvg: Compute<'svg'> = state =>
  pipe(state, request('svg'))(({computed: {tree}}) => SvgRequest(tree))

/*


const computeSvg = 
const dispatchers = { 
  tree:['computed/setTree', computeTree],
  lines:['computed/setLines',computeLines],
  stats:['computed/setStats',computeStats],
} as const

const runUnlessAborted =
  ({signal}: {signal: AbortSignal}) =>
  <Result>(f: (state: RootState) => Promise<Result>) =>
  (state: RootState): Promise<Option.Option<Result>> =>
    signal.aborted ? Promise.resolve(Option.none()) : f(state).then(Option.some)

export const listenerMiddleware = (() => {
  const middleWare = createListenerMiddleware()

  middleWare.startListening({
    predicate: isAnyOf(...Record.typedValues(actions)),
    effect: async (_, listener) => {
      listener.cancelActiveListeners()
      const state = listener.getState() as RootState
      const unlessAborted = runUnlessAborted(listener)

      const dispatchTree = 

//      const foo=(tree:Branch<number>): PayloadAction<Branch<number>, 'computed/setTree'> => setTree(tree)


      const dispatch = <Payload, Name extends string>(
        name:Name,
        payload: Payload,
      ) =>          thunkAction => listener.dispatch(thunkAction)

      const tree = pipe(
        await pipe(state, unlessAborted(computeTree)),
        Option.tap(tree => Option.some(listener.dispatch(setTree(tree)))),
      )
      }
      //      Option.tap(tree, tree => listener.dispatch(setTree(tree)))

      //      listener.dispatch(setTree(tree))
      //      if (listener.signal.aborted) return
      //
      const lines: string[] = await pipe(
        {tree, ...style},
        LinesRequest,
        compute,
      )
      listenerApi.dispatch(setLines(lines))

      const stats: PrimedStats = await pipe({tree, code}, StatsRequest, compute)

      listenerApi.dispatch(setStats(stats))
    },
  })

  return middleWare
})()

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
