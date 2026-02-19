import { Button, ButtonProps, ComponentWithAs, forwardRef, HStack, Skeleton, StackProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconType } from 'react-icons'
import { useLocation, useNavigate } from 'react-router'

import { lightModeColors } from '@/shared/styles'

import { toInt, useCustomTheme } from '../../../utils'
import { TooltipPopover } from '../feedback/TooltipPopover.tsx'
import { SkeletonLayout } from '../layouts'

export type AnimatedNavBarItem = {
  name: string
  path?: string
  onClick?: () => void
  icon?: IconType | React.FC
  activeIcon?: IconType | React.FC
  showIconAlways?: boolean
  isBordered?: boolean
  key?: string
  render?: () => React.ReactNode
  isDisabled?: boolean
  tooltipLabel?: string
  disableClick?: boolean
  replacePath?: boolean
}

type AnimatedNavBarProps = {
  items: AnimatedNavBarItem[]
  activeIndex: number
  showLabel?: boolean
  showIcon?: boolean
  loading?: boolean
  disableColorMode?: boolean
} & StackProps

export const AnimatedNavBar = ({
  items,
  showLabel,
  showIcon,
  activeIndex,
  loading,
  disableColorMode,
  ...props
}: AnimatedNavBarProps) => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const location = useLocation()

  const { colors } = useCustomTheme()

  const [buttonPropsArray, setButtonPropsArray] = useState<{ left: number; width: number }[]>([])

  const [initialButtonProps, setInitialButtonProps] = useState<{ left: number; width: number }>()

  const [currentActiveIndex, setCurrentActiveIndex] = useState(activeIndex)
  useEffect(() => {
    setCurrentActiveIndex(activeIndex)
  }, [activeIndex])

  useEffect(() => {
    if (!initialButtonProps && buttonPropsArray.length > 0 && buttonPropsArray[currentActiveIndex]) {
      setInitialButtonProps(buttonPropsArray[currentActiveIndex])
    }
  }, [buttonPropsArray, items, currentActiveIndex, initialButtonProps])

  const handleClick = (item: AnimatedNavBarItem, index: number) => {
    if (item.disableClick) {
      return
    }

    setCurrentActiveIndex(index)

    if (item.onClick) {
      item.onClick()
      return
    }

    navigate({ pathname: item.path || '', search: location.search }, { replace: item.replacePath })
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
    return <Skeleton borderRadius={'10px'} height={'44px'} width="100%" />
  }

  return (
    <HStack
      w="full"
      padding={'2px'}
      background={disableColorMode ? lightModeColors.neutralAlpha[3] : 'neutralAlpha.3'}
      borderRadius={'12px'}
      position="relative"
      zIndex={2}
      {...props}
    >
      {initialButtonProps && (
        <motion.div
          style={{
            position: 'absolute',
            top: '2px',
            height: 'calc(100% - 4px)',
            backgroundColor: disableColorMode ? lightModeColors.utils.pbg : colors.utils.pbg,
            zIndex: props.zIndex ? toInt(`${props.zIndex}`) + 1 : 3,
            borderRadius: '10px',
            border: '1px solid',
            borderColor: disableColorMode ? lightModeColors.utils.text : colors.utils.text,
            opacity: currentActiveItem?.isDisabled ? 0 : 1,
            left: initialButtonProps.left,
            width: initialButtonProps.width,
          }}
          initial={false}
          animate={buttonPropsArray[currentActiveIndex]}
          transition={{ type: 'spring', damping: 22, stiffness: 250 }}
        />
      )}
      {items.map((item, index) => {
        const isActive = currentActiveIndex === index

        const Icon = item.icon
        const ActiveIcon = item.activeIcon
        return (
          <ProjectNavigationButton
            key={item.name}
            ref={(node) => measuredRef(node, index)}
            isActive={isActive}
            length={items.length}
            onClick={() => {
              if (item.isDisabled) {
                return
              }

              handleClick(item, index)
            }}
            _hover={
              isActive ? {} : { backgroundColor: disableColorMode ? lightModeColors.neutralAlpha[5] : 'neutralAlpha.5' }
            }
            {...(item.isBordered
              ? {
                  border: '1px solid',
                  borderColor: disableColorMode ? lightModeColors.neutral1[7] : 'neutral1.7',
                  backgroundColor: 'neutral1.6',
                }
              : {})}
            {...(item.isDisabled &&
              item.tooltipLabel && {
                backgroundColor: 'transparent',
                color: 'neutral1.9',
              })}
            isDisabled={item.tooltipLabel ? false : item.isDisabled}
            disableColorMode={disableColorMode}
          >
            <TooltipPopover key={item.name} text={item.tooltipLabel}>
              <HStack
                w="full"
                h="full"
                zIndex={props.zIndex ? toInt(`${props.zIndex}`) + 2 : 4}
                p={0}
                spacing={2}
                justifyContent="center"
                alignItems="center"
                fontWeight={isActive ? 700 : 500}
              >
                {(showIcon || item.showIconAlways) &&
                  (isActive && ActiveIcon ? <ActiveIcon fontSize="18px" /> : Icon ? <Icon fontSize="18px" /> : null)}
                {showLabel && <span>{t(item.name)}</span>}
              </HStack>
            </TooltipPopover>
          </ProjectNavigationButton>
        )
      })}
    </HStack>
  )
}

const ProjectNavigationButton: ComponentWithAs<
  'button',
  ButtonProps & { to?: string; isActive: boolean; length: number; disableColorMode?: boolean }
> = forwardRef(({ isActive, length, disableColorMode, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      flex="1"
      size={'lg'}
      variant="ghost"
      backgroundColor={'transparent'}
      color={disableColorMode ? lightModeColors.neutral1[12] : 'neutral1.12'}
      _disabled={{ color: disableColorMode ? lightModeColors.neutral1[9] : 'neutral1.9' }}
      padding={0}
      {...props}
    />
  )
})

export const AnimatedNavBarSkeleton = () => {
  return <SkeletonLayout borderRadius={'12px'} height={'44px'} width="100%" />
}
