import type {
  RootDataState,
  TreeBranch,
  TreeCode,
  TreeLines,
  TreeStats,
} from '#store'
import {pipe} from '#Function'
import {DataMessage, dataTag, type DataTag, type WorkerTag} from './worker'

export const computeTag = ['tree', 'lines', 'stats'] as const
export type ComputeTag = (typeof computeTag)[number]

export type RequestTag<Tag extends ComputeTag = ComputeTag> =
  DataTag<`request-${Tag}`>

export type ResponseTag<Tag extends ComputeTag = ComputeTag> =
  DataTag<`response-${Tag}`>

export interface RequestMessage<Tag extends ComputeTag> extends DataMessage<
  RequestTag<Tag>
> {}

export interface ResponseMessage<
  Tag extends ComputeTag,
  RequestType extends RequestMessage<Tag>,
> extends DataMessage<ResponseTag<Tag>> {
  request: RequestType
}

export interface TreeRequest extends RequestMessage<'tree'>, TreeCode {}
export interface TreeResponse
  extends ResponseMessage<'tree', TreeRequest>, TreeBranch {}

export const TreeRequest: (payload: TreeCode) => TreeRequest = request('tree')
export const TreeResponse = (
  request: TreeRequest,
): ((payload: TreeBranch) => TreeResponse) => response('tree', request)

export interface LinesRequest extends RequestMessage<'lines'>, RootDataState {}
export interface LinesResponse
  extends ResponseMessage<'lines', LinesRequest>, TreeLines {}

export const LinesRequest: (payload: RootDataState) => LinesRequest =
  request('lines')
export const LinesResponse = (
  request: LinesRequest,
): ((payload: TreeLines) => LinesResponse) => response('lines', request)

export interface StatsRequest
  extends RequestMessage<'stats'>, TreeCode, TreeBranch {}
export interface StatsResponse
  extends ResponseMessage<'stats', StatsRequest>, TreeStats {}

export const StatsRequest: (payload: TreeCode & TreeBranch) => StatsRequest =
  request('stats')
export const StatsResponse = (
  request: StatsRequest,
): ((payload: TreeStats) => StatsResponse) => response('stats', request)

/*
function response<
  const Tag extends ComputeTag,
  RequestType extends RequestMessage<Tag>,
>(tag: Tag, request: RequestType) {
  return <Props>(props: Props): ResponseMessage<Tag, RequestType> & Props =>
    Message(`response-${tag}`)({request, ...props})
}
  */

function request<const Tag extends ComputeTag>(tag: Tag) {
  return <Props>(props: Props): RequestMessage<Tag> & Props =>
    pipe(`request-${tag}` as const, dataTag, DataMessage)(props)
}
