import {type VoidAction} from './types'
import {isNonEmptyArray, lastInit, type NonEmptyArray} from '#Array'
import {Button} from './Button/index'

interface Props {
  actions: NonEmptyArray<VoidAction>
}

export const Pill = ({actions: [head, ...tail]}: Props) => {
  if (!isNonEmptyArray(tail)) {
    return <Button {...head} />
  }

  const [last, init] = lastInit(tail)
  return (
    <div className="flex *:shrink-0">
      <Button {...head} className="pill-left" />
      {init.map((action, index) => (
        <Button {...action} key={index} className="pill-center" />
      ))}
      <Button {...last} className="pill-right" />
    </div>
  )
}
