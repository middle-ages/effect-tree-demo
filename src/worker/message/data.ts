import {pipe} from '#Function'
import type {
  TreeBranch,
  TreeCode,
  TreeLines,
  TreeStats,
  TreeStyle,
} from '#store'
import type {Simplify} from 'type-fest'
import {DataMessage, dataTag, type DataTag} from './worker'

export const computeTag = ['tree', 'lines', 'stats'] as const
export type ComputeTag = (typeof computeTag)[number]

type RequestTag<Tag extends ComputeTag = ComputeTag> = DataTag<`request-${Tag}`>
type ResponseTag<Tag extends ComputeTag = ComputeTag> =
  DataTag<`response-${Tag}`>

export type DataRequest = TreeRequest | LinesRequest | StatsRequest
export type DataResponse = TreeResponse | LinesResponse | StatsResponse

export interface RequestMap {
  tree: TreeCode
  lines: TreeBranch & TreeStyle
  stats: TreeBranch & TreeCode
}

export interface ResponseMap {
  tree: TreeBranch['tree']
  lines: TreeLines['lines']
  stats: TreeStats['stats']
}

export interface RequestMessage<
  Tag extends ComputeTag = ComputeTag,
> extends DataMessage<RequestTag<Tag>> {
  payload: RequestMap[Tag]
}

export interface ResponseMessage<Tag extends ComputeTag> extends DataMessage<
  ResponseTag<Tag>
> {
  request: RequestMessage<Tag>
  payload: ResponseMap[Tag]
}

interface _TreeRequest extends RequestMessage<'tree'> {}
interface _LinesRequest extends RequestMessage<'lines'> {}
interface _StatsRequest extends RequestMessage<'stats'> {}

export type TreeRequest = Simplify<_TreeRequest>
export type LinesRequest = Simplify<_LinesRequest>
export type StatsRequest = Simplify<_StatsRequest>

export interface TreeResponse extends ResponseMessage<'tree'> {}
export interface LinesResponse extends ResponseMessage<'lines'> {}
export interface StatsResponse extends ResponseMessage<'stats'> {}

export const [TreeRequest, LinesRequest, StatsRequest]: [
  (payload: RequestMap['tree']) => TreeRequest,
  (payload: RequestMap['lines']) => LinesRequest,
  (payload: RequestMap['stats']) => StatsRequest,
] = [buildRequest('tree'), buildRequest('lines'), buildRequest('stats')]

export const [TreeResponse, LinesResponse, StatsResponse]: [
  (request: TreeRequest) => (payload: ResponseMap['tree']) => TreeResponse,
  (request: LinesRequest) => (payload: ResponseMap['lines']) => LinesResponse,
  (request: StatsRequest) => (payload: ResponseMap['stats']) => StatsResponse,
] = [buildResponse('tree'), buildResponse('lines'), buildResponse('stats')]

export function buildRequest<const Tag extends ComputeTag>(tag: Tag) {
  return (payload: RequestMap[Tag]) =>
    pipe(
      {payload},
      pipe(`request-${tag}` as const, dataTag, DataMessage),
    ) as RequestMessage<Tag>
}

export function buildResponse<const Tag extends ComputeTag>(tag: Tag) {
  return <RequestType extends RequestMessage<Tag>>(request: RequestType) =>
    (payload: ResponseMap[Tag]): ResponseMessage<Tag> =>
      pipe(
        {payload, request},
        pipe(`response-${tag}` as const, dataTag, DataMessage),
      )
}

export const matchDataRequest =
  <R>(
    onTree: (request: TreeRequest) => R,
    onLines: (request: LinesRequest) => R,
    onStats: (request: StatsRequest) => R,
  ) =>
  (self: DataRequest): R =>
    self._tag.endsWith('-tree')
      ? onTree(self as TreeRequest)
      : self._tag.endsWith('-lines')
        ? onLines(self as LinesRequest)
        : onStats(self as StatsRequest)

export const matchDataResponse =
  <R>({
    onTree,
    onLines,
    onStats,
  }: {
    onTree: (response: TreeResponse) => R
    onLines: (response: LinesResponse) => R
    onStats: (response: StatsResponse) => R
  }) =>
  (self: DataResponse): R =>
    self._tag.endsWith('-tree')
      ? onTree(self as TreeResponse)
      : self._tag.endsWith('-lines')
        ? onLines(self as LinesResponse)
        : onStats(self as StatsResponse)
