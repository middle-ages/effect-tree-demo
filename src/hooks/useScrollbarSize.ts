import {useMemo} from 'react'

export const useScrollbarSize = (document: Document | undefined): number =>
  useMemo(() => {
    if (!document) {
      return 10
    }

    const outer = document.createElement('div')
    outer.style.visibility = 'hidden'
    outer.style.overflow = 'scroll'

    const inner = document.createElement('div')
    outer.append(inner)

    document.body.append(outer)
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth
    outer.remove()

    return scrollbarWidth
  }, [document])
