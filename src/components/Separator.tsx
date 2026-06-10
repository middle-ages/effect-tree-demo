import {setVars} from '#util'
import {twMerge} from 'tailwind-merge'

const spacing = 1.67

export const Separator = (
  <div
    className={twMerge(
      'pt-[calc(var(--top)*var(--spacing))]',
      'pb-[calc(var(--bottom)*var(--spacing))]',
    )}
    style={setVars({top: spacing, bottom: spacing})}>
    <div className="inset-xy border opacity-50" />
  </div>
)
