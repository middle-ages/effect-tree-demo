import {flow, pipe} from '#Function'
import {dotToSvg, drawRomanTree, maxDegree, maxDepth} from '#model'
import {Codec, type Branch} from 'effect-tree'
import {pluckCode} from '../data'
import {
  buildResponse,
  matchDataRequest,
  type ComputeTag,
  type DataRequest,
  type DataResponse,
  type RequestMap,
  type RequestMessage,
  type ResponseMap,
  type ResponseMessage,
} from './message'
import {Graphviz} from '@hpcc-js/wasm-graphviz'

const graphvizLoading: Promise<Graphviz> = Graphviz.load()
let graphviz: Graphviz | undefined = undefined

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
  if (graphviz === undefined) {
    graphviz = await graphvizLoading
  }
  const dot = Codec.treeToGraphViz(tree)
  return dotToSvg(graphviz)(dot, {widthPx: 1000, heightPx: 1000}).svg
}

const process = async (request: DataRequest): Promise<DataResponse> =>
  pipe(
    request,
    matchDataRequest<Promise<DataResponse>>(
      handle('lines', drawRomanTree.named),
      handle(
        'maxDegree',
        ({code, tree}) => maxDegree(code, tree).maxDegree.value,
      ),
      handle('maxDepth', ({code, tree}) => maxDepth(code, tree).maxDepth.value),
      handleAsync('svg', handleSvg),
      handle('tree', flow(pluckCode, Codec.Prufer.decode)),
    ),
  )

self.onmessage = ({data}: MessageEvent<DataRequest>): void => {
  void process(data)
    .then(postMessage)
    .catch((error: unknown) => {
      throw new Error(error as string, {cause: error})
    })
}
