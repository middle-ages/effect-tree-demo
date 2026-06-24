import {pipe} from '#Function'
import * as Pair from '#Pair'
import {computeActions, type ComputePayloadAction} from '../computedSlice'
import type {FromState, RootState} from '../data'
import type {
  ComputeTag,
  RequestMessage,
  ResponseMap,
  ResponseMessage,
} from './message'
import {buildResponse} from './message'
import {withWorker} from './pool'

export interface Listener<Tag extends ComputeTag> {
  signal: AbortSignal
  dispatch: (payloadAction: ComputePayloadAction<Tag>) => void
}

interface Compute<Tag extends ComputeTag = ComputeTag> {
  (f: FromState<RequestMessage<Tag>>): Promise<ResponseMap[Tag] | undefined>
}

/**
 * Given a function `f` that produces a worker request message from the state,
 * handle the worker compute request and store the response. Returns the
 * response payload or undefined if aborted.
 */
export const requestCompute =
  <Tag extends ComputeTag>(tag: Tag) =>
  (f: FromState<RequestMessage<Tag>>) =>
  async (listener: Listener<Tag>, state: RootState) => {
    const [respond, computed] = pipe(
      state,
      f,
      Pair.fanout(buildResponse(tag), compute<Tag>),
    )

    if (hasAborted(listener)) return

    const responseMessage: ResponseMessage<Tag> = await computed.then(respond)

    if (hasAborted(listener)) return

    const action = computeActions[tag](responseMessage.payload)
    listener.dispatch(action)

    return responseMessage.payload
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

export function hasAborted<Tag extends ComputeTag>({
  signal,
}: Listener<Tag>): boolean {
  return signal.aborted
}
