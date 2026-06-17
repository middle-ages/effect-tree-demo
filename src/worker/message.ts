import type {NumericFormat, PrimedStats, RootState} from '#model'
import type {Draw, Tree} from 'effect-tree'

interface Message<Tag extends string> {
  _tag: Tag
}

export interface DecodeRequest
  extends RootState, Message<'effect-tree-demo-request'> {}

export interface DecodeResponse
  extends RootState, Message<'effect-tree-demo-response'> {
  tree: Tree<number>
  lines: string[]
  stats: PrimedStats
}

export interface Decoder {
  (request: DecodeRequest): DecodeResponse
}

export type DecodeMessage = DecodeRequest | DecodeResponse

export const DecodeRequest = (
  code: number[],
  format: NumericFormat,
  theme: Draw.ThemeName,
): DecodeRequest => ({
  _tag: 'effect-tree-demo-request',
  code: {code},
  style: {format, theme},
})

export const DecodeResponse = (
  request: RootState,
  tree: Tree<number>,
  lines: string[],
  stats: PrimedStats,
): DecodeResponse => ({
  _tag: 'effect-tree-demo-response',
  ...request,
  tree,
  lines,
  stats,
})

export const isWorkerMessage = (
  data: DecodeMessage | Record<string, string>,
): data is DecodeMessage =>
  '_tag' in data && data['_tag'].startsWith('effect-tree-demo-')

export const isDecodeRequest = (data: DecodeMessage): data is DecodeRequest =>
  data._tag === 'effect-tree-demo-request'
