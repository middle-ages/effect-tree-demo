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

/**
 * Gallery view for a single story.
 */
export const GalleryFrame = ({
  index,
  name,
  Story,
  topIndex,
  storyFrameClass,
}: StoryFrameProps) => (
  <div className='flex h-min flex-col gap-px overflow-hidden'>
    <OrdinalLabel
      ordinal={index}
      label={<div className='tracking-wide text-fg-control'>{name}</div>}
      topOrdinal={topIndex}
      className='ml-1'
    />
    <div
      className={twMerge(
        'w-fit border border-line-light p-2',
        storyFrameClass,
      )}>
      <Story />
    </div>
  </div>
)
