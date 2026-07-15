import {Details} from '#Details'
import {type PropsWithChildren} from 'react'
import {twMerge} from 'tailwind-merge'
import {NumericFormat} from './NumericFormat'
import {ShowTooltips} from './ShowTooltips'
import {ThemeName} from './ThemeName'
import {ShowWelcome} from './ShowWelcome'

const heightClass = 'h-29'

export const SettingsPanel = () => (
  <Details
    label={
      <>
        <span className='inline-block w-2.25 underline-offset-1 group-hover:font-medium group-hover:underline'>
          S
        </span>
        ettings
      </>
    }
    {...{heightClass}}
    Content={({isOpen: isFocusable}) => (
      <div
        className={twMerge(
          'grid auto-rows-7 grid-cols-[7rch_1fr] items-baseline gap-x-1 pt-1 contain-strict',
          'dom-play *:dom-play',
          heightClass,
        )}>
        <Row label='Format'>
          <NumericFormat {...{isFocusable}} />
        </Row>
        <Row label='Theme'>
          <ThemeName {...{isFocusable}} />
        </Row>
        <Row label='Tooltips'>
          <ShowTooltips {...{isFocusable}} />
        </Row>
        <Row label='Welcome'>
          <ShowWelcome {...{isFocusable}} />
        </Row>
      </div>
    )}></Details>
)

const Row = ({label, children}: {label: string} & PropsWithChildren) => (
  <label className='subgrid-2 h-row-small contain-size *:select-none'>
    <div className='leading-row-small contain-strict'>{label}</div>
    <div className='h-row-small py-0.5 pl-0.5 contain-strict'>{children}</div>
  </label>
)
