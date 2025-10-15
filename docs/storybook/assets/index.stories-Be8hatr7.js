import{a as n,s as l,b as m,m as u,B as b}from"./index-DIeet80g.js";import{s as p}from"./pseudo-4nrmMcN5.js";import{d as g}from"./argTypes-CRUzRQsW.js";import"./iframe-CvpaWoqK.js";const v=`import type {VoidAction} from '../types'

interface Props extends VoidAction {}

export const Button = ({id, label, title: note, apply, disable}: Props) => {
  const disabled: boolean = disable === undefined ? false : disable[0]
  const title: string = disabled && disable !== undefined ? disable[1] : note
  return (
    <button
      className="button"
      {...{id, title, disabled}}
      onClick={() => {
        if (!disabled) {
          apply()
        }
      }}>
      {label}
    </button>
  )
}
`,{action:f}=__STORYBOOK_MODULE_ACTIONS__,y=m(b,u(d=>d===""?void 0:[!0,d],"disable")),D={component:y,parameters:{...l(v),...n},argTypes:{...g("apply")},args:{id:"firstCode",label:"First Code",title:"Jump to first code.",disable:"",apply:f("apply")}},o={},e={args:{disable:"disable note"}},s=p.hover(),r=p.active(),a=p.focusVisible(),t={parameters:s.parameters,args:{...e.args,...s.args}},c={parameters:r.parameters,args:{...e.args,...r.args}},i={parameters:a.parameters,args:{...e.args,...a.args}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    disable: 'disable note'
  }
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"pseudo.story.hover<Props>()",...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"pseudo.story.active<Props>()",...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"pseudo.story.focusVisible<Props>()",...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  parameters: Hover.parameters as {},
  args: {
    ...Disabled.args,
    ...Hover.args
  }
}`,...t.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  parameters: Active.parameters as {},
  args: {
    ...Disabled.args,
    ...Active.args
  }
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  parameters: Focus.parameters as {},
  args: {
    ...Disabled.args,
    ...Focus.args
  }
}`,...i.parameters?.docs?.source}}};const S=["Basic","Disabled","Hover","Active","Focus","DisabledHover","DisabledActive","DisabledFocus"],P=Object.freeze(Object.defineProperty({__proto__:null,Active:r,Basic:o,Disabled:e,DisabledActive:c,DisabledFocus:i,DisabledHover:t,Focus:a,Hover:s,__namedExportsOrder:S,default:D},Symbol.toStringTag,{value:"Module"}));export{P as g};
