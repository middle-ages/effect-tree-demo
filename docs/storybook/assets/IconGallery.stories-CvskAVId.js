import{O as u,c as d,al as f,B as x,t as g,f as y,s as I}from"./index-BE5-cIaP.js";import"./iframe-BEe5FAEq.js";import{j as o}from"./jsx-runtime-HuQK5u_o.js";import{a as C,D as _,d as h,e as N,F as P,c as S,I as b,b as j,g as w,f as G,L as q,h as v}from"./IncHalfNodeCount-DoNdzvMe.js";import"./preload-helper-PPVm8Dsz.js";const z=Object.freeze(Object.defineProperty({__proto__:null,DecCode:C,DecHalfCode:_,DecHalfNodeCount:h,DecNodeCount:N,FirstCode:P,FirstNodeCount:S,IncCode:b,IncHalfCode:j,IncHalfNodeCount:w,IncNodeCount:G,LastCode:q,LastNodeCount:v},Symbol.toStringTag,{value:"Module"})),i=({index:r,name:t,icon:n,iconColor:l,iconSizePx:e})=>{const c=Math.pow(e,.6)+Math.pow(e,.3),m=c/2,p=c/2;return o.jsxs("div",{className:`flex-col h-min overflow-hidden inner-shadow
                  set-bg p-2 place-items-center rounded-md`,style:{paddingTop:m},children:[o.jsx(u,{label:t,ordinal:r,className:"w-fit"}),o.jsx("div",{className:"set-border-inset flex-center",style:{borderRadius:p,width:d(e),height:d(e),transform:"scale(3)",color:l},children:n})]})};try{i.displayName="IconBox",i.__docgenInfo={description:"",displayName:"IconBox",props:{index:{defaultValue:null,description:"",name:"index",required:!0,type:{name:"number"}},name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}},icon:{defaultValue:null,description:"",name:"icon",required:!0,type:{name:"ReactNode"}},iconColor:{defaultValue:null,description:"",name:"iconColor",required:!0,type:{name:"string"}},iconSizePx:{defaultValue:null,description:"",name:"iconSizePx",required:!0,type:{name:"number"}}}}}catch{}const B=x(z),V="grid-cols-[repeat(auto-fill,minmax(min-content,150px))]",s=({iconColor:r,iconSizePx:t})=>o.jsx(f,{header:"Icon Gallery",children:o.jsx("div",{className:g("grid gap-3",V),children:B.map(([n,l],e)=>o.jsx(i,{index:e,name:n,icon:l,iconColor:r,iconSizePx:t},n))})});try{s.displayName="IconGallery",s.__docgenInfo={description:"",displayName:"IconGallery",props:{iconColor:{defaultValue:null,description:"",name:"iconColor",required:!0,type:{name:"string"}},iconSizePx:{defaultValue:null,description:"",name:"iconSizePx",required:!0,type:{name:"number"}}}}}catch{}const M=`import * as icons from '#icons'
import {Record} from '#util'
import {twMerge} from 'tailwind-merge'
import {IconBox} from './IconBox'
import {ScrollPanel} from '../ScrollPanel'

const allIcons = Record.toEntries(icons)

interface Props {
  iconColor: string
  iconSizePx: number
}

const gridClass = 'grid-cols-[repeat(auto-fill,minmax(min-content,150px))]'

export const IconGallery = ({iconColor, iconSizePx}: Props) => {
  return (
    <ScrollPanel header="Icon Gallery">
      <div className={twMerge('grid gap-3', gridClass)}>
        {allIcons.map(([name, icon], index) => (
          <IconBox key={name} {...{index, name, icon, iconColor, iconSizePx}} />
        ))}
      </div>
    </ScrollPanel>
  )
}
`,H={component:s,args:{iconSizePx:64},parameters:{...I(M),...y}},a={};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};const F=["IconGallery"];export{a as IconGallery,F as __namedExportsOrder,H as default};
