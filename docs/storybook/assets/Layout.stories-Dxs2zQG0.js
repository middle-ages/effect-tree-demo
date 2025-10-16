import{j as e}from"./jsx-runtime-CG1xpAJ6.js";import{t as o,F as u,s as x}from"./index-BSv6a1fl.js";import"./iframe-BogCSYVz.js";import"./preload-helper-PPVm8Dsz.js";const l=({header:r,footer:t,view:d,toolbar:i,stats:c,stylePanel:n,className:m,style:p})=>e.jsxs("div",{className:o("px-2 flex flex-col cqh-px overflow-hidden",m),style:p,children:[r,e.jsxs("div",{className:"min-h-0 flex gap-2 flex-1",children:[e.jsxs("div",{className:"w-96 flex flex-col rounded-lg set-bg-dark p-2 overflow-hidden",children:[c,e.jsx("div",{className:"separator mt-1 mb-1.5"}),i,e.jsx("div",{className:"separator mt-2 mb-[7px]"}),n]}),e.jsx("div",{className:"flex-1 size-container",children:d})]}),e.jsxs("div",{className:"set-bg-light relative z-1 shrink-0",children:[e.jsx("div",{className:"separator opacity-25"}),t]})]});try{l.displayName="Layout",l.__docgenInfo={description:"",displayName:"Layout",props:{stats:{defaultValue:null,description:"",name:"stats",required:!0,type:{name:"ReactNode"}},header:{defaultValue:null,description:"",name:"header",required:!0,type:{name:"ReactNode"}},footer:{defaultValue:null,description:"",name:"footer",required:!0,type:{name:"ReactNode"}},view:{defaultValue:null,description:"",name:"view",required:!0,type:{name:"ReactNode"}},toolbar:{defaultValue:null,description:"",name:"toolbar",required:!0,type:{name:"ReactNode"}},stylePanel:{defaultValue:null,description:"",name:"stylePanel",required:!0,type:{name:"ReactNode"}}}}}catch{}const f=`import type {ReactNode} from 'react'
import type {StyledProps} from '#util'
import {twMerge} from 'tailwind-merge'

interface Props
  extends StyledProps,
    Record<
      'header' | 'footer' | 'view' | 'toolbar' | 'stats' | 'stylePanel',
      ReactNode
    > {}

export const Layout = ({
  header,
  footer,
  view,
  toolbar,
  stats,
  stylePanel,
  className,
  style,
}: Props) => {
  return (
    <div
      className={twMerge(
        'px-2 flex flex-col cqh-px overflow-hidden',
        className,
      )}
      {...{style}}>
      {header}
      <div className={\`min-h-0 flex gap-2 flex-1\`}>
        <div className="w-96 flex flex-col rounded-lg set-bg-dark p-2 overflow-hidden">
          {stats}
          <div className="separator mt-1 mb-1.5" />
          {toolbar}
          <div className="separator mt-2 mb-[7px]" />
          {stylePanel}
        </div>
        <div className="flex-1 size-container">{view}</div>
      </div>
      <div className="set-bg-light relative z-1 shrink-0">
        <div className="separator opacity-25" />
        {footer}
      </div>
    </div>
  )
}
`,a=({children:r,className:t})=>e.jsx("div",{className:o("h-full flex place-items-center place-content-center rounded-lg","border-2 border-black",t),children:e.jsx("div",{className:"bg-[#fff6] rounded-lg p-1 m-1",children:r})}),g={component:l,parameters:x(f),args:{header:e.jsx(a,{className:"bg-red-400 h-10",children:"header"}),stats:e.jsx(a,{className:"bg-orange-400 max-h-24",children:"stats"}),toolbar:e.jsx(a,{className:"bg-yellow-400 max-h-32",children:"toolbar"}),stylePanel:e.jsx(a,{className:"bg-green-400 max-h-16",children:"stylePanel"}),view:e.jsx(a,{className:"bg-cyan-400 min-h-0",children:"view"}),footer:e.jsx(a,{className:"bg-purple-400 h-10",children:"footer"})},decorators:u({className:"m-2 p-0 *:p-2 *:size-container *:cqh-4"})},s={};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source}}};const b=["Layout"];export{s as Layout,b as __namedExportsOrder,g as default};
