import{F as s,b as r,s as i,a as o,d as l}from"./index-BE5-cIaP.js";import"./iframe-BEe5FAEq.js";import{P as m}from"./Pill-B1Fntjl0.js";import"./jsx-runtime-HuQK5u_o.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dh_T7oE0.js";const n=`import {isNonEmptyArray, lastInit} from '#Array'
import {Button} from '#Button'
import type {PillProps} from '#types'
import {twMerge} from 'tailwind-merge'

export const Pill = ({
  isActive,
  actions: [head, ...tail],
  style,
  className,
}: PillProps) => {
  if (!isNonEmptyArray(tail)) {
    return <Button {...{className, style}} {...head} />
  }

  const [last, init] = lastInit(tail)
  return (
    <div
      className={twMerge(
        'pill-panel form-row-inner-h *:h-[23px] w-full flex-center *:min-w-fit *:flex-1',
        className,
      )}
      {...{style}}>
      <Button key="first" {...head} {...{isActive}} className="pill-left" />
      {init.map((action, index) => (
        <Button
          {...action}
          {...{isActive}}
          key={index}
          className="pill-center"
        />
      ))}
      <Button key="last" {...last} {...{isActive}} className="pill-right" />
    </div>
  )
}
`,p=r(["a","b","c","d","e"],l((e,a)=>({id:e,label:`label-${e}:${a.toString()}`,title:`title-${e}:${a.toString()}`,disable:void 0,apply:()=>{}}))),P={component:m,parameters:{...o,...i(n)},args:{actions:p,className:"*:w-[20%]"},decorators:[s({className:"*:p-2 w-full h-12"})]},t={};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};const g=["Pill"];export{t as Pill,g as __namedExportsOrder,P as default};
