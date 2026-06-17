import {DecodeResponse, type DecodeRequest} from './message'

const buildWorker = () =>
  new Worker(new URL('./worker.js', import.meta.url), {
    type: 'module',
    name: 'effect-tree-demo',
  })

export const decode = (
  request: DecodeRequest,
): [Promise<DecodeResponse>, () => void] => {
  const worker = buildWorker()
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
