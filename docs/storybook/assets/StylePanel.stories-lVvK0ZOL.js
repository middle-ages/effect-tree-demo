import{w as h,b as u,d as n,x as S,y as w,z as v,A as f,B as D,F as N,a as x,s as F}from"./index-BmW2xu2G.js";import"./iframe-DLMhvWgQ.js";import{j as r}from"./jsx-runtime-BBpt9uZ8.js";import{S as p}from"./index-Co5lRDHc.js";import"./preload-helper-PPVm8Dsz.js";const y=e=>({id:e,label:e,icon:"",title:""}),k=u(h,D,n(([e,t])=>({key:e,...t}))),_=u(f,w(v),n(e=>[e,y(e)]),S),E=n(f,y),i=({format:e,theme:t,setFormat:s,setTheme:a})=>{const T={...h[e],key:e},b={..._[t],key:t};return r.jsxs("div",{className:"grid grid-cols-[11ch_1fr] gap-0.5 set-fg-control",children:[r.jsx(d,{label:"Label format",children:r.jsx(p,{value:T,items:k,onChange:s,title:"Select a format for tree labels"})}),r.jsx(d,{label:"Tree theme",children:r.jsx(p,{value:b,items:E,onChange:a,title:"Select a tree theme."})})]})},d=({label:e,children:t})=>r.jsxs("label",{className:"form-row-h grid grid-cols-subgrid col-span-2 h-7",children:[r.jsx("div",{className:"truncate leading-7 h-7",children:e}),t]});try{i.displayName="StylePanel",i.__docgenInfo={description:"",displayName:"StylePanel",props:{theme:{defaultValue:null,description:"",name:"theme",required:!0,type:{name:'"ascii" | "bullets" | "dashed" | "dashedWide" | "dotted" | "double" | "hDouble" | "hThick" | "round" | "space" | "thick" | "thickDashed" | "thickDashedWide" | "thickDotted" | ... 10 more ... | "vThickDotted"'}},format:{defaultValue:null,description:"",name:"format",required:!0,type:{name:"NumericFormat"}},setFormat:{defaultValue:null,description:"",name:"setFormat",required:!0,type:{name:"Dispatcher<NumericFormat>"}},setTheme:{defaultValue:null,description:"",name:"setTheme",required:!0,type:{name:'Dispatcher<"ascii" | "bullets" | "dashed" | "dashedWide" | "dotted" | "double" | "hDouble" | "hThick" | "round" | "space" | "thick" | "thickDashed" | "thickDashedWide" | "thickDotted" | ... 10 more ... | "vThickDotted">'}}}}}catch{}const I=`import {sort, map} from '#Array'
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
    <div className="grid grid-cols-[11ch_1fr] gap-0.5 set-fg-control">
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
  <label className="form-row-h grid grid-cols-subgrid col-span-2 h-7">
    <div className="truncate leading-7 h-7">{label}</div>
    {children}
  </label>
)
`,{expect:l,fn:g}=__STORYBOOK_MODULE_TEST__,B=g(),L=g(),j={component:i,parameters:{...F(I),...x},args:{format:"decimal",theme:"ascii",setFormat:B,setTheme:L},decorators:N({className:"*:p-2"})},o={},m={play:async({args:{setFormat:e},canvas:t,userEvent:s})=>{const a=t.getByLabelText("Label format");await l(a).toHaveValue("decimal"),await s.selectOptions(a,"upper"),await l(e).toHaveBeenCalledWith("upper")}},c={play:async({args:{setTheme:e},canvas:t,userEvent:s})=>{const a=t.getByLabelText("Tree theme");await l(a).toHaveValue("ascii"),await s.selectOptions(a,"bullets"),await l(e).toHaveBeenCalledWith("bullets")}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}};const P=["Basic","SetFormat","SetTheme"];export{o as Basic,m as SetFormat,c as SetTheme,P as __namedExportsOrder,j as default};
