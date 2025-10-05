import {type StyledProps} from '#util'
import {twMerge} from 'tailwind-merge'

interface Props extends StyledProps {
  lines: string[]
}

export const Text = ({lines, style, className}: Props) => {
  return (
    <div
      className={twMerge('font-mono *:leading-tight *:truncate', className)}
      {...{style}}>
      {lines.map((line, i) => (
        <div key={i}>{line.trimEnd().replaceAll(' ', '\u00a0')}</div>
      ))}
    </div>
  )
}
