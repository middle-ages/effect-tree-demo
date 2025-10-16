import{j as _}from"./jsx-runtime-CG1xpAJ6.js";import{a as D,s as x,b as T,m as B}from"./index-BSv6a1fl.js";import{s as y}from"./pseudo-C8PbS2Z9.js";import{d as O}from"./argTypes-CSM1vGze.js";import{r as f}from"./iframe-BogCSYVz.js";const g=({id:e,label:o,title:c,apply:b,disable:n})=>{const p=n===void 0?!1:n[0],S=p&&n!==void 0?n[1]:c;return _.jsx("button",{className:"button",id:e,title:S,disabled:p,onClick:()=>{p||b()},children:o})};try{g.displayName="Button",g.__docgenInfo={description:"",displayName:"Button",props:{apply:{defaultValue:null,description:"",name:"apply",required:!0,type:{name:"() => void"}},disable:{defaultValue:null,description:"",name:"disable",required:!0,type:{name:"[isDisabled: boolean, disabledNote: string]"}},id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}},label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"string"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}}}}}catch{}const A=`import type {VoidAction} from '../types'

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
`,{action:C}=__STORYBOOK_MODULE_ACTIONS__,{expect:V}=__STORYBOOK_MODULE_TEST__,v=T(g,B(e=>e===""?void 0:[!0,e],"disable")),k={component:v,parameters:{...x(A),...D},argTypes:{...O("apply")},args:{id:"firstCode",label:"First Code",title:"Jump to first code.",disable:"",apply:C("apply")}},i={},r={args:{disable:"disable note"}},a=y.hover(),s=y.active(),t=y.focusVisible(),l={parameters:a.parameters,args:{...r.args,...a.args}},d={parameters:s.parameters,args:{...r.args,...s.args}},u={parameters:t.parameters,args:{...r.args,...t.args}},m={args:{label:"before"},render:function({apply:o,...c}){const[b,n]=f.useState("before"),p=f.useCallback(()=>{o(),n("after")},[o]);return _.jsx(v,{...c,apply:p,label:b})},play:async({canvas:e,userEvent:o})=>{const c=e.getByText("before");await o.click(c),await V(e.getByText("after")).toBeInTheDocument()}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:"{}",...i.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    disable: 'disable note'
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"pseudo.story.hover<Props>()",...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"pseudo.story.active<Props>()",...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"pseudo.story.focusVisible<Props>()",...t.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: Hover.parameters as {},
  args: {
    ...Disabled.args,
    ...Hover.args
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  parameters: Active.parameters as {},
  args: {
    ...Disabled.args,
    ...Active.args
  }
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  parameters: Focus.parameters as {},
  args: {
    ...Disabled.args,
    ...Focus.args
  }
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'before'
  },
  render: function Render({
    apply: propsApply,
    ...props
  }) {
    const [label, setLabel] = useState('before');
    const apply = useCallback(() => {
      propsApply();
      setLabel('after');
    }, [propsApply]);
    return <Wrapper {...props} {...{
      apply,
      label
    }} />;
  },
  play: async ({
    canvas,
    userEvent
  }) => {
    const button = canvas.getByText('before');
    await userEvent.click(button);
    await expect(canvas.getByText('after')).toBeInTheDocument();
  }
}`,...m.parameters?.docs?.source}}};const E=["Basic","Disabled","Hover","Active","Focus","DisabledHover","DisabledActive","DisabledFocus","ClickTest"],L=Object.freeze(Object.defineProperty({__proto__:null,Active:s,Basic:i,ClickTest:m,Disabled:r,DisabledActive:d,DisabledFocus:u,DisabledHover:l,Focus:t,Hover:a,__namedExportsOrder:E,default:k},Symbol.toStringTag,{value:"Module"}));export{L as g};
