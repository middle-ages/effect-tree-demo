import * as store from '#store'
import type {DisabledProps} from '#types'

export const useDisabledState = (
  guard: store.Guard | undefined,
): DisabledProps => {
  const [selector, disabledNote] = store.guardSelector(guard)
  const guardResult = store.useAppSelector(selector)
  return store.disabledProps(guardResult, disabledNote)
}
