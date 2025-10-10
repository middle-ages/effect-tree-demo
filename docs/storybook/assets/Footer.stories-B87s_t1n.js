import{t as h,N,F as _,s as y,m as w,b as p,u as i,d as l,e as u,g as f}from"./index-DN-unnOX.js";import{s as b}from"./tree-DdIZv0Cj.js";import{j as e}from"./jsx-runtime-B0gFdbzZ.js";import"./iframe-BCheXTli.js";import"./preload-helper-PPVm8Dsz.js";const v="https://www.math.nagoya-u.ac.jp/~richard/teaching/s2024/SML_Tue_Tai_1.pdf",d=({code:r})=>{const g=r.length===0;return e.jsxs("div",{className:`
        flex flex-col place-items-center pt-1
        *:dom-play dom-play overflow-hidden set-bg-light z-1`,children:[e.jsxs("a",{href:v,target:"_blank",title:"“Prüfer Encoding and a Proof of Cayley's Tree Formula”",className:`inline-block w-fit mb-1 h-[23px]
                    truncate mx-auto rounded px-1
        `,children:["Prüfer Code",e.jsx("span",{className:"inline-block text-3xl leading-2 pl-1 translate-y-1",children:"☞"})]}),e.jsx("div",{className:`mb-1.5 mt-0.5 h-[calc(7_*_var(--spacing)_+_15px+_4px)]
                    *:*:mb-2 max-w-full`,children:e.jsx("div",{className:h("flex gap-1.5 dom-play *:shrink-0 overflow-y-hidden",!g&&"overflow-x-auto"),children:r.length!==0&&r.map((m,x)=>e.jsx(N,{className:"text-2xl form-row-h",value:m,maxWidthPx:72,fontSizePx:24},m**2*x))})})]})};try{d.displayName="Footer",d.__docgenInfo={description:"",displayName:"Footer",props:{code:{defaultValue:null,description:"",name:"code",required:!0,type:{name:"number[]"}}}}}catch{}const T=`import {Numeric} from '#components'
import {twMerge} from 'tailwind-merge'

interface Props {
  code: number[]
}

const paper =
  'https://www.math.nagoya-u.ac.jp/~richard/teaching/s2024/SML_Tue_Tai_1.pdf'

export const Footer = ({code}: Props) => {
  const isFirstTree = code.length === 0

  return (
    <div
      className={\`
        flex flex-col place-items-center pt-1
        *:dom-play dom-play overflow-hidden set-bg-light z-1\`}>
      <a
        href={paper}
        target="_blank"
        title="“Prüfer Encoding and a Proof of Cayley's Tree Formula”"
        className={\`inline-block w-fit mb-1 h-[23px]
                    truncate mx-auto rounded px-1
        \`}>
        Prüfer Code
        <span className="inline-block text-3xl leading-2 pl-1 translate-y-1">
          ☞
        </span>
      </a>
      <div
        className={\`mb-1.5 mt-0.5 h-[calc(7_*_var(--spacing)_+_15px+_4px)]
                    *:*:mb-2 max-w-full\`}>
        <div
          className={twMerge(
            'flex gap-1.5 dom-play *:shrink-0 overflow-y-hidden',
            !isFirstTree && 'overflow-x-auto',
          )}>
          {code.length !== 0 &&
            code.map((code, i) => (
              <Numeric
                className="text-2xl form-row-h"
                key={code ** 2 * i}
                value={code}
                maxWidthPx={72}
                fontSizePx={24}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
`,F=w(b,"code")(d),M={component:F,parameters:y(T),args:{code:"1, 2, 3, 4, 5, 6, 7, 8"},decorators:_({})},a={},o={args:{code:"1"}},s={args:{code:"2"}},t={args:{code:"3"}},c={args:{code:p(1,f(48),l(u),i.comma)}},n={args:{code:p(50,f(48),l(u),i.comma)}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    code: '1'
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    code: '2'
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    code: '3'
  }
}`,...t.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    code: pipe(1, replicate(48), map(fromNumber), unwords.comma)
  }
}`,...c.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    code: pipe(50, replicate(48), map(fromNumber), unwords.comma)
  }
}`,...n.parameters?.docs?.source}}};const z=["TenNodes","ThreeNodes1","ThreeNodes2","ThreeNodes3","FiftyNodes1","FiftyNodesLast"];export{c as FiftyNodes1,n as FiftyNodesLast,a as TenNodes,o as ThreeNodes1,s as ThreeNodes2,t as ThreeNodes3,z as __namedExportsOrder,M as default};
