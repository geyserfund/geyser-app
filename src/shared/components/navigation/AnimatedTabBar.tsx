import { HStack, StackProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { toInt, useCustomTheme } from '@/utils'

import { Body } from '../typography'
import { AnimatedNavBarItem } from './AnimatedNavBar'

type AnimatedTabBarProps = {
  items: AnimatedNavBarItem[]
  activeIndex: number
  activeTabColor?: string
} & StackProps

/** Works same way as AnimatedNavBar */
export const AnimatedTabBar = ({ items, activeIndex, activeTabColor, ...props }: AnimatedTabBarProps) => {
  const [currentActiveIndex, setCurrentActiveIndex] = useState(activeIndex)

  const { colors } = useCustomTheme()

  const navigate = useNavigate()

  const [buttonPropsArray, setButtonPropsArray] = useState<{ left: number; width: number }[]>([])

  const [initialButtonProps, setInitialButtonProps] = useState<{ left: number; width: number }>()

  useEffect(() => {
    setCurrentActiveIndex(activeIndex)
  }, [activeIndex])

  useEffect(() => {
    if (!initialButtonProps && buttonPropsArray.length > 0 && buttonPropsArray[currentActiveIndex]) {
      setInitialButtonProps(buttonPropsArray[currentActiveIndex])
    }
  }, [buttonPropsArray, items, currentActiveIndex, initialButtonProps])

  const measuredRef = useCallback((node: HTMLDivElement | null, index: number) => {
    if (node !== null) {
      setButtonPropsArray((current) => {
        current[index] = {
          left: node.offsetLeft,
          width: node.offsetWidth,
        }
        return current
      })
    }
  }, [])

  const handleClick = (item: AnimatedNavBarItem, index: number) => {
    if (item.disableClick) {
      return
    }

    setCurrentActiveIndex(index)

    if (item.onClick) {
      item.onClick()
      return
    }

    navigate(item.path || '')
  }

  return (
    <HStack
      w="full"
      spacing="0"
      zIndex={2}
      borderBottom={'1px solid'}
      borderColor={'neutral1.6'}
      position="relative"
      {...props}
    >
      {items.map((item, index) => {
        const isActive = index === currentActiveIndex
        return (
          <HStack
            ref={(node) => measuredRef(node, index)}
            flex={1}
            key={item.key}
            onClick={() => handleClick(item, index)}
            _hover={{
              cursor: 'pointer',
              borderColor: isActive ? 'primary1.10' : 'primary1.3',
              transition: 'border-color 0.2s',
            }}
            justifyContent={'center'}
            paddingY={2}
          >
            <Body size="xs" medium color={isActive ? 'utils.text' : 'neutral1.11'}>
              {item.name}
            </Body>
          </HStack>
        )
      })}
      {initialButtonProps && (
        <motion.div
          style={{
            position: 'absolute',
            bottom: '0px',
            height: '2px',
            zIndex: props.zIndex ? toInt(`${props.zIndex}`) + 1 : 3,
            backgroundColor: activeTabColor || colors.primary1[10],
            left: initialButtonProps.left,
            width: initialButtonProps.width,
          }}
          initial={false}
          animate={buttonPropsArray[currentActiveIndex]}
          transition={{ type: 'spring', damping: 22, stiffness: 250 }}
        />
      )}
    </HStack>
  )
}
