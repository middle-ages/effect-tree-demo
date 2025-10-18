import{O as u,c as d,t as x,B as f,f as g,s as h}from"./index-BmW2xu2G.js";import"./iframe-DLMhvWgQ.js";import{j as e}from"./jsx-runtime-BBpt9uZ8.js";import{a as y,D as b,d as I,e as _,F as C,c as N,I as w,b as v,g as S,f as j,L as P,h as z}from"./IncHalfNodeCount-COajUXtx.js";import"./preload-helper-PPVm8Dsz.js";const H=Object.freeze(Object.defineProperty({__proto__:null,DecCode:y,DecHalfCode:b,DecHalfNodeCount:I,DecNodeCount:_,FirstCode:C,FirstNodeCount:N,IncCode:w,IncHalfCode:v,IncHalfNodeCount:S,IncNodeCount:j,LastCode:P,LastNodeCount:z},Symbol.toStringTag,{value:"Module"})),l=({index:r,name:a,icon:n,iconColor:i,iconSizePx:o})=>{const c=Math.pow(o,.6)+Math.pow(o,.3),p=c/2,m=c/2;return e.jsxs("div",{className:`flex-col h-min overflow-hidden inner-shadow
                  set-bg p-2 place-items-center rounded-xl`,style:{paddingTop:p},children:[e.jsx(u,{label:a,ordinal:r,className:"w-min"}),e.jsx("div",{className:`box-content set-border-inset flex
                    place-items-center place-content-center`,style:{borderRadius:m,width:d(o),height:d(o),transform:"scale(3)",color:i},children:n})]})};try{l.displayName="IconBox",l.__docgenInfo={description:"",displayName:"IconBox",props:{index:{defaultValue:null,description:"",name:"index",required:!0,type:{name:"number"}},name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}},icon:{defaultValue:null,description:"",name:"icon",required:!0,type:{name:"ReactNode"}},iconColor:{defaultValue:null,description:"",name:"iconColor",required:!0,type:{name:"string"}},iconSizePx:{defaultValue:null,description:"",name:"iconSizePx",required:!0,type:{name:"number"}}}}}catch{}const G=f(H),q="h-[calc(100%-_var(--headerHeight))]",s=({iconColor:r,iconSizePx:a})=>e.jsxs("div",{className:"px-1.5 pb-1.5 set-bg-light fill-container overflow-hidden",children:[e.jsx("h1",{children:"Icon Gallery"}),e.jsx("div",{className:x(q,"[--topShadowUp:8px] [--bottomShadowDown:8px]","p-2 set-bg-dark scrollable-y size-container","set-light-border rounded-[20px] [&::after]:bottom-0"),children:e.jsx("div",{className:"grid gap-3",style:{gridTemplateColumns:"repeat(auto-fill,minmax(min-content,150px))"},children:G.map(([n,i],o)=>e.jsx(l,{index:o,name:n,icon:i,iconColor:r,iconSizePx:a},n))})})]});try{s.displayName="IconGallery",s.__docgenInfo={description:"",displayName:"IconGallery",props:{iconColor:{defaultValue:null,description:"",name:"iconColor",required:!0,type:{name:"string"}},iconSizePx:{defaultValue:null,description:"",name:"iconSizePx",required:!0,type:{name:"number"}}}}}catch{}const B=`import * as icons from '#icons'
import {Record} from '#util'
import {twMerge} from 'tailwind-merge'
import {IconBox} from './IconBox'

const allIcons = Record.toEntries(icons)

interface Props {
  iconColor: string
  iconSizePx: number
}

const scrollableHeight = 'h-[calc(100%-_var(--headerHeight))]'

export const IconGallery = ({iconColor, iconSizePx}: Props) => {
  return (
    <div className="px-1.5 pb-1.5 set-bg-light fill-container overflow-hidden">
      <h1>Icon Gallery</h1>
      <div
        className={twMerge(
          scrollableHeight,
          '[--topShadowUp:8px] [--bottomShadowDown:8px]',
          'p-2 set-bg-dark scrollable-y size-container',
          'set-light-border rounded-[20px] [&::after]:bottom-0',
        )}>
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: \`repeat(auto-fill,minmax(min-content,150px))\`,
          }}>
          {allIcons.map(([name, icon], index) => {
            return (
              <IconBox
                key={name}
                {...{index, name, icon, iconColor, iconSizePx}}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
`,O={component:s,args:{iconSizePx:64},parameters:{...h(B),...g}},t={};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};const E=["IconGallery"];export{t as IconGallery,E as __namedExportsOrder,O as default};
