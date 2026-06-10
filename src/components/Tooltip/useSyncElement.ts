import {useLayoutEffect, useRef, type RefObject} from 'react'

export const useSyncElement = (
  isOpen: boolean,
): RefObject<HTMLDivElement | null> => {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const element = ref.current
    if (element !== null && isOpen !== element.matches(':popover-open')) {
      element.togglePopover()
    }
  }, [isOpen])
  return ref
}
