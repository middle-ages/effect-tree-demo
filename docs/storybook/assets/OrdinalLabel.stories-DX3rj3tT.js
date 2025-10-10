import{F as n,s as a,a as r,O as o}from"./index-DN-unnOX.js";import"./iframe-BCheXTli.js";import"./jsx-runtime-B0gFdbzZ.js";import"./preload-helper-PPVm8Dsz.js";const t=`import {type StyledProps} from '#util'
import type {ReactNode} from 'react'
import {twMerge} from 'tailwind-merge'

interface Props extends StyledProps {
  ordinal: number
  label: ReactNode
  topOrdinal?: number | undefined
}

export const OrdinalLabel = ({
  topOrdinal,
  ordinal,
  label,
  className,
  style,
}: Props) => (
  <div
    className={twMerge(
      'flex text-[12px] max-h-4 gap-1',
      '*:last:truncate *:last:set-fg-control *:first:ordinal',
      className,
    )}
    {...{style}}>
    <div>
      {topOrdinal !== undefined && <span>{(topOrdinal + 1).toString()}.</span>}
      <span>{(ordinal + 1).toString()}.</span>
    </div>
    <div>{label}</div>
  </div>
)
`,p={component:o,parameters:{...r,...a(t)},args:{ordinal:123,label:"The quick brown fox jumps over the lazy dog.",topOrdinal:345},decorators:[n({className:"*:border"})]},e={};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};const m=["OrdinalLabel"];export{e as OrdinalLabel,m as __namedExportsOrder,p as default};
