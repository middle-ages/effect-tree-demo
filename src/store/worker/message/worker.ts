import {unwords} from '#String'

export const secondaryTags = ['lines', 'maxDegree', 'maxDepth', 'svg'] as const

export const computeTags = [...secondaryTags, 'tree'] as const

export type ComputeTag = (typeof computeTags)[number]
export type SecondaryTag = (typeof secondaryTags)[number]

export type WorkerTag<Tag extends string = string> = `${WorkerPrefix}${Tag}`
export type DataTag<Tag extends string = string> = `${DataPrefix}${Tag}`

export type WorkerPrefix = typeof workerPrefix
export type DataPrefix = `${WorkerPrefix}${typeof dataSuffix}`

export const workerPrefix = 'effect-tree-demo-' as const
export const dataSuffix = 'data-' as const

export const dataTag = <Tag extends string>(tag: Tag): DataTag<Tag> =>
  `${workerPrefix}${dataSuffix}${tag}`

export const isWorkerTag = (tag: string): tag is WorkerTag =>
  tag.startsWith(workerPrefix)

export const isDataTag = (tag: string): tag is DataTag =>
  tag.startsWith(unwords.rest(workerPrefix, dataSuffix))

export interface Message<Tag extends WorkerTag> {
  _tag: Tag
}

export type DataMessage<Tag extends DataTag> = Message<Tag>

export function DataMessage<const Tag extends DataTag>(_tag: Tag) {
  return <Props>(props: Props): DataMessage<Tag> & Props => ({
    _tag,
    ...props,
  })
}
