import{j as e}from"./jsx-runtime-HuQK5u_o.js";import{h as x,i as f,t as d,s as h}from"./index-BE5-cIaP.js";import"./iframe-BEe5FAEq.js";import"./preload-helper-PPVm8Dsz.js";const o=({spacing:a,className:t,style:l})=>{const[i,c]=a instanceof Array?a:x(a);return e.jsx("div",{className:d("w-full px-1","pt-[calc(var(--top)_*_var(--spacing))]","pb-[calc(var(--bottom)_*_var(--spacing))]",t),style:{...f({top:i,bottom:c}),...l},children:e.jsx("div",{className:"border-color-inset border-[1.5px] opacity-50"})})};try{o.displayName="Separator",o.__docgenInfo={description:"",displayName:"Separator",props:{spacing:{defaultValue:null,description:"",name:"spacing",required:!0,type:{name:"number | [top: number, bottom: number]"}}}}}catch{}const n=({header:a,footer:t,view:l,toolbar:i,stats:c,stylePanel:p,className:m,style:u})=>e.jsxs("div",{className:d("px-2 flex flex-col fill-container-h overflow-hidden set-fg-control",m),style:u,children:[e.jsx("div",{className:"h-9 *:leading-9",children:a}),e.jsxs("div",{className:"flex-gap flex-1 mb-1.5",children:[e.jsxs("div",{className:"p-2 dark-col",children:[c,e.jsx(o,{spacing:[3,3+1/2]}),i,e.jsx(o,{spacing:3+1/2}),p]}),e.jsx("div",{className:"flex-1 size-container",children:l})]}),e.jsx("div",{className:"h-20 dark-col",children:t})]});try{n.displayName="Layout",n.__docgenInfo={description:"",displayName:"Layout",props:{stats:{defaultValue:null,description:"",name:"stats",required:!0,type:{name:"ReactNode"}},header:{defaultValue:null,description:"",name:"header",required:!0,type:{name:"ReactNode"}},footer:{defaultValue:null,description:"",name:"footer",required:!0,type:{name:"ReactNode"}},view:{defaultValue:null,description:"",name:"view",required:!0,type:{name:"ReactNode"}},toolbar:{defaultValue:null,description:"",name:"toolbar",required:!0,type:{name:"ReactNode"}},stylePanel:{defaultValue:null,description:"",name:"stylePanel",required:!0,type:{name:"ReactNode"}}}}}catch{}const y=`import type {ReactNode} from 'react'
import type {StyledProps} from '#util'
import {twMerge} from 'tailwind-merge'
import {Separator} from '#Separator'

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
        'px-2 flex flex-col fill-container-h overflow-hidden set-fg-control',
        className,
      )}
      {...{style}}>
      <div className="h-9 *:leading-9">{header}</div>
      <div className={\`flex-gap flex-1 mb-1.5\`}>
        <div className="p-2 dark-col">
          {stats}
          <Separator spacing={[3, 3 + 1 / 2]} />
          {toolbar}
          <Separator spacing={3 + 1 / 2} />
          {stylePanel}
        </div>
        <div className="flex-1 size-container">{view}</div>
      </div>
      <div className="h-20 dark-col">{footer}</div>
    </div>
  )
}
`,r=({children:a,className:t})=>e.jsx("div",{className:d("h-full flex place-items-center place-content-center rounded-lg","inner-shadow",t),children:e.jsx("div",{className:"relative m-1 p-1 text-white text-shadow-[0px_1px_2px] text-shadow-gray-800",children:a})}),_={component:n,parameters:h(y),args:{header:e.jsx(r,{className:"bg-red-400 h-9",children:"header"}),stats:e.jsx(r,{className:"bg-orange-400 min-h-16",children:"stats"}),toolbar:e.jsx(r,{className:"bg-yellow-400 min-h-24",children:"toolbar"}),stylePanel:e.jsx(r,{className:"bg-green-400 min-h-12 min-w-48",children:"stylePanel"}),view:e.jsx(r,{className:"bg-cyan-400 min-h-24 min-w-72",children:"view"}),footer:e.jsx(r,{className:"bg-purple-400 h-20",children:"footer"})}},s={};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source}}};const w=["Layout"];export{s as Layout,w as __namedExportsOrder,_ as default};
