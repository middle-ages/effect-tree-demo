import {useRotate} from '#useRotate'
import {String} from '#util'
import {useCallback, type CSSProperties} from 'react'
import {twMerge} from 'tailwind-merge'
import {
  colorEntryKeys,
  type ColorSortHandlers,
  type ColorSortKey,
} from './model'

interface Props extends ColorSortHandlers {
  className: string
  height: string
}

export const HeaderRow = ({className, height, ...state}: Props) => (
  <div
    style={{height}}
    className={twMerge(
      'sticky top-0 text-fg-control *:text-center',
      'text-cqw z-1',
      className,
    )}>
    <div />
    {colorEntryKeys.map(columnSortKey => (
      <HeaderCell key={columnSortKey} {...{columnSortKey}} {...state} />
    ))}
  </div>
)

const HeaderCell = ({
  columnSortKey,
  sortBy,
  flipDirection,
  setSortBy,
}: {
  columnSortKey: ColorSortKey
} & ColorSortHandlers) => {
  const {transform, increment} = useRotate()
  const isSelected = columnSortKey === sortBy

  const onClick = useCallback(() => {
    if (isSelected) {
      flipDirection()
      increment()
    } else {
      setSortBy(columnSortKey)
    }
  }, [columnSortKey, flipDirection, isSelected, setSortBy, increment])

  return (
    <button
      {...{onClick}}
      tabIndex={-1}
      className={`button h-row-small flex-1 cursor-pointer space-x-1 rounded-none border-[1.5px] pr-1 pl-1 focus:z-1`}>
      <span className='pl-0.5 text-smaller'>
        {String.toUpperCaseFirst(columnSortKey)}
      </span>
      <span
        className='left-full inline-block size-6 rounded-full leading-6'
        style={
          {
            opacity: isSelected ? 1 : 0.5,
            transform: `${transform} scale(0.8)`,
            background: `linear-gradient(90deg, #eaeaea, #d6d6d6, #c0c0c0)`,
          } as CSSProperties
        }>
        <div style={{transform: 'scale(0.9)'}}>➨</div>
      </span>
    </button>
  )
}
