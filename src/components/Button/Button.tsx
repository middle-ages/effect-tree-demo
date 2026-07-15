import {anchorName} from '#Css'
import type {DisabledItemProps} from '#types'
import {useMergeRefPair} from '#useMergeRefs'
import type {Simplify} from 'effect/Types'
import {type RefCallback} from 'react'
import {twMerge} from 'tailwind-merge'
import {useTooltipBottom} from '#Tooltip/useTooltip'

interface _BaseProps extends Omit<DisabledItemProps, 'isDisabled'> {
  ref?: RefCallback<HTMLButtonElement>
  isFocusable?: boolean

  /** Control button active pseudo state externally. */
  isActive?: boolean | undefined

  /** True if this button is an anchor. Default is `true`. */
  isAnchor?: boolean

  isDisabled?: boolean | undefined

  /** By default `button`. */
  baseClassName?: string

  /** True if tag is `button` else `div`. */
  useButtonTag?: boolean
}

interface _ButtonProps extends _BaseProps {
  onClick?: () => void
}

export type BaseProps = Simplify<_BaseProps>
export type ButtonProps = Simplify<_ButtonProps>

export const Button = ({
  id,
  ref: propsRef,
  title: propsTitle,
  isDisabled: disabled = false,
  disabledNote = '',
  isActive = false,
  isFocusable = true,
  isAnchor = true,
  useButtonTag = true,
  baseClassName = 'button',
  className,
  style,
  onClick,
  children,
  ...props
}: ButtonProps) => {
  const title = disabled ? disabledNote : propsTitle
  const {
    ref: hoverRef,
    tooltip: tooltipNode,
    isOpen: tooltipIsOpen,
  } = useTooltipBottom({id, title})
  const isOpen = tooltipIsOpen && title !== undefined
  const ref = useMergeRefPair(hoverRef, propsRef)
  const tooltip = title === undefined ? undefined : tooltipNode
  const Tag = useButtonTag ? 'button' : 'div'

  return (
    <>
      <Tag
        {...{...props, id, ref, disabled, onClick}}
        {...(!isFocusable && {tabIndex: -1})}
        {...(isActive && {'data-state': 'active'})}
        {...(isOpen && {'data-tooltip-state': 'open'})}
        className={twMerge(
          baseClassName,
          isFocusable && 'focusable-button',
          className,
        )}
        style={{
          ...(isAnchor && anchorName(id)),
          ...style,
        }}>
        {children}
      </Tag>
      {tooltip}
    </>
  )
}
