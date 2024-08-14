import {
  Button,
  ButtonProps,
  ComponentWithAs,
  forwardRef,
  HStack,
  Skeleton,
  StackProps,
  Tooltip,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconType } from 'react-icons'
import { useNavigate } from 'react-router-dom'

import { toInt, useCustomTheme, useMobileMode } from '../../../utils'
import { SkeletonLayout } from '../layouts'

export type AnimatedNavBarItem = {
  name: string
  path?: string
  onClick?: () => void
  icon?: IconType | React.FC
  showIconAlways?: boolean
  isBordered?: boolean
  key?: string
  render?: () => React.ReactNode
  isDisabled?: boolean
  tooltipLabel?: string
  disableClick?: boolean
}

type AnimatedNavBarProps = {
  items: AnimatedNavBarItem[]
  activeIndex: number
  showLabel?: boolean
  showIcon?: boolean
  loading?: boolean
} & StackProps

export const AnimatedNavBar = ({ items, showLabel, showIcon, activeIndex, loading, ...props }: AnimatedNavBarProps) => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const { colors } = useCustomTheme()

  const isMobileMode = useMobileMode()

  const [buttonPropsArray, setButtonPropsArray] = useState<{ left: number; width: number }[]>([])

  const [currentActiveIndex, setCurrentActiveIndex] = useState(activeIndex)
  useEffect(() => {
    setCurrentActiveIndex(activeIndex)
  }, [activeIndex])

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

  const measuredRef = useCallback((node: HTMLButtonElement | null, index: number) => {
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

  const currentActiveItem = items[currentActiveIndex]

  if (loading) {
    return <Skeleton borderRadius={{ base: '8px', lg: '10px' }} height={{ base: '36px', lg: '44px' }} width="100%" />
  }

  return (
    <HStack
      w="full"
      padding={'2px'}
      background="neutral1.3"
      borderRadius={{ base: '10px', lg: '12px' }}
      position="relative"
      zIndex={2}
      {...props}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: '2px',
          height: 'calc(100% - 4px)',
          backgroundColor: colors.utils.pbg,
          zIndex: props.zIndex ? toInt(`${props.zIndex}`) + 1 : 3,
          borderRadius: isMobileMode ? '8px' : '10px',
          border: '1px solid',
          borderColor: colors.utils.text,
          opacity: currentActiveItem?.isDisabled ? 0 : 1,
        }}
        animate={buttonPropsArray[currentActiveIndex]}
        transition={{ type: 'spring', damping: 22, stiffness: 250 }}
      />
      {items.map((item, index) => {
        const isActive = currentActiveIndex === index

        const Icon = item.icon
        return (
          <ProjectNavigationButton
            ref={(node) => measuredRef(node, index)}
            key={item.name}
            isActive={isActive}
            length={items.length}
            onClick={() => handleClick(item, index)}
            _hover={isActive ? {} : { backgroundColor: 'neutral1.5' }}
            {...(item.isBordered
              ? {
                  border: '1px solid',
                  borderColor: 'neutral1.7',
                }
              : {})}
            isDisabled={item.isDisabled}
          >
            <Tooltip label={item.tooltipLabel}>
              <HStack
                w="full"
                h="full"
                zIndex={props.zIndex ? toInt(`${props.zIndex}`) + 2 : 4}
                p={0}
                spacing={2}
                justifyContent="center"
                alignItems="center"
                fontWeight={isActive ? 500 : 400}
              >
                {(showIcon || item.showIconAlways) && Icon ? <Icon /> : null}
                {showLabel && <span>{t(item.name)}</span>}
              </HStack>
            </Tooltip>
          </ProjectNavigationButton>
        )
      })}
    </HStack>
  )
}

const ProjectNavigationButton: ComponentWithAs<
  'button',
  ButtonProps & { to?: string; isActive: boolean; length: number }
> = forwardRef(({ isActive, length, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      flex="1"
      size={{ base: 'md', lg: 'lg' }}
      variant="ghost"
      backgroundColor={'transparent'}
      color={'neutral1.12'}
      _disabled={{ color: 'neutral1.9' }}
      {...props}
    />
  )
})

export const AnimatedNavBarSkeleton = () => {
  return (
    <SkeletonLayout borderRadius={{ base: '10px', lg: '12px' }} height={{ base: '36px', lg: '44px' }} width="100%" />
  )
}
