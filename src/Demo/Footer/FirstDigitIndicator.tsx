import {anchorName, setVar} from '#Css'
import {useTooltipTop} from '#Tooltip/useTooltip'
import {twMerge} from 'tailwind-merge'
import {DigitIndexView} from './DigitIndexView'

const digitIndexClassName = twMerge(
  'max-h-5.5 absolute-0 h-5.5 overflow-hidden',
  'font-serif text-[12px] text-ink leading-5.75',
  'border inset-xy bg-paper',
  'squircle-input',
  'inset-shadow-[0.5px_1.5px_3.5px] inset-shadow-fg-control/35',
  'z-2 select-none pointer-none',
  'ml-2 mt-[1.5px]',
)

interface Props {
  digitIndex: number
  offsetPx: number
  maxWidth: number
}

const id = 'first-digit'

const title = (
  <div className='max-w-48.5'>
    Index of the first visible digit in the Prüfer code of the current tree.
  </div>
)

export const FirstDigitIndicator = ({maxWidth, ...props}: Props) => {
  const {ref, tooltip, isOpen} = useTooltipTop({
    id,
    title,
    style: {...setVar('tooltip-left', '2rch'), transform: 'translate(1.25rch)'},
    className: '*:first:translate-y-0.25',
  })

  return (
    <div className='contents'>
      <div
        {...{id, ref}}
        className={twMerge(digitIndexClassName, isOpen && 'bg-yellow-50')}
        style={{...anchorName(id), maxWidth: maxWidth - 6}}>
        <DigitIndexView {...props} className='-ml-2.5' />
      </div>
      {tooltip}
    </div>
  )
}
