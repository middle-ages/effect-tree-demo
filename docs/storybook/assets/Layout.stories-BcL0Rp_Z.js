import{j as e}from"./jsx-runtime-BBpt9uZ8.js";import{h as f,i as x,t as i,F as y,s as g}from"./index-BmW2xu2G.js";import"./iframe-DLMhvWgQ.js";import"./preload-helper-PPVm8Dsz.js";const o=({spacing:a,className:t,style:l})=>{const[c,n]=a instanceof Array?a:f(a);return e.jsx("div",{className:i("w-full px-1","pt-[calc(var(--top)_*_var(--spacing))]","pb-[calc(var(--bottom)_*_var(--spacing))]",t),style:{...x({top:c,bottom:n}),...l},children:e.jsx("div",{className:"border-color-inset border-1 opacity-65"})})};try{o.displayName="Separator",o.__docgenInfo={description:"",displayName:"Separator",props:{spacing:{defaultValue:null,description:"",name:"spacing",required:!0,type:{name:"number | [top: number, bottom: number]"}}}}}catch{}const d=({header:a,footer:t,view:l,toolbar:c,stats:n,stylePanel:p,className:m,style:u})=>e.jsxs("div",{className:i("px-2 flex-gap-col h-screen overflow-hidden",m),style:u,children:[a,e.jsxs("div",{className:"flex gap-1.5 flex-1",children:[e.jsxs("div",{className:"flex flex-col rounded-lg set-bg-dark p-2",children:[n,e.jsx(o,{spacing:[3,3+1/2]}),c,e.jsx(o,{spacing:3+1/2}),p]}),e.jsx("div",{className:"flex-1 size-container",children:l})]}),t]});try{d.displayName="Layout",d.__docgenInfo={description:"",displayName:"Layout",props:{stats:{defaultValue:null,description:"",name:"stats",required:!0,type:{name:"ReactNode"}},header:{defaultValue:null,description:"",name:"header",required:!0,type:{name:"ReactNode"}},footer:{defaultValue:null,description:"",name:"footer",required:!0,type:{name:"ReactNode"}},view:{defaultValue:null,description:"",name:"view",required:!0,type:{name:"ReactNode"}},toolbar:{defaultValue:null,description:"",name:"toolbar",required:!0,type:{name:"ReactNode"}},stylePanel:{defaultValue:null,description:"",name:"stylePanel",required:!0,type:{name:"ReactNode"}}}}}catch{}const h=`import type {ReactNode} from 'react'
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
        'px-2 flex-gap-col h-screen overflow-hidden',
        className,
      )}
      {...{style}}>
      {header}
      <div className={\`flex gap-1.5 flex-1\`}>
        <div className="flex flex-col rounded-lg set-bg-dark p-2">
          {stats}
          <Separator spacing={[3, 3 + 1 / 2]} />
          {toolbar}
          <Separator spacing={3 + 1 / 2} />
          {stylePanel}
        </div>
        <div className="flex-1 size-container">{view}</div>
      </div>
      {footer}
    </div>
  )
}
`,r=({children:a,className:t})=>e.jsx("div",{className:i("h-full flex place-items-center place-content-center rounded-lg","border-2 border-black",t),children:e.jsx("div",{className:"bg-[#fff6] rounded-lg p-1 m-1",children:a})}),j={component:d,parameters:g(h),args:{header:e.jsx(r,{className:"bg-red-400 h-10",children:"header"}),stats:e.jsx(r,{className:"bg-orange-400 max-h-24",children:"stats"}),toolbar:e.jsx(r,{className:"bg-yellow-400 max-h-32",children:"toolbar"}),stylePanel:e.jsx(r,{className:"bg-green-400 max-h-16",children:"stylePanel"}),view:e.jsx(r,{className:"bg-cyan-400 min-h-0",children:"view"}),footer:e.jsx(r,{className:"bg-purple-400 h-10",children:"footer"})},decorators:y({className:"m-2 p-0 *:p-2 *:size-container *:cqh-4"})},s={};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source}}};const w=["Layout"];export{s as Layout,w as __namedExportsOrder,j as default};
