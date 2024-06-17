import { Box, Button, ButtonProps, ComponentWithAs, HStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { RefObject, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconType } from 'react-icons'
import { Link } from 'react-router-dom'

import { dimensions } from '../../../constants'
import { useCustomTheme, useMobileMode } from '../../../utils'

export type NavBarItems = {
  name: string
  path?: string
  onClick?: () => {}
  icon: IconType | React.FC
  showIconAlways?: boolean
  isBordered?: boolean
}

type AnimatedNavBarProps = {
  items: NavBarItems[]
  activeItem: number
  showLabel?: boolean
  showIcon?: boolean
}

export const AnimatedNavBar = ({ items, showLabel, showIcon, activeItem }: AnimatedNavBarProps) => {
  const { t } = useTranslation()

  const { colors } = useCustomTheme()

  const isMobileMode = useMobileMode()

  const [buttonRef, setButtonRef] = useState<RefObject<HTMLButtonElement> | null>(null)

  return (
    <HStack
      w="full"
      padding={'2px'}
      maxHeight={{ base: dimensions.projectNavBar.mobile.height, lg: dimensions.projectNavBar.desktop.height }}
      background="neutral1.2"
      borderRadius={{ base: '8px', lg: '10px' }}
    >
      <motion.div
        style={{
          position: 'fixed',
          top: buttonRef?.current?.getBoundingClientRect().top,
          height: buttonRef?.current?.offsetHeight,
          backgroundColor: colors.neutral1[11],
          zIndex: 1,
          borderRadius: isMobileMode ? '8px' : '10px',
        }}
        animate={{ left: buttonRef?.current?.getBoundingClientRect().left, width: buttonRef?.current?.offsetWidth }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      />
      {items.map((item, index) => {
        const isActive = activeItem === index
        const Icon = item.icon
        return (
          <ProjectNavigationButton
            setRef={setButtonRef}
            isActive={isActive}
            key={item.name}
            {...(item.onClick
              ? {
                  onClick: item.onClick,
                }
              : {
                  as: Link,
                  to: item.path,
                })}
            backgroundColor={'transparent'}
            color={isActive ? 'neutral1.1' : 'neutral1.12'}
            _hover={isActive ? {} : undefined}
            {...(item.isBordered
              ? {
                  border: '1px solid',
                  borderColor: 'neutral1.7',
                }
              : {})}
          >
            <HStack w="full" h="full" zIndex={2} p={0} spacing={2} justifyContent="center" alignItems="center">
              {(showIcon || item.showIconAlways) && <Icon />}
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
  ButtonProps & { to?: string; setRef: Function; isActive: boolean }
> = ({ setRef, isActive, ...props }) => {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isActive && setRef) {
      setRef(ref)
    }
  }, [isActive, setRef, ref])

  return (
    <Button
      ref={ref}
      flex="1"
      size={{ base: 'md', lg: 'lg' }}
      variant="ghost"
      _hover={{ backgroundColor: 'neutral1.4' }}
      {...props}
    />
  )
}
