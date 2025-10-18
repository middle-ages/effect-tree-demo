import{F as s,b as r,s as i,a as o,d as l}from"./index-BmW2xu2G.js";import"./iframe-DLMhvWgQ.js";import{P as m}from"./Pill-CIZ1veJB.js";import"./jsx-runtime-BBpt9uZ8.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Uy0U1Kx3.js";const c=`import {isNonEmptyArray, lastInit} from '#Array'
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
        'min-w-[232px] flex *:min-w-[4.5rch] p-0.5',
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
`,p=r(["a","b","c","d","e"],l((a,e)=>({id:a,label:`label-${a}:${e.toString()}`,title:`title-${a}:${e.toString()}`,disable:void 0,apply:()=>{}}))),P={component:m,parameters:{...o,...i(c)},args:{actions:p,className:"*:w-[20%]"},decorators:[s({className:"*:p-2 w-full h-12"})]},t={};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};const g=["Pill"];export{t as Pill,g as __namedExportsOrder,P as default};
