import{F as e,s as o}from"./decorators-COc7judH.js";import{B as s}from"./Button-B8NH6be9.js";import"./jsx-runtime-DJONvF-u.js";import"./iframe-BbgcHPys.js";import"./preload-helper-PPVm8Dsz.js";const r=`import type {VoidAction} from './types'

interface Props<Id extends string> extends VoidAction<Id> {}

export const Button = <Id extends string>({
  id,
  label,
  note,
  apply,
  disable,
}: Props<Id>) => {
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
`,{action:a}=__STORYBOOK_MODULE_ACTIONS__,c={component:s,parameters:o(r),args:{id:"firstCode",label:"First Code",note:"Jump to first code.",disable:void 0,apply:a("apply")},decorators:e({})},t={};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};const m=["Button"];export{t as Button,m as __namedExportsOrder,c as default};
