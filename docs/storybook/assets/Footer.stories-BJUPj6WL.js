import{t as x,N,F as y,s as b,m as T,b as d,u as l,d as m,e as p,g as u}from"./index-d02C2rMV.js";import{s as _}from"./tree-Bfuryk9l.js";import{j as e}from"./jsx-runtime-EAAf7b9g.js";import"./iframe-DcXzJmtC.js";import"./preload-helper-PPVm8Dsz.js";const w="https://www.math.nagoya-u.ac.jp/~richard/teaching/s2024/SML_Tue_Tai_1.pdf",i=({code:r})=>{const g=r.length===0;return e.jsxs("div",{className:`
        flex flex-col h-fill pt-1
        *:dom-play dom-play set-bg-light z-1`,children:[e.jsxs("a",{href:w,target:"_blank",title:"“Prüfer Encoding and a Proof of Cayley's Tree Formula”",className:`inline-block w-fit h-[22px]
                    truncate mx-auto rounded px-1
        `,children:["Prüfer Code",e.jsx("span",{className:"inline-block text-3xl leading-2 pl-1 translate-y-1",children:"☞"})]}),e.jsx("div",{className:"shrink-0 grow-0 h-11 px-2",children:e.jsx("div",{style:{scrollbarWidth:"thin"},className:x("flex gap-1.5 items-center dom-play h-full justify-center-safe",!g&&"scrollable-x"),children:r.length===0?e.jsx("div",{className:"font-serif text-xl",children:"[ ]"}):r.map((f,h)=>e.jsx(N,{className:"shrink-0 bottom-0",value:f,maxWidthPx:51},`key-${h.toString()}`))})})]})};try{i.displayName="Footer",i.__docgenInfo={description:"",displayName:"Footer",props:{code:{defaultValue:null,description:"",name:"code",required:!0,type:{name:"number[]"}}}}}catch{}const F=`import {Numeric} from '#components'
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
        flex flex-col h-fill pt-1
        *:dom-play dom-play set-bg-light z-1\`}>
      <a
        href={paper}
        target="_blank"
        title="“Prüfer Encoding and a Proof of Cayley's Tree Formula”"
        className={\`inline-block w-fit h-[22px]
                    truncate mx-auto rounded px-1
        \`}>
        Prüfer Code
        <span className="inline-block text-3xl leading-2 pl-1 translate-y-1">
          ☞
        </span>
      </a>
      <div className="shrink-0 grow-0 h-11 px-2">
        <div
          style={{scrollbarWidth: 'thin'}}
          className={twMerge(
            'flex gap-1.5 items-center dom-play h-full justify-center-safe',
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
`,v=T(_,"code")(i),M={component:v,parameters:b(F),args:{code:"1, 2, 3, 4, 5, 6, 7, 8"},decorators:y({})},a={},s={args:{code:"1"}},o={args:{code:"2"}},t={args:{code:"3"}},c={args:{code:d(1,u(48),m(p),l.comma)}},n={args:{code:d(50,u(48),m(p),l.comma)}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    code: '1'
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    code: '2'
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};const W=["TenNodes","ThreeNodes1","ThreeNodes2","ThreeNodes3","FiftyNodes1","FiftyNodesLast"];export{c as FiftyNodes1,n as FiftyNodesLast,a as TenNodes,s as ThreeNodes1,o as ThreeNodes2,t as ThreeNodes3,W as __namedExportsOrder,M as default};
