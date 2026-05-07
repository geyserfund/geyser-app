import { Button, ButtonProps, ComponentWithAs, forwardRef, HStack, Skeleton, StackProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
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

type ButtonMeasurements = { left: number; width: number }

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

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [buttonPropsArray, setButtonPropsArray] = useState<(ButtonMeasurements | undefined)[]>([])

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

    navigate({ pathname: item.path || '', search: location.search }, { replace: item.replacePath })
  }

  const updateButtonProps = useCallback(() => {
    setButtonPropsArray((current) => {
      const next = items.map((_, index) => {
        const node = buttonRefs.current[index]

        return node
          ? {
              left: node.offsetLeft,
              width: node.offsetWidth,
            }
          : current[index]
      })

      const hasChanged = next.some((buttonProps, index) => {
        const currentButtonProps = current[index]

        return (
          !currentButtonProps ||
          currentButtonProps.left !== buttonProps?.left ||
          currentButtonProps.width !== buttonProps?.width
        )
      })

      return hasChanged || next.length !== current.length ? next : current
    })
  }, [items])

  const measuredRef = useCallback((node: HTMLButtonElement | null, index: number) => {
    buttonRefs.current[index] = node
  }, [])

  const currentActiveItem = items[currentActiveIndex]
  const currentButtonProps = buttonPropsArray[currentActiveIndex]

  useLayoutEffect(() => {
    updateButtonProps()

    if (typeof ResizeObserver === 'undefined') {
      return
    }

    const resizeObserver = new ResizeObserver(updateButtonProps)
    buttonRefs.current.forEach((buttonRef) => {
      if (buttonRef) {
        resizeObserver.observe(buttonRef)
      }
    })

    return () => {
      resizeObserver.disconnect()
    }
  }, [items, updateButtonProps])

  if (loading) {
    return <Skeleton borderRadius={'10px'} height={'44px'} width="100%" />
  }

  return (
    <HStack
      w="full"
      padding={'2px'}
      background={disableColorMode ? lightModeColors.neutralAlpha[3] : 'neutralAlpha.3'}
      borderRadius={'12px'}
      boxShadow="none"
      position="relative"
      zIndex={2}
      {...props}
    >
      {currentButtonProps && (
        <motion.div
          style={{
            position: 'absolute',
            top: '2px',
            height: 'calc(100% - 4px)',
            backgroundColor: disableColorMode ? lightModeColors.utils.pbg : colors.utils.pbg,
            zIndex: props.zIndex ? toInt(`${props.zIndex}`) + 1 : 3,
            borderRadius: '10px',
            opacity: currentActiveItem?.isDisabled ? 0 : 1,
            left: currentButtonProps.left,
            width: currentButtonProps.width,
            boxShadow: 'none',
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
      boxShadow="none"
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
