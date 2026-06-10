import {useCallback, type RefObject, type ToggleEventHandler} from 'react'
import {useSyncElement} from './useSyncElement'

interface Props {
  isOpen: boolean
  onClose: () => void
}

interface UseTooltip {
  ref: RefObject<HTMLDivElement | null>
  onToggle: ToggleEventHandler
}

export const useInfotip = ({isOpen, onClose}: Props): UseTooltip => {
  const ref = useSyncElement(isOpen)

  const onToggle = useCallback<ToggleEventHandler>(
    ({newState}) => {
      if (newState === 'closed') {
        onClose()
      }
    },
    [onClose],
  )

  return {ref, onToggle}
}
