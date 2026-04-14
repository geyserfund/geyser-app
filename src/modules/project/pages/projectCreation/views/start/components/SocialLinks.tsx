import { HStack, Icon, Link as ChakraLink } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaXTwitter } from 'react-icons/fa6'
import {
  PiDiscordLogoBold,
  PiGithubLogoBold,
  PiInstagramLogoBold,
  PiTelegramLogoBold,
  PiTiktokLogoBold,
  PiWhatsappLogoBold,
  PiYoutubeLogoBold,
} from 'react-icons/pi'

import {
  GeyserDiscordUrl,
  GeyserGithubUrl,
  GeyserTelegramUrl,
  GeyserTwitterUrl,
  GeyserWhatsappUrl,
} from '@/shared/constants/index.ts'

/** Shared social icon links for footer-like components. */
export const SocialLinks = () => {
  const { t } = useTranslation()

  return (
    <HStack spacing={6}>
      <ChakraLink href={GeyserTwitterUrl} isExternal aria-label={t('social.geyser_on_x')}>
        <Icon as={FaXTwitter} boxSize={6} cursor="pointer" />
      </ChakraLink>
      <ChakraLink href={GeyserWhatsappUrl} isExternal aria-label={t('social.geyser_on_x')}>
        <Icon as={PiWhatsappLogoBold} boxSize={6} cursor="pointer" />
      </ChakraLink>
      <ChakraLink href={GeyserGithubUrl} isExternal aria-label={t('social.geyser_on_github')}>
        <Icon as={PiGithubLogoBold} boxSize={6} cursor="pointer" />
      </ChakraLink>
      <ChakraLink href={GeyserTelegramUrl} isExternal aria-label={t('social.geyser_on_telegram')}>
        <Icon as={PiTelegramLogoBold} boxSize={6} cursor="pointer" />
      </ChakraLink>
      <ChakraLink href={GeyserDiscordUrl} isExternal aria-label={t('social.geyser_on_discord')}>
        <Icon as={PiDiscordLogoBold} boxSize={6} cursor="pointer" />
      </ChakraLink>
      <ChakraLink href="https://instagram.com/geyserfund" isExternal aria-label={t('social.geyser_on_instagram')}>
        <Icon as={PiInstagramLogoBold} boxSize={6} cursor="pointer" />
      </ChakraLink>
      <ChakraLink href="https://youtube.com/@geyserfund" isExternal aria-label={t('social.geyser_on_youtube')}>
        <Icon as={PiYoutubeLogoBold} boxSize={6} cursor="pointer" />
      </ChakraLink>
      <ChakraLink href="https://tiktok.com/@geyserfund" isExternal aria-label={t('social.geyser_on_tiktok')}>
        <Icon as={PiTiktokLogoBold} boxSize={6} cursor="pointer" />
      </ChakraLink>
    </HStack>
  )
}
