import{t as g,F as _,s as b,m as k,b as f,u as h,d as N,e as x,g as y}from"./index-BSv6a1fl.js";import{s as T}from"./tree-BV43BRM3.js";import{j as e}from"./jsx-runtime-CG1xpAJ6.js";import{N as j}from"./index-CoauWrOv.js";import"./iframe-BogCSYVz.js";import"./preload-helper-PPVm8Dsz.js";const v="https://www.math.nagoya-u.ac.jp/~richard/teaching/s2024/SML_Tue_Tai_1.pdf",s=({children:r,className:m,href:p,...l})=>e.jsx("a",{rest:l,href:p.toString(),className:g("inline-block w-fit truncate",m),target:"_blank",children:r});s.PruferPaper=()=>e.jsxs(s,{href:new URL(v),title:"“Prüfer Encoding and a Proof of Cayley's Tree Formula”",className:"mx-auto rounded px-1",children:["Prüfer Code",e.jsx("span",{className:"inline-block text-3xl leading-2 pl-1 translate-y-1",children:"☞"})]});try{s.displayName="Link",s.__docgenInfo={description:"",displayName:"Link",props:{href:{defaultValue:null,description:"",name:"href",required:!0,type:{name:"URL"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}}}}}catch{}const u=({code:r})=>{const m=r.length===0;return e.jsxs("div",{className:`
        flex flex-col h-fill pt-1
        *:dom-play dom-play set-bg-light z-1`,children:[e.jsx(s.PruferPaper,{}),e.jsx("div",{className:"shrink-0 grow-0 h-11 px-2",children:e.jsx("div",{style:{scrollbarWidth:"thin"},className:g("h-full pt-1 pb-0.5 flex gap-1 items-center justify-center-safe rounded-lg",!m&&"scrollable-x"),children:r.length===0?e.jsx("div",{className:"font-serif text-xl",children:"[ ]"}):r.map((p,l)=>e.jsx(j,{className:"shrink-0 bottom-0",value:p,maxWidthPx:51},`key-${l.toString()}`))})})]})};try{u.displayName="Footer",u.__docgenInfo={description:"",displayName:"Footer",props:{code:{defaultValue:null,description:"",name:"code",required:!0,type:{name:"number[]"}}}}}catch{}const w=`import {Numeric} from '#Numeric'
import {twMerge} from 'tailwind-merge'
import {Link} from '#Link'

interface Props {
  code: number[]
}

export const Footer = ({code}: Props) => {
  const isFirstTree = code.length === 0

  return (
    <div
      className={\`
        flex flex-col h-fill pt-1
        *:dom-play dom-play set-bg-light z-1\`}>
      <Link.PruferPaper />
      <div className="shrink-0 grow-0 h-11 px-2">
        <div
          style={{scrollbarWidth: 'thin'}}
          className={twMerge(
            'h-full pt-1 pb-0.5 flex gap-1 items-center justify-center-safe rounded-lg',
            !isFirstTree && 'scrollable-x',
          )}>
          {code.length === 0 ? (
            <div className="font-serif text-xl">[ ]</div>
          ) : (
            code.map((code, i) => (
              <Numeric
                className="shrink-0 bottom-0"
                key={\`key-\${i.toString()}\`}
                value={code}
                maxWidthPx={51}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
`,F=k(T,"code")(u),C={component:F,parameters:b(w),args:{code:"1, 2, 3, 4, 5, 6, 7, 8"},decorators:_({})},a={},o={args:{code:""}},t={args:{code:"1"}},c={args:{code:"2"}},n={args:{code:"3"}},i={args:{code:f(1,y(48),N(x),h.comma)}},d={args:{code:f(50,y(48),N(x),h.comma)}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    code: ''
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    code: '1'
  }
}`,...t.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    code: '2'
  }
}`,...c.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    code: '3'
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    code: pipe(1, replicate(48), map(fromNumber), unwords.comma)
  }
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    code: pipe(50, replicate(48), map(fromNumber), unwords.comma)
  }
}`,...d.parameters?.docs?.source}}};const E=["TenNodes","NoNodes","ThreeNodes1","ThreeNodes2","ThreeNodes3","FiftyNodes1","FiftyNodesLast"];export{i as FiftyNodes1,d as FiftyNodesLast,o as NoNodes,a as TenNodes,t as ThreeNodes1,c as ThreeNodes2,n as ThreeNodes3,E as __namedExportsOrder,C as default};
