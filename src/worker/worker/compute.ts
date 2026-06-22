import {flow, pipe} from '#Function'
import {drawRomanTree} from '#model/draw'
import {primeStats} from '#model/stats'
import {Codec} from 'effect-tree'
import {
  buildResponse,
  matchDataRequest,
  type DataRequest,
  type DataResponse,
  type RequestMap,
  type RequestMessage,
  type ResponseMap,
  type ResponseMessage,
} from '../message/data'
import type {ComputeTag} from '../message/worker'
import {pluck} from '#Record'

interface Handler<Tag extends ComputeTag> {
  (request: RequestMessage<Tag>): ResponseMessage<Tag>
}

self.onmessage = ({data}: MessageEvent<DataRequest>) => {
  pipe(data, handleRequest, postMessage)
}

export function handleRequest(request: DataRequest): DataResponse {
  return pipe(
    request,
    matchDataRequest<DataResponse>(
      compute('tree', flow(pluck('code'), Codec.Prufer.decode)),
      compute('lines', drawRomanTree.named),
      compute('stats', primeStats.named),
    ),
  )
}

function compute<const Tag extends ComputeTag>(
  tag: Tag,
  f: (requestPayload: RequestMap[Tag]) => ResponseMap[Tag],
): Handler<Tag> {
  return request => pipe(request.payload, f, pipe(request, buildResponse(tag)))
}
