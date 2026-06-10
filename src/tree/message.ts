import type {Draw, Tree} from 'effect-tree'
import type {NumericFormat} from './roman/index'
import type {PrimedStats} from './stats'

const _tag = 'effect-tree-demo'

interface Message {
  _tag: typeof _tag
}

export interface DecodeRequest {
  code: number[]
  format: NumericFormat
  theme: Draw.ThemeName
}

export interface DecodeTreeResponse extends DecodeRequest {
  tree: Tree<number>
}

export interface DecodeStatsResponse extends DecodeRequest {
  stats: PrimedStats
}

export interface DecodeLinesResponse extends DecodeRequest {
  lines: string[]
}

export type PartialDecodeResponse =
  | DecodeTreeResponse
  | DecodeStatsResponse
  | DecodeLinesResponse

export interface DecodeResponse
  extends DecodeTreeResponse,
    DecodeStatsResponse,
    DecodeLinesResponse {}

export interface TaggedDecodeRequest extends Message, DecodeRequest {}
export interface TaggedDecodeResponse extends Message, DecodeResponse {}

export interface DecodeHandler {
  (request: TaggedDecodeRequest): DecodeResponse
}

export const requestMessage = (
  format: NumericFormat,
  theme: Draw.ThemeName,
  code: number[],
): TaggedDecodeRequest => ({_tag, code, format, theme})

const isWorkerMessage = (
  data: DecodeRequest | Record<string, string>,
): data is DecodeRequest =>
  '_tag' in data && data['_tag'] === 'effect-tree-demo'

export const handleDecodeRequest =
  (handler: DecodeHandler) =>
  ({data}: MessageEvent): TaggedDecodeResponse | undefined => {
    const request = data as TaggedDecodeRequest | Record<string, string>
    return isWorkerMessage(request)
      ? {...request, ...handler(request)}
      : undefined
  }

export const handleDecodeResponse = ({data}: MessageEvent) =>
  data as TaggedDecodeResponse

export const matchResponse =
  <R>({
    onTree,
    onStats,
    onLines,
  }: {
    onTree: (tree: Tree<number>) => R
    onStats: (stats: PrimedStats) => R
    onLines: (lines: string[]) => R
  }) =>
  (response: PartialDecodeResponse): R =>
    'tree' in response
      ? onTree(response.tree)
      : 'stats' in response
        ? onStats(response.stats)
        : onLines(response.lines)
