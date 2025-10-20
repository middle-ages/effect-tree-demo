import{w as h,b as u,d as n,x as S,y as v,z as g,A as f,B as D,F as N,a as x,s as F}from"./index-BE5-cIaP.js";import"./iframe-BEe5FAEq.js";import{j as a}from"./jsx-runtime-HuQK5u_o.js";import{S as p}from"./index-B21ycH3H.js";import"./preload-helper-PPVm8Dsz.js";const y=e=>({id:e,label:e,icon:"",title:""}),k=u(h,D,n(([e,t])=>({key:e,...t}))),_=u(f,v(g),n(e=>[e,y(e)]),S),E=n(f,y),i=({format:e,theme:t,setFormat:s,setTheme:r})=>{const w={...h[e],key:e},b={..._[t],key:t};return a.jsxs("div",{className:"grid grid-cols-[11ch_1fr] set-fg-control",children:[a.jsx(d,{label:"Label format",children:a.jsx(p,{value:w,items:k,onChange:s,title:"Select a format for tree labels"})}),a.jsx(d,{label:"Tree theme",children:a.jsx(p,{value:b,items:E,onChange:r,title:"Select a tree theme."})})]})},d=({label:e,children:t})=>a.jsxs("label",{className:"form-row-h subgrid-2",children:[a.jsx("div",{className:"truncate form-row-h",children:e}),a.jsx("div",{className:"form-row-h py-1",children:t})]});try{i.displayName="StylePanel",i.__docgenInfo={description:"",displayName:"StylePanel",props:{theme:{defaultValue:null,description:"",name:"theme",required:!0,type:{name:'"ascii" | "bullets" | "dashed" | "dashedWide" | "dotted" | "double" | "hDouble" | "hThick" | "round" | "space" | "thick" | "thickDashed" | "thickDashedWide" | "thickDotted" | ... 10 more ... | "vThickDotted"'}},format:{defaultValue:null,description:"",name:"format",required:!0,type:{name:"NumericFormat"}},setFormat:{defaultValue:null,description:"",name:"setFormat",required:!0,type:{name:"Dispatcher<NumericFormat>"}},setTheme:{defaultValue:null,description:"",name:"setTheme",required:!0,type:{name:'Dispatcher<"ascii" | "bullets" | "dashed" | "dashedWide" | "dotted" | "double" | "hDouble" | "hThick" | "round" | "space" | "thick" | "thickDashed" | "thickDashedWide" | "thickDotted" | ... 10 more ... | "vThickDotted">'}}}}}catch{}const I=`import {sort, map} from '#Array'
import {simpleItem, type SelectItem} from '#types'
import {Select} from '#Select'
import {fromEntries, toEntries} from '#Record'
import {formats, type NumericFormat} from '#tree'
import {String, pipe, type Dispatcher} from '#util'
import {Draw} from 'effect-tree'
import type {PropsWithChildren} from 'react'

interface Props {
  theme: Draw.ThemeName
  format: NumericFormat
  setFormat: Dispatcher<NumericFormat>
  setTheme: Dispatcher<Draw.ThemeName>
}

const formatItems: SelectItem[] = pipe(
  formats,
  toEntries,
  map(([key, props]) => ({key, ...props})),
)

const themes: Record<Draw.ThemeName, SelectItem> = pipe(
  Draw.themeNames,
  sort(String.Order),
  map(name => [name, simpleItem(name)] as [Draw.ThemeName, SelectItem]),
  fromEntries,
)

const themeItems: SelectItem[] = map(Draw.themeNames, simpleItem)

export const StylePanel = ({format, theme, setFormat, setTheme}: Props) => {
  const selectedFormat = {...formats[format], key: format}
  const selectedTheme = {...themes[theme], key: theme}
  return (
    <div className="grid grid-cols-[11ch_1fr] set-fg-control">
      <Row label="Label format">
        <Select<NumericFormat>
          value={selectedFormat}
          items={formatItems}
          onChange={setFormat}
          title="Select a format for tree labels"
        />
      </Row>

      <Row label="Tree theme">
        <Select<Draw.ThemeName>
          value={selectedTheme}
          items={themeItems}
          onChange={setTheme}
          title="Select a tree theme."
        />
      </Row>
    </div>
  )
}

const Row = ({label, children}: {label: string} & PropsWithChildren) => (
  <label className="form-row-h subgrid-2">
    <div className="truncate form-row-h">{label}</div>
    <div className="form-row-h py-1">{children}</div>
  </label>
)
`,{expect:l,fn:T}=__STORYBOOK_MODULE_TEST__,B=T(),L=T(),W={component:i,parameters:{...F(I),...x},args:{format:"decimal",theme:"ascii",setFormat:B,setTheme:L},decorators:N({className:"*:p-2"})},o={},m={play:async({args:{setFormat:e},canvas:t,userEvent:s})=>{const r=t.getByLabelText("Label format");await l(r).toHaveValue("decimal"),await s.selectOptions(r,"upper"),await l(e).toHaveBeenCalledWith("upper")}},c={play:async({args:{setTheme:e},canvas:t,userEvent:s})=>{const r=t.getByLabelText("Tree theme");await l(r).toHaveValue("ascii"),await s.selectOptions(r,"bullets"),await l(e).toHaveBeenCalledWith("bullets")}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  play: async ({
    args: {
      setFormat
    },
    canvas,
    userEvent
  }) => {
    const select: HTMLSelectElement = canvas.getByLabelText('Label format');
    await expect(select).toHaveValue('decimal');
    await userEvent.selectOptions(select, 'upper');
    await expect(setFormat).toHaveBeenCalledWith('upper');
  }
}`,...m.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  play: async ({
    args: {
      setTheme
    },
    canvas,
    userEvent
  }) => {
    const select: HTMLSelectElement = canvas.getByLabelText('Tree theme');
    await expect(select).toHaveValue('ascii');
    await userEvent.selectOptions(select, 'bullets');
    await expect(setTheme).toHaveBeenCalledWith('bullets');
  }
}`,...c.parameters?.docs?.source}}};const P=["Basic","SetFormat","SetTheme"];export{o as Basic,m as SetFormat,c as SetTheme,P as __namedExportsOrder,W as default};
