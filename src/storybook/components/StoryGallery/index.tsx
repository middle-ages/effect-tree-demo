import {Array, per, pipe, rch, Record} from '#util'
import {composeStories} from '@storybook/react-vite'
import {ScrollPanel} from '../ScrollPanel'
import {GalleryFrame} from './GalleryFrame'
import type {Imported} from './types'

interface Props<Groups extends Record<string, Imported<any>>> {
  name: string
  groups: Groups

  maxColumnWidth?: string
  minColumnWidth?: string

  storyFrameClass?: string
}

export const GroupGallery = <Groups extends Record<string, Imported<any>>>({
  name,
  groups,
  minColumnWidth: min = rch(10),
  maxColumnWidth: max = per(30),
  ...props
}: Props<Groups>) => {
  const entries = Record.toEntries(groups)
  const minmax = `minmax(${min}, ${max})`

  let i = 0
  return (
    <ScrollPanel header={name}>
      <div
        className="grid gap-3"
        style={{gridTemplateColumns: `repeat(auto-fill,${minmax})`}}>
        {pipe(
          entries,
          Array.map(([prefix, stories]) => (
            <StoryGroup
              key={prefix}
              index={i++}
              {...props}
              {...{stories}}
              prefix={entries.length === 1 ? undefined : prefix}
            />
          )),
        )}
      </div>
    </ScrollPanel>
  )
}

const StoryGroup = ({
  index: topIndex,
  prefix,
  stories,
  storyFrameClass = '',
}: {
  index: number
  prefix: string | undefined
  stories: Imported<any>
  storyFrameClass?: string
}) => {
  let index = 0
  return (
    <>
      {pipe(
        composeStories(stories, {}),
        Record.toEntries,
        Array.map(([suffix, Story]) => {
          const name =
            (prefix === undefined ? '' : `${prefix}.`) + (suffix as string)
          return (
            <GalleryFrame
              key={name}
              index={index++}
              {...{name, topIndex, storyFrameClass, Story}}
            />
          )
        }),
      )}
    </>
  )
}
