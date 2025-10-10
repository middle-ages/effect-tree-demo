import{c as v,s as P,a as b,m as S,N as F}from"./index-DN-unnOX.js";import{s as x}from"./pseudo-CqWyTUsk.js";import"./iframe-BCheXTli.js";const w=`import {map, range} from '#Array'
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

const horizontalSpacingPx = 4 * 2 + 2 * 2

/**
 * A component that displays a numeric value or a string message. The message
 * type can be:
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
      ? overflowWidth(maxWidthPx, formatted, fontSizePx)
      : [false, \`calc(\${givenWidth ?? '0'} + \${px(horizontalSpacingPx)})\`]
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
          ...(givenWidth !== undefined && {
            textAlign: 'right',
            paddingRight: 4.5,
          }),
          ...style,
        }}>
        {formatted}
      </span>{' '}
    </>
  )
}

const overflowWidth = (
  maxWidthPx: number,
  formatted: string,
  fontSizePx: number,
): [boolean, string] => {
  const sizeFactor = fontSizePx / baseFontSizePx
  const measuredPx = measure(formatted) * sizeFactor
  const availablePx = maxWidthPx - horizontalSpacingPx
  const widthPx = Math.min(measuredPx, availablePx) + horizontalSpacingPx

  // We do not want to add “truncate” before overflow
  // because you see to many ‘...’ on the transition
  // of adding a digit.
  const isOverflow = measuredPx >= availablePx

  return [isOverflow, px(widthPx)]
}

const measure = (s: string): number => {
  const occurrences = new Map<string, number>()
  for (const c of s) {
    occurrences.set(c, (occurrences.get(c) ?? 0) + 1)
  }
  return sumAll(
    [...occurrences.entries()].map(([c, count]) => {
      const measured = glyphWidthPx[c as keyof typeof glyphWidthPx] as
        | number
        | undefined

      return count * (measured ?? 10)
    }),
  )
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
  ({
    digits,
    className,
    ...props
  }: Omit<Props, 'width'> & {digits: number}): Props => ({
    ...props,
    width: px(digits * digitWidthPx),
    className: twMerge('text-right', className),
  }),
)(Numeric)
`,y=S(f=>{const h=f.replaceAll("_","");return BigInt(h)},"value")(F),_={component:y,parameters:{...b,...P(w)},args:{value:"1",isFlat:!1,maxWidthPx:160}},e={},t=x.hover(),s=x.focus(),o=x.focusVisible(),r={...e,args:{isFlat:!0}},i={...e,args:{value:"9_999_999"}},c={...e,args:{value:"10_000_000"}},l={...e,args:{value:"10_000_000",maxWidthPx:80}},m={...e,args:{value:"10_000_001"}},a={...e,args:{value:(50n**50n).toString()}},d={...e,args:{...a.args,...r.args}},u={...e,args:{width:v(24),value:"111"}},n={args:{className:"text-2xl h-9 leading-9",fontSizePx:24}},p={args:{...n.args,value:"123_456_789"}},g={args:{...n.args,value:"123_456_789_123_456_789"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"pseudo.story.hover<Props>()",...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"pseudo.story.focus<Props>()",...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"pseudo.story.focusVisible<Props>()",...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  ...Basic,
  args: {
    isFlat: true
  }
}`,...r.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  ...Basic,
  args: {
    value: '10_000_001'
  }
}`,...m.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...Basic,
  args: {
    value: (50n ** 50n).toString()
  }
}`,...a.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  ...Basic,
  args: {
    ...FiftyExpFifty.args,
    ...Flat.args
  }
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  ...Basic,
  args: {
    width: px(24),
    value: '111'
  }
}`,...u.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    className: 'text-2xl h-9 leading-9',
    fontSizePx: 24
  }
}`,...n.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    ...FontSize2xl.args,
    value: '123_456_789'
  }
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    ...FontSize2xl.args,
    value: '123_456_789_123_456_789'
  }
}`,...g.parameters?.docs?.source}}};const z=["Basic","Hover","Focus","FocusVisible","Flat","LessThanTenMillion","TenMillion","TenMillionConstrained","MoreThanTenMillion","FiftyExpFifty","FiftyExpFiftyFlat","FixedWidth","FontSize2xl","FontSize2xlBig","FontSize2xlConstrained"],T=Object.freeze(Object.defineProperty({__proto__:null,Basic:e,FiftyExpFifty:a,FiftyExpFiftyFlat:d,FixedWidth:u,Flat:r,Focus:s,FocusVisible:o,FontSize2xl:n,FontSize2xlBig:p,FontSize2xlConstrained:g,Hover:t,LessThanTenMillion:i,MoreThanTenMillion:m,TenMillion:c,TenMillionConstrained:l,__namedExportsOrder:z,default:_},Symbol.toStringTag,{value:"Module"}));export{T as a};
