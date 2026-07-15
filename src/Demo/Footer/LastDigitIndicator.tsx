import {anchorName, setVar} from '#Css'
import {useTooltipTop} from '#Tooltip/useTooltip'
import {twMerge} from 'tailwind-merge'
import {DigitIndexView} from './DigitIndexView'

const digitIndexClassName = twMerge(
  'max-h-5 absolute top-0 right-0 h-5 overflow-hidden',
  'font-serif text-[12px] text-ink leading-5.75',
  'border inset-xy bg-paper box-content',
  'squircle-input',
  'inset-shadow-[0.5px_1.5px_3.5px] inset-shadow-fg-control/35',
  'z-2 select-none pointer-none',
  'mr-2.25 mt-[1.5px]',
)

interface Props {
  lastVisible: number | undefined
  offsetPx: number
  inputWidthPx: number
  visibleCountRem: number
}

const id = 'last-digit'

const title = (
  <div className='max-w-48.5'>
    Index of the last visible digit in the Prüfer code of the current tree.
  </div>
)

export const LastDigitIndicator = ({
  lastVisible,
  offsetPx,
  inputWidthPx,
  visibleCountRem,
}: Props) => {
  const {ref, tooltip, isOpen} = useTooltipTop({
    id,
    title,
    style: {
      ...setVar('tooltip-left', '100% - 2rch'),
      transform: 'translate(-1.25rch)',
    },
    className: '*:first:translate-y-0.25',
  })

  return (
    <div className='contents'>
      <div
        {...{id, ref}}
        className={twMerge(digitIndexClassName, isOpen && 'bg-yellow-50')}
        style={{...anchorName(id), maxWidth: inputWidthPx - 4}}>
        <DigitIndexView
          offsetPx={offsetPx - Math.floor(visibleCountRem) + 0.5}
          digitIndex={lastVisible}
          style={setVar('translate-strut', 'calc(-3 * var(--spacing) / 2)')}
          className='-translate-x-2.5'
        />
      </div>
      {lastVisible !== undefined && tooltip}
    </div>
  )
}
