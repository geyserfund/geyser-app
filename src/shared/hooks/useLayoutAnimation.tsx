import { useEffect, useState } from 'react'

import { useNavAnimationStyles } from '@/modules/navigation/components/sideNavBase'

import { usePlatformNavBarAnimate } from '../../modules/navigation/platformNavBar/platformNavBarAtom'
import { useMobileMode } from '../../utils'

export const useLayoutAnimation = () => {
  const animate = usePlatformNavBarAnimate()
  const classes = useNavAnimationStyles()
  const [className, setClassName] = useState('')
  const isMobile = useMobileMode()

  useEffect(() => {
    if (!isMobile) {
      setClassName('')
      return
    }

    if (animate.left) {
      setClassName(classes.slideOutRight)
    } else {
      setClassName((current) => (current === classes.slideOutRight ? classes.slideInRight : ''))
    }
  }, [animate.left, classes, isMobile])

  useEffect(() => {
    if (!isMobile) {
      setClassName('')
      return
    }

    if (animate.right) {
      setClassName(classes.slideOutLeft)
    } else {
      setClassName((current) => (current === classes.slideOutLeft ? classes.slideInLeft : ''))
    }
  }, [animate.right, classes, isMobile])

  useEffect(() => {
    if (!isMobile) {
      setClassName('')
      return
    }

    if (className === classes.slideInLeft || className === classes.slideInRight) {
      setTimeout(() => {
        setClassName('')
      }, 300)
    }
  }, [className, classes, isMobile])

  return className
}
