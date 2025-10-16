import{v as h,b as u,d as n,w,x as f,y as S,F as v,a as D,s as x}from"./index-BSv6a1fl.js";import"./iframe-BogCSYVz.js";import{j as r}from"./jsx-runtime-CG1xpAJ6.js";import{S as p}from"./index-D6BzZJer.js";import"./preload-helper-PPVm8Dsz.js";const y=e=>({id:e,label:e,icon:"",title:""}),N=u(h,S,n(([e,t])=>({key:e,...t}))),F=u(f,n(e=>[e,y(e)]),w),k=n(f,y),i=({format:e,theme:t,setFormat:s,setTheme:a})=>{const g={...h[e],key:e},b={...F[t],key:t};return r.jsxs("div",{className:"grid grid-cols-[min-content_1fr] gap-[5px] set-fg-control",children:[r.jsx(d,{label:"Label format",children:r.jsx(p,{value:g,items:N,onChange:s,title:"Select a format for tree labels"})}),r.jsx(d,{label:"Tree theme",children:r.jsx(p,{value:b,items:k,onChange:a,title:"Select a tree theme."})})]})},d=({label:e,children:t})=>r.jsxs("label",{className:"grid grid-cols-subgrid col-span-2 *:form-row-h",children:[r.jsx("div",{className:"truncate form-row-h",children:e}),t]});try{i.displayName="StylePanel",i.__docgenInfo={description:"",displayName:"StylePanel",props:{theme:{defaultValue:null,description:"",name:"theme",required:!0,type:{name:'"ascii" | "bullets" | "dashed" | "dashedWide" | "dotted" | "double" | "hDouble" | "hThick" | "round" | "space" | "thick" | "thickDashed" | "thickDashedWide" | "thickDotted" | ... 10 more ... | "vThickDotted"'}},format:{defaultValue:null,description:"",name:"format",required:!0,type:{name:"NumericFormat"}},setFormat:{defaultValue:null,description:"",name:"setFormat",required:!0,type:{name:"Dispatcher<NumericFormat>"}},setTheme:{defaultValue:null,description:"",name:"setTheme",required:!0,type:{name:'Dispatcher<"ascii" | "bullets" | "dashed" | "dashedWide" | "dotted" | "double" | "hDouble" | "hThick" | "round" | "space" | "thick" | "thickDashed" | "thickDashedWide" | "thickDotted" | ... 10 more ... | "vThickDotted">'}}}}}catch{}const _=`import {map} from '#Array'
import {simpleItem, type SelectItem} from '#components'
import {Select} from '#Select'
import {fromEntries, toEntries} from '#Record'
import {formats, type NumericFormat} from '#tree'
import {pipe, type Dispatcher} from '#util'
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
  map(name => [name, simpleItem(name)] as [Draw.ThemeName, SelectItem]),
  fromEntries,
)

const themeItems: SelectItem[] = map(Draw.themeNames, simpleItem)

export const StylePanel = ({format, theme, setFormat, setTheme}: Props) => {
  const selectedFormat = {...formats[format], key: format}
  const selectedTheme = {...themes[theme], key: theme}
  return (
    <div className="grid grid-cols-[min-content_1fr] gap-[5px] set-fg-control">
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
  <label className="grid grid-cols-subgrid col-span-2 *:form-row-h">
    <div className="truncate form-row-h">{label}</div>
    {children}
  </label>
)
`,{expect:l,fn:T}=__STORYBOOK_MODULE_TEST__,E=T(),I=T(),W={component:i,parameters:{...x(_),...D},args:{format:"decimal",theme:"ascii",setFormat:E,setTheme:I},decorators:v({className:"*:p-2"})},o={},m={play:async({args:{setFormat:e},canvas:t,userEvent:s})=>{const a=t.getByLabelText("Label format");await l(a).toHaveValue("decimal"),await s.selectOptions(a,"upper"),await l(e).toHaveBeenCalledWith("upper")}},c={play:async({args:{setTheme:e},canvas:t,userEvent:s})=>{const a=t.getByLabelText("Tree theme");await l(a).toHaveValue("ascii"),await s.selectOptions(a,"bullets"),await l(e).toHaveBeenCalledWith("bullets")}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}};const j=["Basic","SetFormat","SetTheme"];export{o as Basic,m as SetFormat,c as SetTheme,j as __namedExportsOrder,W as default};
