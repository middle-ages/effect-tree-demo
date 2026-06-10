import {ProjectLink} from '#ProjectLink'
import {twMerge} from 'tailwind-merge'

const topClassName = twMerge(
  'size-container h-row-small min-h-7 min-w-64 contain-strict',
)

const textClassName = twMerge(
  'px-3 flex place-content-center',
  'text-center text-lg font-medium',
  'tracking-[4%] text-transparent',
)

export const header = (
  <div {...{className: topClassName}}>
    <div
      title='A Prüfer Calculator'
      className={textClassName}
      style={{
        background:
          'linear-gradient(0deg, #222, #484245 40%, #585255 45%, #828588 75%, #929588 100%)',
        backgroundClip: 'text',
        textBoxTrim: 'trim-both',
        textBoxEdge: 'cap alphabetic',
        filter: 'drop-shadow(0px 1px 0.5px #fff)',
      }}>
      Counting Trees
    </div>
    <ProjectLink />
  </div>
)
