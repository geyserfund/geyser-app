import { useEffect, useState } from 'react'

import { AnimatedNavBarItem } from './AnimatedNavBar'

type useAnimatedNavBarProps = {
  items: AnimatedNavBarItem[]
  defaultView?: any
  resetKey?: unknown
}

export const useAnimatedNavBar = ({ items, defaultView, resetKey }: useAnimatedNavBarProps) => {
  const [view, setView] = useState(defaultView)

  useEffect(() => {
    setView(defaultView)
  }, [defaultView, resetKey])

  const newItems = items.map((item, index) => {
    return {
      ...item,
      onClick() {
        setView(item.key)
        if (item.onClick) {
          item.onClick()
        }
      },
    }
  })

  const currentItem = newItems.find((item) => item.key === view)

  const activeIndex = newItems.findIndex((item) => item.key === view)

  return {
    view,
    items: newItems,
    render: currentItem?.render,
    activeIndex,
  }
}
