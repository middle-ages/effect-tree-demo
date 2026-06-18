import {DecodeResponse, type DecodeRequest} from './message'

export const decode = (
  request: DecodeRequest,
): [Promise<DecodeResponse>, () => void] => {
  const worker = new Worker(new URL('./worker', import.meta.url), {
    type: 'module',
  })
  const terminate = () => {
    worker.terminate()
  }
  return [
    new Promise<DecodeResponse>(resolve => {
      worker.postMessage(request)
      worker.onerror = function (
        this: AbstractWorker,
        event: ErrorEvent,
      ): void {
        throw new Error(event.message)
      }

      worker.onmessage = ({data}: MessageEvent<DecodeResponse>): void => {
        resolve(data)
      }
    }),
    terminate,
  ]
}
