import {OrdinalLabel} from '../../../components/OrdinalLabel'
import type {FC} from 'react'
import {twMerge} from 'tailwind-merge'

export interface StoryFrameProps {
  index: number
  name: string
  Story: FC<{}>
  topIndex?: number
  storyFrameClass?: string
}

export const GalleryFrame = ({
  index,
  name,
  Story,
  topIndex,
  storyFrameClass,
}: StoryFrameProps) => (
  <div className="flex flex-col gap-px h-min overflow-hidden">
    <OrdinalLabel
      ordinal={index}
      label={<div className="text-fg-control tracking-wide">{name}</div>}
      topOrdinal={topIndex}
      className="ml-1"
    />
    <div
      className={twMerge(
        'w-fit p-2 border border-line-light',
        storyFrameClass,
      )}>
      <Story />
    </div>
  </div>
)
