import {flow, pipe} from '#Function'
import {dotToSvg, drawRomanTree, primeStats} from '#model'
import {Graphviz} from '@hpcc-js/wasm-graphviz'
import {Codec, type Branch} from 'effect-tree'
import {pluckCode} from '../store/data'
import {
  buildResponse,
  matchDataRequest,
  type DataRequest,
  type DataResponse,
  type RequestMap,
  type RequestMessage,
  type ResponseMap,
  type ResponseMessage,
} from './message/data'
import type {ComputeTag} from './message/worker'

const graphvizLoading: Promise<Graphviz> = Graphviz.load()

const handle =
  <const Tag extends ComputeTag>(
    tag: Tag,
    f: (requestPayload: RequestMap[Tag]) => ResponseMap[Tag],
  ) =>
  (request: RequestMessage<Tag>): Promise<ResponseMessage<Tag>> =>
    Promise.resolve(pipe(request.payload, f, pipe(request, buildResponse(tag))))

const handleAsync =
  <const Tag extends ComputeTag>(
    tag: Tag,
    f: (requestPayload: RequestMap[Tag]) => Promise<ResponseMap[Tag]>,
  ) =>
  (request: RequestMessage<Tag>): Promise<ResponseMessage<Tag>> =>
    f(request.payload).then(flow(buildResponse(tag)(request)))

const handleSvg = async ({tree}: {tree: Branch<number>}): Promise<string> => {
  const buildDot = new Promise<string>(resolve => {
    pipe(tree, Codec.treeToGraphViz, resolve)
  })
  const graphviz = await graphvizLoading
  const dot = await buildDot
  return dotToSvg(graphviz)(dot, {widthPx: 1000, heightPx: 1000}).svg
}

const process = async (request: DataRequest): Promise<DataResponse> =>
  pipe(
    request,
    matchDataRequest<Promise<DataResponse>>(
      handle('tree', flow(pluckCode, Codec.Prufer.decode)),
      handle('lines', drawRomanTree.named),
      handle('stats', primeStats.named),
      handleAsync('svg', handleSvg),
    ),
  )

self.onmessage = ({data}: MessageEvent<DataRequest>): void => {
  void process(data)
    .then(postMessage)
    .catch((error: unknown) => {
      throw new Error(error as string, {cause: error})
    })
}
