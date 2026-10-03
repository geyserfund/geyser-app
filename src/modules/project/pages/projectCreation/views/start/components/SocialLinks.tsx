import { HStack, Icon, Link as ChakraLink } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaXTwitter } from 'react-icons/fa6'
import { PiGithubLogoBold, PiInstagramLogoBold, PiYoutubeLogoBold } from 'react-icons/pi'

import { GeyserGithubUrl, GeyserTwitterUrl } from '@/shared/constants/index.ts'

/** Shared social icon links for footer-like components. */
export const SocialLinks = () => {
  const { t } = useTranslation()

  return (
    <HStack spacing={6}>
      <ChakraLink href={GeyserTwitterUrl} isExternal aria-label={t('social.geyser_on_x')}>
        <Icon as={FaXTwitter} boxSize={6} cursor="pointer" />
      </ChakraLink>
      <ChakraLink href={GeyserGithubUrl} isExternal aria-label={t('social.geyser_on_github')}>
        <Icon as={PiGithubLogoBold} boxSize={6} cursor="pointer" />
      </ChakraLink>
      <ChakraLink href="https://instagram.com/geyserfund" isExternal aria-label={t('social.geyser_on_instagram')}>
        <Icon as={PiInstagramLogoBold} boxSize={6} cursor="pointer" />
      </ChakraLink>
      <ChakraLink href="https://youtube.com/@geyserfund" isExternal aria-label={t('social.geyser_on_youtube')}>
        <Icon as={PiYoutubeLogoBold} boxSize={6} cursor="pointer" />
      </ChakraLink>
    </HStack>
  )
}
