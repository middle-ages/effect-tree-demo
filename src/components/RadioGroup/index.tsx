import {pipe} from '#Function'
import {type Focusable} from '#react/props'
import * as Record from '#Record'
import {Radio} from './Radio'

interface Props extends Partial<Focusable> {
  name: string
  value: string
  options: Record<string, string>
  onChange: (value: string) => void
}

export const RadioGroup = ({value, options, onChange, ...props}: Props) => (
  <div className='flex gap-5 pl-2'>
    {pipe(
      options,
      Record.map((label, id) => (
        <Radio
          key={id}
          {...{...props, onChange}}
          value={id}
          isChecked={value === id}>
          {label}
        </Radio>
      )),
      Record.values,
    )}
  </div>
)
