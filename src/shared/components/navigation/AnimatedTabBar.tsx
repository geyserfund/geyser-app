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
} & StackProps

/** Works same way as AnimatedNavBar */
export const AnimatedTabBar = ({ items, activeIndex, ...props }: AnimatedTabBarProps) => {
  const [currentActiveIndex, setCurrentActiveIndex] = useState(activeIndex)

  const { colors } = useCustomTheme()

  const navigate = useNavigate()

  useEffect(() => {
    setCurrentActiveIndex(activeIndex)
  }, [activeIndex])

  const [buttonPropsArray, setButtonPropsArray] = useState<{ left: number; width: number }[]>([])

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
      <motion.div
        style={{
          position: 'absolute',
          bottom: '0px',
          height: '2px',
          zIndex: props.zIndex ? toInt(`${props.zIndex}`) + 1 : 3,
          backgroundColor: colors.primary1[10],
        }}
        animate={buttonPropsArray[currentActiveIndex]}
        transition={{ type: 'spring', damping: 22, stiffness: 250 }}
      />
    </HStack>
  )
}
