import {flow, pipe} from '#Function'
import type {PrimedStats} from '#model'
import * as Pair from '#Pair'
import * as Record from '#Record'
import {createListenerMiddleware, isAnyOf} from '@reduxjs/toolkit'
import {Option} from 'effect'
import type {Branch} from 'effect-tree'
import type {Predicate} from 'effect/Predicate'
import {setLines, setStats, setSvg, setTree} from './computedSlice'
import type {FromState, RootState} from './data'
import * as data from './data'
import {actions} from './dataSlice'
import {
  buildResponse,
  compute,
  LinesRequest,
  StatsRequest,
  SvgRequest,
  TreeRequest,
  type ComputeTag,
  type RequestMessage,
  type ResponseMap,
  type ResponseMessage,
} from './worker'

type Response<Tag extends ComputeTag = ComputeTag> = Promise<
  ResponseMessage<Tag>
>

type Request<Tag extends ComputeTag = ComputeTag> = FromState<
  (f: FromState<RequestMessage<Tag>>) => Response<Tag>
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

const computeTree: Compute<'tree'> = state =>
  pipe(
    state,
    request('tree'),
  )(flow(data.pluckData, data.pluckCode, Record.withKey('code'), TreeRequest))

const computeLines: Compute<'lines'> = state =>
  pipe(
    state,
    request('lines'),
  )(({computed: {tree}, data: {format, theme}}) =>
    LinesRequest({tree, format, theme}),
  )

const computeStats: Compute<'stats'> = state =>
  pipe(
    state,
    request('stats'),
  )(({computed: {tree}, data: {code}}) => StatsRequest({tree, code}))

const computeSvg: Compute<'svg'> = state =>
  pipe(state, request('svg'))(flow(data.pluckComputed, SvgRequest))

const isAborted: Predicate<{signal: AbortSignal}> = controller =>
  controller.signal.aborted

const runUnlessAborted =
  ({signal}: {signal: AbortSignal}) =>
  <Result>(f: FromState<Promise<Result>>) =>
  (state: RootState) => {
    const result = signal.aborted
      ? Promise.resolve(Option.none())
      : f(state).then(Option.some)
    return result
  }

const computePromise =
  (controller: {signal: AbortSignal}) =>
  (treeState: RootState) =>
  <Tag extends ComputeTag>(
    run: Compute<Tag>,
  ): Promise<ResponseMap[Tag] | undefined> =>
    pipe(treeState, pipe(run, runUnlessAborted(controller))).then(
      data.pluckPayloadOrUndefined,
    )

export const listenerMiddleware = () => {
  const middleWare = createListenerMiddleware()

  middleWare.startListening({
    predicate: isAnyOf(...Record.typedValues(actions)),
    effect: async (_, listener) => {
      listener.cancelActiveListeners()
      const state = listener.getState() as RootState
      const unlessAborted = runUnlessAborted(listener)

      const treeResponse: Branch<number> | undefined = await pipe(
        state,
        unlessAborted(computeTree),
      ).then(data.pluckPayloadOrUndefined)

      if (treeResponse === undefined) return
      listener.dispatch(setTree(treeResponse))

      const treeState: RootState = pipe(
        treeResponse,
        data.setTree(state.computed),
        data.setComputedState(state),
      )

      const promise = pipe(treeState, computePromise(listener))

      const [linesPromise, statsPromise, svgPromise]: [
        Promise<string[] | undefined>,
        Promise<PrimedStats | undefined>,
        Promise<string | undefined>,
      ] = [promise(computeLines), promise(computeStats), promise(computeSvg)]

      if (listener.signal.aborted) return

      const [lines, stats, svg] = await Promise.all([
        linesPromise,
        statsPromise,
        svgPromise,
      ])

      if (isAborted(listener)) return
      if (lines !== undefined) {
        listener.dispatch(setLines(lines))
      }

      if (isAborted(listener)) return
      if (stats !== undefined) {
        listener.dispatch(setStats(stats))
      }

      if (isAborted(listener)) return
      if (svg !== undefined) {
        listener.dispatch(setSvg(svg))
      }

      if (isAborted(listener)) return
    },
  })
}

/*



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
const dispatchers = { 
  tree:['computed/setTree', computeTree],
  lines:['computed/setLines',computeLines],
  stats:['computed/setStats',computeStats],
} as const
        */
