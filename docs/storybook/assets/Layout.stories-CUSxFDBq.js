import{j as e}from"./jsx-runtime-DoGwtFLm.js";import{k as x,l as f,h as d,s as g}from"./index-BVtw-P1L.js";import"./iframe-DKhiFF43.js";import"./preload-helper-PPVm8Dsz.js";const s=({spacing:a,className:t,style:o})=>{const[n,i]=a instanceof Array?a:x(a);return e.jsx("div",{className:d("w-full px-1","pt-[calc(var(--top)*var(--spacing))]","pb-[calc(var(--bottom)*var(--spacing))]",t),style:{...f({top:n,bottom:i}),...o},children:e.jsx("div",{className:"border-color-inset border-[1.5px] opacity-50"})})};try{s.displayName="Separator",s.__docgenInfo={description:"",displayName:"Separator",props:{spacing:{defaultValue:null,description:"",name:"spacing",required:!0,type:{name:"number | [top: number, bottom: number]"}}}}}catch{}const c=({header:a,footer:t,view:o,toolbar:n,stats:i,stylePanel:p,graphPanel:m,className:u,style:h})=>e.jsxs("div",{className:d("px-2 flex flex-col fill-container-h overflow-hidden set-fg-control",u),style:h,children:[e.jsx("div",{className:"h-9 *:leading-9",children:a}),e.jsxs("div",{className:"flex-gap flex-1 mb-1.5",children:[e.jsxs("div",{className:"p-2 dark-col w-[426px]",children:[i,e.jsx(s,{spacing:2+1/2}),n,e.jsx(s,{spacing:2+1/2}),p,e.jsx(s,{spacing:2+1/2}),e.jsx("div",{className:"flex-1 size-container",children:m})]}),e.jsx("div",{className:"flex-1 size-container",children:o})]}),e.jsx("div",{className:"h-20 dark-col",children:t})]});try{c.displayName="Layout",c.__docgenInfo={description:"",displayName:"Layout",props:{header:{defaultValue:null,description:"",name:"header",required:!0,type:{name:"ReactNode"}},footer:{defaultValue:null,description:"",name:"footer",required:!0,type:{name:"ReactNode"}},view:{defaultValue:null,description:"",name:"view",required:!0,type:{name:"ReactNode"}},toolbar:{defaultValue:null,description:"",name:"toolbar",required:!0,type:{name:"ReactNode"}},stats:{defaultValue:null,description:"",name:"stats",required:!0,type:{name:"ReactNode"}},stylePanel:{defaultValue:null,description:"",name:"stylePanel",required:!0,type:{name:"ReactNode"}},graphPanel:{defaultValue:null,description:"",name:"graphPanel",required:!0,type:{name:"ReactNode"}}}}}catch{}const y=`import type {ReactNode} from 'react'
import type {StyledProps} from '#util'
import {twMerge} from 'tailwind-merge'
import {Separator} from '#Separator'

interface Props
  extends StyledProps,
    Record<
      | 'header'
      | 'footer'
      | 'view'
      | 'toolbar'
      | 'stats'
      | 'stylePanel'
      | 'graphPanel',
      ReactNode
    > {}

export const Layout = ({
  header,
  footer,
  view,
  toolbar,
  stats,
  stylePanel,
  graphPanel,
  className,
  style,
}: Props) => {
  return (
    <div
      className={twMerge(
        'px-2 flex flex-col fill-container-h overflow-hidden set-fg-control',
        className,
      )}
      {...{style}}>
      <div className="h-9 *:leading-9">{header}</div>
      <div className={\`flex-gap flex-1 mb-1.5\`}>
        <div className="p-2 dark-col w-[426px]">
          {stats}
          <Separator spacing={2 + 1 / 2} />
          {toolbar}
          <Separator spacing={2 + 1 / 2} />
          {stylePanel}
          <Separator spacing={2 + 1 / 2} />
          <div className="flex-1 size-container">{graphPanel}</div>
        </div>
        <div className="flex-1 size-container">{view}</div>
      </div>
      <div className="h-20 dark-col">{footer}</div>
    </div>
  )
}
`,r=({children:a,className:t})=>e.jsx("div",{className:d("h-full flex place-items-center place-content-center rounded-lg","inner-shadow",t),children:e.jsx("div",{className:"relative m-1 p-1 text-white text-shadow-[0px_1px_2px] text-shadow-gray-800",children:a})}),j={component:c,parameters:g(y),args:{header:e.jsx(r,{className:"bg-red-400 h-9",children:"header"}),stats:e.jsx(r,{className:"bg-orange-400 min-h-16",children:"stats"}),toolbar:e.jsx(r,{className:"bg-yellow-400 min-h-24",children:"toolbar"}),stylePanel:e.jsx(r,{className:"bg-green-400 min-h-12 min-w-48",children:"stylePanel"}),graphPanel:e.jsx(r,{className:"bg-purple-400 min-h-12 min-w-48",children:"graphPanel"}),view:e.jsx(r,{className:"bg-cyan-400 min-h-24 min-w-72",children:"view"}),footer:e.jsx(r,{className:"bg-blue-400 h-20",children:"footer"})}},l={};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"{}",...l.parameters?.docs?.source}}};const _=["Layout"];export{l as Layout,_ as __namedExportsOrder,j as default};
