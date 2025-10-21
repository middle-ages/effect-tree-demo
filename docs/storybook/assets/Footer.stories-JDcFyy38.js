import{h as f,F as _,s as b,m as F,b as g,u as N,d as x,i as h,j as y}from"./index-BVtw-P1L.js";import{s as T}from"./tree-CWzxT9dY.js";import{j as e}from"./jsx-runtime-DoGwtFLm.js";import{N as k}from"./index-mcBWO-wG.js";import"./iframe-DKhiFF43.js";import"./preload-helper-PPVm8Dsz.js";import"./Number-CddmtPRa.js";const w="https://www.math.nagoya-u.ac.jp/~richard/teaching/s2024/SML_Tue_Tai_1.pdf",s=({children:r,className:m,href:p,...l})=>e.jsx("a",{rest:l,href:p.toString(),className:f("inline-block w-fit truncate rounded","h-[20px] mt-2 leading-[21px] mb-1.5 px-1.5 pb-1",m),target:"_blank",children:r});s.PruferPaper=()=>e.jsxs(s,{href:new URL(w),title:"“Prüfer Encoding and a Proof of Cayley's Tree Formula”",className:"self-center",children:["Prüfer Code",e.jsx("span",{className:"inline-block text-3xl leading-2 pl-1 translate-y-1",children:"☞"})]});try{s.displayName="Link",s.__docgenInfo={description:"",displayName:"Link",props:{href:{defaultValue:null,description:"",name:"href",required:!0,type:{name:"URL"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}}}}}catch{}const u=({code:r})=>{const m=r.length===0;return e.jsxs(e.Fragment,{children:[e.jsx(s.PruferPaper,{}),e.jsx("div",{className:"mx-2 no-flex h-11",children:e.jsx("div",{className:f("h-full rounded-md set-bg-darker inner-shadow","gap-1 flex place-items-center-safe place-content-center-safe",!m&&"scrollable-x"),children:r.length===0?e.jsx("div",{className:"font-serif text-xl",children:"[ ]"}):r.map((p,l)=>e.jsx(k,{className:"no-flex",value:p,maxWidthPx:40},`key-${l.toString()}`))})})]})};try{u.displayName="Footer",u.__docgenInfo={description:"",displayName:"Footer",props:{code:{defaultValue:null,description:"",name:"code",required:!0,type:{name:"number[]"}}}}}catch{}const P=`import {Numeric} from '#Numeric'
import {twMerge} from 'tailwind-merge'
import {Link} from '#Link'

interface Props {
  code: number[]
}

export const Footer = ({code}: Props) => {
  const isFirstTree = code.length === 0

  return (
    <>
      <Link.PruferPaper />
      <div className="mx-2 no-flex h-11">
        <div
          className={twMerge(
            'h-full rounded-md set-bg-darker inner-shadow',
            'gap-1 flex place-items-center-safe place-content-center-safe',
            !isFirstTree && 'scrollable-x',
          )}>
          {code.length === 0 ? (
            <div className="font-serif text-xl">[ ]</div>
          ) : (
            code.map((code, i) => (
              <Numeric
                className="no-flex"
                key={\`key-\${i.toString()}\`}
                value={code}
                maxWidthPx={4 * 10}
              />
            ))
          )}
        </div>
      </div>
    </>
  )
}
`,j=F(T,"code")(u),R={component:j,parameters:b(P),args:{code:"1, 2, 3, 4, 5, 6, 7, 8"},decorators:_({})},a={},o={args:{code:""}},t={args:{code:"1"}},c={args:{code:"2"}},n={args:{code:"3"}},d={args:{code:g(1,y(48),x(h),N.comma)}},i={args:{code:g(50,y(48),x(h),N.comma)}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    code: pipe(1, replicate(48), map(fromNumber), unwords.comma)
  }
}`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    code: pipe(50, replicate(48), map(fromNumber), unwords.comma)
  }
}`,...i.parameters?.docs?.source}}};const V=["TenNodes","NoNodes","ThreeNodes1","ThreeNodes2","ThreeNodes3","FiftyNodes1","FiftyNodesLast"];export{d as FiftyNodes1,i as FiftyNodesLast,o as NoNodes,a as TenNodes,t as ThreeNodes1,c as ThreeNodes2,n as ThreeNodes3,V as __namedExportsOrder,R as default};
