import type {ComputeTag, RequestMessage, ResponseMessage} from './message'
import {withWorker} from './pool'

export const compute = <Tag extends ComputeTag>(
  request: RequestMessage<Tag>,
): Promise<ResponseMessage<Tag>['payload']> => {
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
