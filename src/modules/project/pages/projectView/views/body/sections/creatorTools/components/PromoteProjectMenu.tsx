import {
  Badge,
  Box,
  HStack,
  IconButton,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuList,
  Portal,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowUpRight, PiX } from 'react-icons/pi'
import { Link } from 'react-router'

import { GEYSER_PROMOTIONS_PROJECT_NAME } from '@/modules/discovery/pages/landing/views/mainView/defaultView/sections/Featured.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants/index.ts'

import { CreatorToolsImages } from '../constant.ts'
import { CreatorToolButton } from './CreatorToolButton.tsx'

/** Placeholder URLs for external links - to be updated later */
const BEST_PRACTICES_URL = 'https://guide.geyser.fund/geyser-docs/guides/step-by-step-tutorials'

interface PromoteProjectMenuProps {
  projectName: string
}

interface PromoteOptionCardProps {
  emoji: string
  title: string
  description: string
  isNew?: boolean
  to?: string
  href?: string
  isExternal?: boolean
  onClose?: () => void
}

const PromoteOptionCard = ({
  emoji,
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
      borderRadius="8px"
      border="1px solid"
      borderColor="neutral1.6"
      justifyContent="space-between"
      alignItems="flex-start"
      cursor="pointer"
      _hover={{ borderColor: 'primary1.9' }}
      transition="border-color 0.2s"
    >
      <HStack spacing={3} alignItems="flex-start" flex={1}>
        <Text fontSize="20px">{emoji}</Text>
        <VStack alignItems="flex-start" spacing={1} flex={1}>
          <HStack spacing={2}>
            <Body size="md" medium>
              {title}
            </Body>
            {isNew && (
              <Badge variant="solid" colorScheme="primary1" size="sm">
                {t('New')}
              </Badge>
            )}
          </HStack>
          <Body size="sm" light>
            {description}
          </Body>
        </VStack>
      </HStack>
      <IconButton
        aria-label="Go to option"
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
      <CreatorToolButton
        as={MenuButton}
        emoji={CreatorToolsImages.promote}
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
              <Body size="sm" light>
                {t("Getting your project seen isn't always easy. Here are a few tools and resources")}
              </Body>
            </VStack>
            <IconButton
              size="sm"
              aria-label="close"
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
  projectName: string
  onClose?: () => void
}

export const PromoteOptions = ({ projectName, onClose }: PromoteOptionsProps) => {
  return (
    <>
      <PromoteOptionCard
        emoji="🔗"
        title={t('Add affiliates')}
        description={t('Reward others to share your project and bring contributors')}
        isNew
        to={getPath('dashboardPromote', projectName)}
        onClose={onClose}
      />
      <PromoteOptionCard
        emoji="🧠"
        title={t('Best practices / tips')}
        description={t('Learn what are the best social media practices to get your project seen')}
        href={BEST_PRACTICES_URL}
        isExternal
      />
      <PromoteOptionCard
        emoji="📢"
        title={t('Geyser Promotion')}
        description={t('Get visibility on the Geyser landing page, emails, and much more')}
        to={getPath('projectRewards', GEYSER_PROMOTIONS_PROJECT_NAME)}
        onClose={onClose}
      />
    </>
  )
}
