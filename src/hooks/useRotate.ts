import {deg, type Dispatcher} from '#util'
import {useCounter} from './useCounter'

export interface UseRotate {
  count: number
  transform: string
  setCount: Dispatcher<number>
  increment: () => void
  isOdd: boolean
  isEven: boolean
}

export const useRotate = (initAngle = 0): UseRotate => {
  const {count, setCount, increment} = useCounter()
  const angle = deg(initAngle + 90 + 180 * count)
  const isEven = count % 2 === 0

  return {
    count,
    setCount,
    increment,
    transform: `rotate(${angle})`,
    isOdd: !isEven,
    isEven,
  }
}
