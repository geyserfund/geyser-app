import { Button, ButtonProps, ComponentWithAs, HStack, Skeleton } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconType } from 'react-icons'
import { useNavigate } from 'react-router-dom'

import { useCustomTheme, useMobileMode } from '../../../utils'

export type NavBarItems = {
  name: string
  path?: string
  onClick?: () => void
  icon?: IconType | React.FC
  showIconAlways?: boolean
  isBordered?: boolean
  key?: string
  render?: () => React.ReactNode
}

type AnimatedNavBarProps = {
  items: NavBarItems[]
  activeItem: number
  showLabel?: boolean
  showIcon?: boolean
  loading?: boolean
}

export const AnimatedNavBar = ({ items, showLabel, showIcon, activeItem, loading }: AnimatedNavBarProps) => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const { colors } = useCustomTheme()

  const isMobileMode = useMobileMode()

  const [buttonProps, setButtonprops] = useState<{ left: number; width: number }>({ left: 0, width: 0 })

  const [activeIndex, setActiveIndex] = useState(activeItem)

  const handleClick = (item: NavBarItems, index: number) => {
    setActiveIndex(index)

    if (item.onClick) {
      item.onClick()
      return
    }

    navigate(item.path || '')
  }

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
    >
      <motion.div
        style={{
          position: 'absolute',
          top: '2px',
          height: 'calc(100% - 4px)',
          backgroundColor: colors.utils.pbg,
          zIndex: 3,
          borderRadius: isMobileMode ? '8px' : '10px',
          border: '1px solid',
          borderColor: colors.utils.text,
        }}
        animate={buttonProps}
        transition={{ type: 'spring', damping: 22, stiffness: 250 }}
      />
      {items.map((item, index) => {
        const isActive = activeIndex === index
        const Icon = item.icon
        return (
          <ProjectNavigationButton
            setButtonprops={setButtonprops}
            isActive={isActive}
            key={item.name}
            length={items.length}
            onClick={() => handleClick(item, index)}
            backgroundColor={'transparent'}
            color={'neutral1.12'}
            _hover={isActive ? {} : undefined}
            {...(item.isBordered
              ? {
                  border: '1px solid',
                  borderColor: 'neutral1.7',
                }
              : {})}
          >
            <HStack
              w="full"
              h="full"
              zIndex={4}
              p={0}
              spacing={2}
              justifyContent="center"
              alignItems="center"
              fontWeight={isActive ? 500 : 400}
            >
              {(showIcon || item.showIconAlways) && Icon ? <Icon /> : null}
              {showLabel && <span>{t(item.name)}</span>}
            </HStack>
          </ProjectNavigationButton>
        )
      })}
    </HStack>
  )
}

const ProjectNavigationButton: ComponentWithAs<
  'button',
  ButtonProps & { to?: string; setButtonprops: Function; isActive: boolean; length: number }
> = ({ setButtonprops, isActive, length, ...props }) => {
  const measuredRef = useCallback(
    (node: HTMLButtonElement) => {
      if (node !== null && isActive && length > 0) {
        setButtonprops({
          left: node.offsetLeft,
          width: node.offsetWidth,
        })
      }
    },
    [isActive, setButtonprops, length],
  )

  return (
    <Button
      ref={measuredRef}
      flex="1"
      size={{ base: 'md', lg: 'lg' }}
      variant="ghost"
      _hover={{ backgroundColor: 'neutral1.4' }}
      {...props}
    />
  )
}
