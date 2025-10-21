import{j as p}from"./jsx-runtime-DoGwtFLm.js";import{c as v,s as y,a as S,m as W}from"./index-BVtw-P1L.js";import{s as g}from"./pseudo-tRgrDwaa.js";import{r as z}from"./iframe-DKhiFF43.js";import{N as B}from"./index-mcBWO-wG.js";const M=`import {map, range} from '#Array'
import {noop, tupled} from '#Function'
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
  onChange?: (n: number) => void
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
  onChange = noop,
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
      <input
        tabIndex={isFlat ? -1 : 0}
        pattern="[1-9]\\d\\d\\d\\d"
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
        }}
        onChange={event => {
          const value = event.target.value
          //          const parsed = value === '' ? 0 : parseInt(value.replace(/^0+/, ''))
          onChange(parseInt(value))
        }}
        value={formatted}
      />{' '}
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
`,f=W(h=>BigInt(h),"value")(B),T={component:f,parameters:{...S,...y(M)},args:{value:1,isFlat:!1,maxWidthPx:160,label:"Sixty zippers"},render:function({label:x,value:P,...b}){const[F,w]=z.useState(P);return p.jsxs("div",{className:"flex gap-2 set-fg-control",children:[p.jsx("div",{className:"truncate",children:x}),p.jsx(f,{...b,label:x,value:F,onChange:w})]})}},e={},r=g.hover(),a=g.focus(),s=g.focusVisible(),n={...e,args:{isFlat:!0}},o={...e,args:{isFlat:!0,width:v(24)}},i={...e,args:{value:9999999}},c={...e,args:{value:1e7}},l={...e,args:{value:1e7,maxWidthPx:80}},d={...e,args:{value:10000001}},t={...e,args:{value:(50n**50n).toString()}},u={...e,args:{...t.args,...n.args}},m={...e,args:{width:v(24),value:111}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"pseudo.story.hover<Props>()",...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"pseudo.story.focus<Props>()",...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"pseudo.story.focusVisible<Props>()",...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
    value: 9_999_999
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  ...Basic,
  args: {
    value: 10_000_000
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...Basic,
  args: {
    value: 10_000_000,
    maxWidthPx: 80
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  ...Basic,
  args: {
    value: 10_000_001
  }
}`,...d.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  ...Basic,
  args: {
    value: (50n ** 50n).toString()
  }
}`,...t.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  ...Basic,
  args: {
    ...FiftyExpFifty.args,
    ...Flat.args
  }
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  ...Basic,
  args: {
    width: px(24),
    value: 111
  }
}`,...m.parameters?.docs?.source}}};const N=["Basic","Hover","Focus","FocusVisible","Flat","FlatFixedWidth","LessThanTenMillion","TenMillion","TenMillionConstrained","MoreThanTenMillion","FiftyExpFifty","FiftyExpFiftyFlat","FixedWidth"],j=Object.freeze(Object.defineProperty({__proto__:null,Basic:e,FiftyExpFifty:t,FiftyExpFiftyFlat:u,FixedWidth:m,Flat:n,FlatFixedWidth:o,Focus:a,FocusVisible:s,Hover:r,LessThanTenMillion:i,MoreThanTenMillion:d,TenMillion:c,TenMillionConstrained:l,__namedExportsOrder:N,default:T},Symbol.toStringTag,{value:"Module"}));export{j as a};
