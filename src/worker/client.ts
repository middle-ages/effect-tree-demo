import type {RequestMessage, ResponseMessage} from './message/data'
import {type ComputeTag} from './message/worker'

let localWorker: Worker | undefined

export const compute = <Tag extends ComputeTag>(
  request: RequestMessage<Tag>,
): Promise<ResponseMessage<Tag>['payload']> => {
  type Response = ResponseMessage<Tag>

  if (localWorker !== undefined) {
    localWorker.terminate()
  }

  const worker = new Worker(new URL('./worker/compute', import.meta.url), {
    type: 'module',
  })
  localWorker = worker

  return new Promise<Response['payload']>(resolve => {
    worker.postMessage(request)
    worker.onerror = function (this: AbstractWorker, event: ErrorEvent): void {
      throw new Error(event.message)
    }

    worker.onmessage = ({data}: MessageEvent<Response>): void => {
      resolve(data.payload)
    }
  })
}
