import {map} from '#Array'
import {toEntries} from '#Record'
import {pipe, type Dispatcher} from '#util'
import {formats, type NumericFormat} from './roman/roman.js'

interface Props {
  format: NumericFormat
  setFormat: Dispatcher<NumericFormat>
}

export const StylePanel = ({format, setFormat}: Props) => {
  return (
    <div
      className={`grid grid-cols-[min-content_1fr] gap-2
                  text-[var(--controlFg)]`}>
      <label className="mr-2 grid grid-cols-subgrid col-span-2">
        <div className="truncate leading-6">Label format</div>

        <select
          value={format}
          onChange={e => {
            setFormat(e.target.value as NumericFormat)
          }}>
          <button>
            <selectedcontent></selectedcontent>
          </button>
          {pipe(
            formats,
            toEntries,
            map(([key, {icon, label, title}]) => (
              <option key={key} {...{title}} value={key} className="flex gap-2">
                <span className="pr-2 font-serif inline-block w-10">
                  {icon}
                </span>
                <span className="pl-2 inline-block">{label}</span>
              </option>
            )),
          )}
        </select>
      </label>
    </div>
  )
}
