import { Button, ButtonProps, ComponentWithAs, forwardRef, HStack, Skeleton, StackProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { lightModeColors } from '@/shared/styles'
import { SuccessImageBackgroundGradient } from '@/shared/styles/custom.ts'

import { toInt } from '../../../utils'
import { TooltipPopover } from '../feedback/TooltipPopover.tsx'
import { SkeletonLayout } from '../layouts'
import { Body } from '../typography/Body.tsx'

export type AnimatedNavSlideItem = {
  name: string
  path?: string
  onClick?: () => void
  icon?: React.ReactNode
  isBordered?: boolean
  key?: string
  render?: () => React.ReactNode
  isDisabled?: boolean
  tooltipLabel?: string
  disableClick?: boolean
  replacePath?: boolean
}

type AnimatedNavSlideProps = {
  items: AnimatedNavSlideItem[]
  activeIndex: number
  loading?: boolean
  disableColorMode?: boolean
} & StackProps

export const AnimatedNavSlide = ({
  items,
  activeIndex,
  loading,
  disableColorMode,
  ...props
}: AnimatedNavSlideProps) => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const location = useLocation()

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

  const handleClick = (item: AnimatedNavSlideItem, index: number) => {
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
          left: node.offsetLeft - 4,
          width: node.offsetWidth + 12,
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
      background={'utils.pbg'}
      borderRadius={'12px'}
      position="relative"
      zIndex={2}
      {...props}
    >
      {initialButtonProps && currentActiveIndex !== -1 && (
        <motion.div
          style={{
            position: 'absolute',
            bottom: '-4px',
            height: '4px',
            background: SuccessImageBackgroundGradient,
            zIndex: props.zIndex ? toInt(`${props.zIndex}`) + 1 : 3,
            borderRadius: '10px',
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
            _hover={{
              '& span': {
                color: 'utils.text',
              },
            }}
            color={isActive ? 'utils.text' : 'neutral1.11'}
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
                spacing={1}
                justifyContent="center"
                alignItems="flex-end"
                onClick={() => {
                  console.log('clicked')
                }}
              >
                {item.icon}
                {
                  <Body as="span" size="lg" fontWeight={isActive ? 600 : 400}>
                    {t(item.name)}
                  </Body>
                }
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
