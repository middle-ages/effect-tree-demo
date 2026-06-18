import {DecodeResponse, type DecodeRequest} from './message'

export const decode = (
  request: DecodeRequest,
): [Promise<DecodeResponse>, () => void] => {
  const worker = new Worker(new URL('./worker.js', import.meta.url), {
    type: 'module',
  })
  console.log(worker)
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
        console.log('worker')
        console.log(this)
        console.log('event')
        console.log(event)
        //        throw new Error(event.message)
      }

      worker.onmessage = ({data}: MessageEvent<DecodeResponse>): void => {
        resolve(data)
      }
    }),
    terminate,
  ]
}
