import {flow, pipe} from '#Function'
import type {SlowStatId} from '#model'
import * as Pair from '#Pair'
import {pluck, withKey} from '#Record'
import {pick} from 'effect/Struct'
import {type ComputePayloadAction} from '../computedSlice'
import {
  pluckCode,
  pluckComputed,
  pluckCore,
  type FromState,
  type RootState,
} from '../data'
import type {
  ComputeTag,
  RequestMap,
  RequestMessage,
  ResponseMap,
  ResponseMessage,
  SecondaryTag,
} from './message'
import {buildRequest, buildResponse, type ResponseTuple} from './message'
import {withWorker} from './pool'

export interface Listener<Tag extends ComputeTag> {
  signal: AbortSignal
  dispatch: (payloadAction: ComputePayloadAction<Tag>) => void
}

// Given a function `f` that produces a worker request message from the state,
// handle the worker compute request and store the response. Returns the
// response payload or undefined if aborted.
const requestCompute =
  <Tag extends ComputeTag>(tag: Tag) =>
  (f: FromState<RequestMessage<Tag>>) =>
  async (
    listener: Listener<Tag>,
    state: RootState,
  ): Promise<ResponseMap[Tag] | undefined> => {
    const [respond, computed] = pipe(
      state,
      f,
      Pair.fanout(buildResponse(tag), compute<Tag>),
    )

    if (hasAborted(listener)) return Promise.resolve(undefined)

    const payload: ResponseMap[Tag] = await computed
      .then(respond)
      .then(pluck('payload'))

    return payload
  }

export const computeTree: (
  listener: Listener<'tree'>,
  state: RootState,
) => Promise<ResponseMap['tree'] | undefined> = pipe(
  flow(pluckCore, pluckCode, withKey('code'), buildRequest('tree')),
  requestCompute('tree'),
)

const buildHandler =
  <const Tag extends SecondaryTag>(tag: Tag) =>
  (f: (state: RootState) => RequestMap[Tag]) =>
    pipe(flow(f, buildRequest(tag)), requestCompute(tag))

export function hasAborted<Tag extends ComputeTag>({
  signal,
}: Listener<Tag>): boolean {
  return signal.aborted
}

const buildTreeCodeHandler = <const Tag extends SlowStatId>(
  tag: Tag,
): ((
  listener: Listener<Tag>,
  state: RootState,
) => Promise<ResponseMap[Tag] | undefined>) =>
  buildHandler(tag)(({computed: {tree}, core: {code}}) => ({
    tree,
    code,
  }))

export const computeRest =
  (listener: Listener<SecondaryTag>) => (state: RootState) => {
    const run = <R>(
      f: (listener: Listener<SecondaryTag>, state: RootState) => R,
    ) => f(listener, state)

    const promiseTuple = [
      run(
        buildHandler('lines')(({computed: {tree}, core: {format, theme}}) => ({
          tree,
          format,
          theme,
        })),
      ),
      run(buildTreeCodeHandler('maxDegree')),
      run(buildTreeCodeHandler('maxDepth')),
      pipe(flow(pluckComputed, pick('tree')), buildHandler('svg'), run),
    ] as Promise<ResponseMap[SecondaryTag] | undefined>[]

    return Promise.all(promiseTuple) as unknown as Promise<ResponseTuple>
  }

function compute<Tag extends ComputeTag>(
  request: RequestMessage<Tag>,
): Promise<ResponseMessage<Tag>['payload']> {
  type Response = ResponseMessage<Tag>

  return withWorker(worker => {
    return new Promise(resolve => {
      worker.postMessage(request)
      worker.onerror = function (
        this: AbstractWorker,
        event: ErrorEvent,
      ): void {
        throw new Error(event.message, {cause: event.error})
      }

      worker.onmessage = ({data: {payload}}: MessageEvent<Response>): void => {
        resolve(payload)
      }
    })
  })
}
