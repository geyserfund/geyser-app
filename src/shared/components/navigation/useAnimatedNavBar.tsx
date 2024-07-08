import { useState } from 'react'

import { NavBarItems } from './AnimatedNavBar'

type useAnimatedNavBarProps = {
  items: NavBarItems[]
  defaultView?: any
}

export const useAnimatedNavBar = ({ items, defaultView }: useAnimatedNavBarProps) => {
  const [view, setView] = useState(defaultView)

  const newItems = items.map((item, index) => {
    return {
      ...item,
      onClick() {
        setView(item.key)
      },
    }
  })

  const currentItem = newItems.find((item) => item.key === view)

  const activeItem = newItems.findIndex((item) => item.key === view)

  return {
    view,
    items: newItems,
    render: currentItem?.render,
    activeItem,
  }
}
