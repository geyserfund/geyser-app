import {
  Badge,
  Box,
  HStack,
  Icon,
  IconButton,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuList,
  Portal,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import type { IconType } from 'react-icons'
import { PiArrowUpRight, PiLightbulb, PiMegaphone, PiX } from 'react-icons/pi'
import { Link } from 'react-router'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'

import { ControlPanelButton } from './ControlPanelButton.tsx'

/** Placeholder URLs for external links - to be updated later */
const BEST_PRACTICES_URL = 'https://guide.geyser.fund/geyser-docs/guides/step-by-step-tutorials'

interface PromoteProjectMenuProps {
  projectName: string
}

interface PromoteOptionCardProps {
  icon: IconType
  title: string
  description: string
  isNew?: boolean
  to?: string
  href?: string
  isExternal?: boolean
  onClose?: () => void
}

const PromoteOptionCard = ({
  icon,
  title,
  description,
  isNew,
  to,
  href,
  isExternal,
  onClose,
}: PromoteOptionCardProps) => {
  const cardContent = (
    <HStack
      w="full"
      p={4}
      borderRadius="innerCard"
      border="1px solid"
      borderColor="neutral1.6"
      justifyContent="space-between"
      alignItems="flex-start"
      cursor="pointer"
      _hover={{ borderColor: 'primary1.8' }}
      transition="border-color 0.2s"
    >
      <HStack spacing={3} alignItems="flex-start" flex={1}>
        <Icon as={icon} boxSize="24px" color="primary1.11" flexShrink={0} aria-hidden />
        <VStack alignItems="flex-start" spacing={1} flex={1}>
          <HStack spacing={2}>
            <Body size="md" medium color="utils.text">
              {title}
            </Body>
            {isNew && (
              <Badge variant="solid" colorScheme="primary1" color="utils.primaryContrast" size="sm">
                {t('New')}
              </Badge>
            )}
          </HStack>
          <Body size="sm" color="neutral1.11">
            {description}
          </Body>
        </VStack>
      </HStack>
      <IconButton
        aria-label={t('Go to option')}
        icon={<PiArrowUpRight />}
        size="sm"
        variant="solid"
        colorScheme="primary1"
      />
    </HStack>
  )

  if (to) {
    return (
      <Box
        as={Link}
        to={to}
        target="_blank"
        rel="noopener noreferrer"
        w="full"
        onClick={onClose}
        _hover={{ textDecoration: 'none' }}
      >
        {cardContent}
      </Box>
    )
  }

  if (href) {
    return (
      <Box as={ChakraLink} href={href} isExternal={isExternal} w="full" _hover={{ textDecoration: 'none' }}>
        {cardContent}
      </Box>
    )
  }

  return cardContent
}

export const PromoteProjectMenu = ({ projectName }: PromoteProjectMenuProps) => {
  const menu = useDisclosure()

  return (
    <Menu isOpen={menu.isOpen} onClose={menu.onClose} placement="bottom-end" closeOnSelect={true}>
      <ControlPanelButton
        as={MenuButton}
        icon={PiMegaphone}
        label={t('Promote project')}
        mobileLabel={t('Promote')}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault()
          e.stopPropagation()
          menu.onToggle()
        }}
      />

      <Portal>
        <MenuList w="400px" p={4} borderRadius="12px" zIndex="99" shadow="md">
          <HStack w="full" justifyContent="space-between" mb={2} alignItems="start">
            <VStack alignItems="flex-start" spacing={1}>
              <H3 size="xl">{t('Promote your project')}</H3>
              <Body size="sm" color="neutral1.11">
                {t("Getting your project seen isn't always easy. Here are a few tools and resources")}
              </Body>
            </VStack>
            <IconButton
              size="sm"
              aria-label={t('Close')}
              icon={<PiX />}
              variant="ghost"
              colorScheme="neutral1"
              onClick={menu.onClose}
            />
          </HStack>
          <VStack w="full" spacing={3}>
            <PromoteOptions projectName={projectName} onClose={menu.onClose} />
          </VStack>
        </MenuList>
      </Portal>
    </Menu>
  )
}

interface PromoteOptionsProps {
  projectName?: string
  onClose?: () => void
  hideAffiliateOptions?: boolean
}

export const PromoteOptions = ({ onClose }: PromoteOptionsProps) => {
  return (
    <>
      <PromoteOptionCard
        icon={PiLightbulb}
        title={t('Best practices / tips')}
        description={t('Learn what are the best social media practices to get your project seen')}
        href={BEST_PRACTICES_URL}
        isExternal
      />
    </>
  )
}
