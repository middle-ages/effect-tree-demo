import{j as d}from"./jsx-runtime-B0gFdbzZ.js";import{F as m,a as u,s as b,S as g}from"./index-DN-unnOX.js";import{p as f,s as C}from"./pseudo-CqWyTUsk.js";import{d as S}from"./argTypes-BdW9UAF1.js";import{r as v}from"./iframe-BCheXTli.js";import"./preload-helper-PPVm8Dsz.js";const x=`'use client'

import {Array, pipe, type Identified} from '#util'
import {type SelectItem} from '../types'

interface Props<Value extends string> extends Identified {
  value: SelectItem
  items: SelectItem[]
  onChange: (value: Value) => void
}

export const Select = <Value extends string>({
  id,
  value: {id: value},
  items,
  onChange,
}: Props<Value>) => (
  <select
    {...{id, value}}
    onChange={e => {
      onChange(e.target.value as Value)
    }}>
    {pipe(
      items,
      Array.map(({id, label, title, icon}) => (
        <option key={id} value={id} {...{title}}>
          {icon}
          &nbsp;&nbsp;&nbsp;&nbsp;
          {label}
        </option>
      )),
    )}
  </select>
)
`,{action:y}=__STORYBOOK_MODULE_ACTIONS__,a=g,n=[{id:"a",label:"A",title:"a⇒A",icon:"a⇐A"},{id:"b",label:"B",title:"b⇒B",icon:"b⇐B"},{id:"c",label:"C",title:"c⇒C",icon:"c⇐C"},{id:"d",label:"D",title:"d⇒D",icon:"d⇐D"},{id:"e",label:"E",title:"e⇒E",icon:"e⇐E"}],V=o=>n[(o.codePointAt(0)??0)-97],D={component:a,parameters:{...b(x),...u,...f},argTypes:S("value","items"),args:{value:n[3],items:n,onChange:y("onChange")},decorators:m({className:"*:p-2"}),render:function({onChange:r,...i}){const[c,l]=v.useState(n[3]),p=s=>{l(V(s)),r(s)};return d.jsx(a,{...i,value:c,onChange:p})}},e={},t=C.focusVisible();e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"pseudo.story.focusVisible<Props>()",...t.parameters?.docs?.source}}};const B=["Select","FocusVisible"];export{t as FocusVisible,e as Select,B as __namedExportsOrder,D as default};
