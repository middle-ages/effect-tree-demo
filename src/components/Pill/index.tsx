import {isNonEmptyArray, lastInit} from '#Array'
import {Button} from '#Button'
import type {PillProps} from '#types'
import {twMerge} from 'tailwind-merge'

export const Pill = ({
  isActive,
  actions: [head, ...tail],
  style,
  className,
}: PillProps) => {
  if (!isNonEmptyArray(tail)) {
    return <Button {...{className, style}} {...head} />
  }

  const [last, init] = lastInit(tail)
  return (
    <div
      className={twMerge(
        'min-w-[232px] flex *:min-w-[4.5rch] p-0.5',
        className,
      )}
      {...{style}}>
      <Button key="first" {...head} {...{isActive}} className="pill-left" />
      {init.map((action, index) => (
        <Button
          {...action}
          {...{isActive}}
          key={index}
          className="pill-center"
        />
      ))}
      <Button key="last" {...last} {...{isActive}} className="pill-right" />
    </div>
  )
}
