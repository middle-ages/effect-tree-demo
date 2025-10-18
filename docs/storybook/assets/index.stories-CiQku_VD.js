import{j as v}from"./jsx-runtime-BBpt9uZ8.js";import{a as S,s as _,b as x,m as D}from"./index-BmW2xu2G.js";import{s as m}from"./pseudo-uX_LwC5u.js";import{d as T}from"./argTypes-963DSJ_I.js";import{r as u}from"./iframe-DLMhvWgQ.js";import{B as A}from"./index-Uy0U1Kx3.js";const B=`import {twMerge} from 'tailwind-merge'
import type {StyledProps} from '../../util.js'
import type {MouseListener, VoidAction} from '../types'

interface Props extends VoidAction, StyledProps {
  isActive?: boolean | undefined
  listener?: MouseListener
}

export const Button = ({
  label,
  title: note,
  apply,
  disable,
  isActive = false,
  listener,
  className,
  ...props
}: Props) => {
  const disabled: boolean = disable === undefined ? false : disable[0]
  const title: string = disabled && disable !== undefined ? disable[1] : note
  return (
    <button
      className={twMerge('button flex', className)}
      {...(isActive && {'data-state': 'active'})}
      {...props}
      {...listener}
      {...{title, disabled}}
      onClick={() => {
        if (!disabled) {
          apply()
        }
      }}>
      {label}
    </button>
  )
}
`,{action:O}=__STORYBOOK_MODULE_ACTIONS__,{expect:P}=__STORYBOOK_MODULE_TEST__,b=x(A,D(t=>t===""?void 0:[!0,t],"disable")),C={component:b,parameters:{..._(B),...S},argTypes:{...T("apply")},args:{id:"firstCode",label:"First Code",title:"Jump to first code.",disable:"",apply:O("apply")}},o={},e={args:{disable:"disable note"}},s=m.hover(),r=m.active(),a=m.focusVisible(),n={parameters:s.parameters,args:{...e.args,...s.args}},c={parameters:r.parameters,args:{...e.args,...r.args}},p={parameters:a.parameters,args:{...e.args,...a.args}},i={args:{label:"before"},render:function({apply:l,...d}){const[g,f]=u.useState("before"),y=u.useCallback(()=>{l(),f("after")},[l]);return v.jsx(b,{...d,apply:y,label:g})},play:async({canvas:t,userEvent:l})=>{const d=t.getByText("before");await l.click(d),await P(t.getByText("after")).toBeInTheDocument()}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    disable: 'disable note'
  }
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"pseudo.story.hover<Props>()",...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"pseudo.story.active<Props>()",...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"pseudo.story.focusVisible<Props>()",...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  parameters: Hover.parameters as {},
  args: {
    ...Disabled.args,
    ...Hover.args
  }
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  parameters: Active.parameters as {},
  args: {
    ...Disabled.args,
    ...Active.args
  }
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  parameters: Focus.parameters as {},
  args: {
    ...Disabled.args,
    ...Focus.args
  }
}`,...p.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};const E=["Basic","Disabled","Hover","Active","Focus","DisabledHover","DisabledActive","DisabledFocus","ClickTest"],H=Object.freeze(Object.defineProperty({__proto__:null,Active:r,Basic:o,ClickTest:i,Disabled:e,DisabledActive:c,DisabledFocus:p,DisabledHover:n,Focus:a,Hover:s,__namedExportsOrder:E,default:C},Symbol.toStringTag,{value:"Module"}));export{H as g};
