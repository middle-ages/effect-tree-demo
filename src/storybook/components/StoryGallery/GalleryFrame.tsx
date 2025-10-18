import {OrdinalLabel} from '#OrdinalLabel'
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
      label={<div className="set-fg-control tracking-wide">{name}</div>}
      topOrdinal={topIndex}
      className="ml-1"
    />
    <div
      className={twMerge(
        'w-fit p-2 border-1 set-light-border rounded-md',
        storyFrameClass,
      )}>
      <Story />
    </div>
  </div>
)
