import { useEffect, useState } from 'react'

import { useNavAnimationStyles } from '../navigation/sideNavBase'
import { useTopNavBarAnimate } from '../navigation/topNavBar/topNavBarAtom'

export const useLayoutAnimation = () => {
  const animate = useTopNavBarAnimate()
  const classes = useNavAnimationStyles()
  const [className, setClassName] = useState('')

  useEffect(() => {
    if (animate.left) {
      setClassName(classes.slideOutRight)
    } else {
      setClassName((current) =>
        current === classes.slideOutRight ? classes.slideInRight : '',
      )
    }
  }, [animate.left, classes])

  useEffect(() => {
    if (animate.right) {
      setClassName(classes.slideOutLeft)
    } else {
      setClassName((current) =>
        current === classes.slideOutLeft ? classes.slideInLeft : '',
      )
    }
  }, [animate.right, classes])

  useEffect(() => {
    if (
      className === classes.slideInLeft ||
      className === classes.slideInRight
    ) {
      setTimeout(() => {
        setClassName('')
      }, 300)
    }
  }, [className, classes])

  return className
}
