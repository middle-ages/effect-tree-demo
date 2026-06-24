import {pipe} from '#Function'
import type {
  TreeBranch,
  TreeCode,
  TreeLines,
  TreeStats,
  TreeStyle,
} from '../../data'
import {type ComputeTag, DataMessage, dataTag, type DataTag} from './worker'

type RequestTag<Tag extends ComputeTag = ComputeTag> = DataTag<`request-${Tag}`>
type ResponseTag<Tag extends ComputeTag = ComputeTag> =
  DataTag<`response-${Tag}`>

export type DataRequest = RequestMessage<ComputeTag>
export type DataResponse = ResponseMessage<ComputeTag>

export interface RequestMap {
  tree: TreeCode
  lines: TreeBranch & TreeStyle
  stats: TreeBranch & TreeCode
  svg: TreeBranch
}

export interface ResponseMap {
  tree: TreeBranch['tree']
  lines: TreeLines['lines']
  stats: TreeStats['stats']
  svg: string
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

export const matchComputeRequest =
  <R>(
    onTree: (request: RequestMessage<'tree'>) => R,
    onLines: (request: RequestMessage<'lines'>) => R,
    onStats: (request: RequestMessage<'stats'>) => R,
    onSvg: (request: RequestMessage<'svg'>) => R,
  ) =>
  (self: DataRequest): R =>
    self._tag.endsWith('-tree')
      ? onTree(self as RequestMessage<'tree'>)
      : self._tag.endsWith('-lines')
        ? onLines(self as RequestMessage<'lines'>)
        : self._tag.endsWith('-stats')
          ? onStats(self as RequestMessage<'stats'>)
          : onSvg(self as RequestMessage<'svg'>)
