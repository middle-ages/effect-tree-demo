import {
  type DecodeResponse,
  handleDecodeResponse,
  requestMessage,
  type DecodeRequest,
} from './message.js'

export interface WorkerResult {
  worker: Worker
  terminate: () => void
  result: Promise<DecodeResponse>
}

export const buildWorker = () => {
  //  /* eslint-disable unicorn/relative-url-style */
  return new Worker(new URL('./worker.js', import.meta.url), {
    type: 'module',
    name: 'effect-tree-demo',
  })
}

export const decode = ({format, theme, code}: DecodeRequest): WorkerResult => {
  const worker = buildWorker()
  const removeErrorListener = addListener('error', (e: unknown) => {
    throw e
  })(worker)

  return {
    worker,
    terminate: () => {
      worker.terminate()
    },
    result: new Promise<DecodeResponse>(resolve => {
      const removeMessageListener = addListener(
        'message',
        (e: MessageEvent) => {
          removeErrorListener()
          removeMessageListener()

          const response = handleDecodeResponse(e)
          resolve(response)
        },
      )(worker)

      worker.postMessage(requestMessage(format, theme, code))
    }),
  }
}

interface EventTypes {
  error: ErrorEvent
  message: MessageEvent
}

function addListener<Event extends keyof EventTypes>(
  event: Event,
  listener: (event: EventTypes[Event]) => void,
) {
  return (worker: Worker): (() => void) => {
    worker.addEventListener(event, e => {
      listener(e)
    })

    return () => {
      worker.removeEventListener(event, listener)
    }
  }
}
