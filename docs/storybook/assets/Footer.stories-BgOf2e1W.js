import{F as x,s as h,m as N,p as d,u as m,a as p,f as l,r as u}from"./decorators-COc7judH.js";import{s as y}from"./tree-BGmFmoej.js";import{j as e}from"./jsx-runtime-DJONvF-u.js";import{N as _}from"./Numeric-C-5xAlV0.js";import"./Button-B8NH6be9.js";import"./iframe-BbgcHPys.js";import"./preload-helper-PPVm8Dsz.js";const w="https://www.math.nagoya-u.ac.jp/~richard/teaching/s2024/SML_Tue_Tai_1.pdf",n=({code:i})=>e.jsxs("div",{className:`
        flex flex-col w-full justify-center *:text-center h-16
        *:transition transition overflow-hidden`,children:[e.jsxs("a",{href:w,target:"_blank",title:"“Prüfer Encoding and a Proof of Cayley's Tree Formula”",className:"inline-block w-fit text-sm h-6 leading-5 truncate mx-auto",children:["Prüfer Code",e.jsx("span",{className:"inline-block text-3xl leading-2 pl-1 translate-y-1",children:"☞"})]}),e.jsx("div",{className:"flex gap-1 mb-2 h-7 mx-auto transition",children:i.map((f,g)=>e.jsx(_,{className:"text-2xl leading-8 h-7 shrink-0",value:f,maxWidthPx:60,sizeFactor:1.5},g))})]});try{n.displayName="Footer",n.__docgenInfo={description:"",displayName:"Footer",props:{code:{defaultValue:null,description:"",name:"code",required:!0,type:{name:"number[]"}}}}}catch{}const T=`import {Numeric} from '#components'

interface Props {
  code: number[]
}

const paper =
  'https://www.math.nagoya-u.ac.jp/~richard/teaching/s2024/SML_Tue_Tai_1.pdf'

export const Footer = ({code}: Props) => {
  return (
    <div
      className={\`
        flex flex-col w-full justify-center *:text-center h-16
        *:transition transition overflow-hidden\`}>
      <a
        href={paper}
        target="_blank"
        title="“Prüfer Encoding and a Proof of Cayley's Tree Formula”"
        className="inline-block w-fit text-sm h-6 leading-5 truncate mx-auto">
        Prüfer Code
        <span className="inline-block text-3xl leading-2 pl-1 translate-y-1">
          ☞
        </span>
      </a>
      <div className="flex gap-1 mb-2 h-7 mx-auto transition">
        {code.map((code, i) => (
          <Numeric
            className="text-2xl leading-8 h-7 shrink-0"
            key={i}
            value={code}
            maxWidthPx={60}
            sizeFactor={1.5}
          />
        ))}
      </div>
    </div>
  )
}
`,F=N(y,"code")(n),E={component:F,parameters:h(T),args:{code:"1, 2, 3, 4, 5, 6, 7, 8"},decorators:x({})},r={},a={args:{code:"1"}},o={args:{code:"2"}},s={args:{code:"3"}},t={args:{code:d(1,u(48),p(l),m.comma)}},c={args:{code:d(50,u(48),p(l),m.comma)}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    code: '1'
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    code: '2'
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    code: '3'
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    code: pipe(1, replicate(48), map(fromNumber), unwords.comma)
  }
}`,...t.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    code: pipe(50, replicate(48), map(fromNumber), unwords.comma)
  }
}`,...c.parameters?.docs?.source}}};const L=["TenNodes","ThreeNodes1","ThreeNodes2","ThreeNodes3","FiftyNodes1","FiftyNodesLast"];export{t as FiftyNodes1,c as FiftyNodesLast,r as TenNodes,a as ThreeNodes1,o as ThreeNodes2,s as ThreeNodes3,L as __namedExportsOrder,E as default};
