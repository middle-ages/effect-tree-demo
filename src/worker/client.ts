import type {RequestMessage, ResponseMessage} from './message/data'
import {type ComputeTag} from './message/worker'
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
