import{j as h}from"./jsx-runtime-HuQK5u_o.js";import{c as P,s as v,a as b,m as F}from"./index-BE5-cIaP.js";import{s as x}from"./pseudo-CjDPjBnN.js";import"./iframe-BEe5FAEq.js";import{N as w}from"./index-Dxy5n0zA.js";const y=`import {map, range} from '#Array'
import {tupled} from '#Function'
import {bigIntToExponential, sumAll} from '#Number'
import {monoRecord} from '#Record'
import {fromNumber} from '#String'
import {pipe, px, type Identified, type StyledProps} from '#util'
import {assumeProp, mapProps} from 'react-compinators'
import {twMerge} from 'tailwind-merge'

interface Props extends StyledProps, Identified {
  value: bigint | number | string
  maxWidthPx?: number | undefined
  width?: string
  fontSizePx?: number
  isFlat?: boolean
}

const digitWidthPx = 8
const baseFontSizePx = 16

// 16px CMU Serif
const glyphWidthPx = {
  ...pipe(range(0, 9), map(fromNumber), tupled(monoRecord(digitWidthPx))),
  e: 7.104,
  '+': 12.448,
  ',': 4.438,
  '.': 4.448,
}

const horizontalPaddingPx = 2 * 4
const beveledBorderPx = 2 * 2
const flatBorderPx = 2 * 1
const horizontalSpacingPx = (isFlat: boolean) =>
  horizontalPaddingPx + (isFlat ? flatBorderPx : beveledBorderPx)

/**
 * A component that displays a numeric value. The message type can be:
 *
 * 1. \`number\`
 * 2. \`bigint\`
 *
 * We normalize with no loss of precision into \`bigint\` and format so:
 *
 * 1. If the value \`< 10³⁶\` we display the number/bigint as a nice locale string.
 * 2. If the value \`≥ 10³⁶\` we display the number/bigint in exponential notation,
 *    but add a tooltip with the full expansion of the value.
 *
 * The element width will be set to the width of the displayed value if none is
 * given.
 *
 * If the computed/given width exceeds the given maximum width the element will
 * expand no more and the class \`truncate\` will be added to it. The tooltip
 * will still show the full expanded value.
 *
 * No truncate/limit will be applied if the width is given explicitly.
 */
export const Numeric = ({
  id,
  value,
  maxWidthPx,
  width: givenWidth,
  fontSizePx = 16,
  className,
  style,
  isFlat = false,
}: Props) => {
  const [isBig, formatted] = normalize(value)
  const [isOverflow, width] =
    givenWidth === undefined && maxWidthPx !== undefined
      ? overflowWidth(isFlat, maxWidthPx, formatted, fontSizePx)
      : [
          false,
          \`calc(\${givenWidth ?? '0'} + \${px(horizontalSpacingPx(isFlat))})\`,
        ]

  const title = isBig || isOverflow ? value.toLocaleString() : ''

  return (
    <>
      <span
        tabIndex={isFlat ? -1 : 0}
        className={twMerge(
          isFlat ? 'numeric-flat' : 'numeric-beveled',
          isOverflow && 'truncate',
          className,
        )}
        {...{id, title}}
        style={{
          width,
          ...(givenWidth !== undefined && {textAlign: 'right'}),
          ...style,
        }}>
        {formatted}
      </span>{' '}
    </>
  )
}

const overflowWidth = (
  isFlat: boolean,
  maxWidthPx: number,
  formatted: string,
  fontSizePx: number,
): [boolean, string] => {
  const sizeFactor = fontSizePx / baseFontSizePx
  const measuredPx = measure(formatted) * sizeFactor
  const availablePx = maxWidthPx - horizontalSpacingPx(isFlat)
  const widthPx =
    Math.min(measuredPx, availablePx) + horizontalSpacingPx(isFlat)

  // We do not want to add “truncate” before overflow
  // because you see to many ‘...’ on the transition
  // of adding a digit.
  const isOverflow = measuredPx >= availablePx

  return [isOverflow, px(widthPx)]
}

const widthPxCache = new Map<string, number>()

const measure = (s: string): number => {
  const cached = widthPxCache.get(s)
  if (cached !== undefined) {
    return cached
  }

  const occurrences = new Map<string, number>()
  for (const c of s) {
    occurrences.set(c, (occurrences.get(c) ?? 0) + 1)
  }
  const widthPx = sumAll(
    [...occurrences.entries()].map(([c, count]) => {
      const measured = glyphWidthPx[c as keyof typeof glyphWidthPx] as
        | number
        | undefined

      return count * (measured ?? 10)
    }),
  )

  widthPxCache.set(s, widthPx)
  return widthPx
}

const normalize = (
  value: bigint | number | string,
): [isBig: boolean, formatted: string] =>
  typeof value === 'number' || typeof value === 'bigint'
    ? value >= Math.pow(10, 36)
      ? [true, bigIntToExponential(BigInt(value))]
      : [false, value.toLocaleString()]
    : [false, value]

Numeric.Flat = assumeProp(Numeric, 'isFlat')(true)

Numeric.FixedWidth = mapProps(
  ({digits, ...props}: Omit<Props, 'width'> & {digits: number}): Props => ({
    ...props,
    width: px(digits * digitWidthPx),
  }),
)(Numeric)
`,f=F(p=>{const g=p.replaceAll("_","");return BigInt(g)},"value")(w),S={component:f,parameters:{...b,...v(y)},args:{value:"1",isFlat:!1,maxWidthPx:160,label:"Sixty zippers"},render:({label:p,...g})=>h.jsxs("div",{className:"flex gap-2 set-fg-control",children:[h.jsx("div",{className:"truncate",children:p}),h.jsx(f,{...g,label:p})]})},e={},r=x.hover(),a=x.focus(),s=x.focusVisible(),n={...e,args:{isFlat:!0}},o={...e,args:{isFlat:!0,width:P(24)}},i={...e,args:{value:"9_999_999"}},c={...e,args:{value:"10_000_000"}},l={...e,args:{value:"10_000_000",maxWidthPx:80}},d={...e,args:{value:"10_000_001"}},t={...e,args:{value:(50n**50n).toString()}},m={...e,args:{...t.args,...n.args}},u={...e,args:{width:P(24),value:"111"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"pseudo.story.hover<Props>()",...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"pseudo.story.focus<Props>()",...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"pseudo.story.focusVisible<Props>()",...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...Basic,
  args: {
    isFlat: true
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...Basic,
  args: {
    isFlat: true,
    width: px(3 * 8)
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  ...Basic,
  args: {
    value: '9_999_999'
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  ...Basic,
  args: {
    value: '10_000_000'
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...Basic,
  args: {
    value: '10_000_000',
    maxWidthPx: 80
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  ...Basic,
  args: {
    value: '10_000_001'
  }
}`,...d.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  ...Basic,
  args: {
    value: (50n ** 50n).toString()
  }
}`,...t.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  ...Basic,
  args: {
    ...FiftyExpFifty.args,
    ...Flat.args
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  ...Basic,
  args: {
    width: px(24),
    value: '111'
  }
}`,...u.parameters?.docs?.source}}};const W=["Basic","Hover","Focus","FocusVisible","Flat","FlatFixedWidth","LessThanTenMillion","TenMillion","TenMillionConstrained","MoreThanTenMillion","FiftyExpFifty","FiftyExpFiftyFlat","FixedWidth"],N=Object.freeze(Object.defineProperty({__proto__:null,Basic:e,FiftyExpFifty:t,FiftyExpFiftyFlat:m,FixedWidth:u,Flat:n,FlatFixedWidth:o,Focus:a,FocusVisible:s,Hover:r,LessThanTenMillion:i,MoreThanTenMillion:d,TenMillion:c,TenMillionConstrained:l,__namedExportsOrder:W,default:S},Symbol.toStringTag,{value:"Module"}));export{N as a};
