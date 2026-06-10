import {pipe} from '#Function'
import type {Pair} from '#Pair'
import type {UnionToTuple} from 'type-fest'
import type {
  TreeBranch,
  TreeCode,
  TreeLines,
  TreeStats,
  TreeStyle,
} from '../../data'
import {
  type ComputeTag,
  DataMessage,
  dataTag,
  type DataTag,
  type SecondaryTag,
} from './worker'

type RequestTag<Tag extends ComputeTag = ComputeTag> = DataTag<`request-${Tag}`>
type ResponseTag<Tag extends ComputeTag = ComputeTag> =
  DataTag<`response-${Tag}`>

export type DataRequest = RequestMessage<ComputeTag>
export type DataResponse = ResponseMessage<ComputeTag>

export interface RequestMap {
  lines: TreeBranch & TreeStyle
  maxDegree: TreeBranch & TreeCode
  maxDepth: TreeBranch & TreeCode
  svg: TreeBranch
  tree: TreeCode
}

export interface ResponseMap {
  lines: TreeLines['lines']
  maxDegree: TreeStats['stats']['maxDegree']
  maxDepth: TreeStats['stats']['maxDepth']
  svg: string
  tree: TreeBranch['tree']
}

type PairedTuple = UnionToTuple<
  {
    [Key in SecondaryTag]: [Key, ResponseMap[Key]]
  }[SecondaryTag]
>

export type TotalResponseTuple = {
  [Key in keyof PairedTuple as Key & `${number}`]: (PairedTuple[Key] &
    Pair<unknown>)[1]
}

export type ResponseTuple = Partial<TotalResponseTuple>

export type ResponsePromiseTuple = {
  [Key in keyof ResponseTuple as Key & `${number}`]: Promise<ResponseTuple[Key]>
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
    onLines: (request: RequestMessage<'lines'>) => R,
    onMaxDegree: (request: RequestMessage<'maxDegree'>) => R,
    onMaxDepth: (request: RequestMessage<'maxDepth'>) => R,
    onSvg: (request: RequestMessage<'svg'>) => R,
    onTree: (request: RequestMessage<'tree'>) => R,
  ) =>
  (self: DataRequest): R =>
    self._tag.endsWith('-lines')
      ? onLines(self as RequestMessage<'lines'>)
      : self._tag.endsWith('-maxDegree')
        ? onMaxDegree(self as RequestMessage<'maxDegree'>)
        : self._tag.endsWith('-maxDepth')
          ? onMaxDepth(self as RequestMessage<'maxDepth'>)
          : self._tag.endsWith('-svg')
            ? onSvg(self as RequestMessage<'svg'>)
            : onTree(self as RequestMessage<'tree'>)
