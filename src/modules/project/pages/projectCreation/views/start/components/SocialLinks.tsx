import { HStack, Icon, Link as ChakraLink } from '@chakra-ui/react'
import { FaXTwitter } from 'react-icons/fa6'
import {
  PiDiscordLogoBold,
  PiGithubLogoBold,
  PiInstagramLogoBold,
  PiTelegramLogoBold,
  PiTiktokLogoBold,
  PiYoutubeLogoBold,
} from 'react-icons/pi'

import { GeyserDiscordUrl, GeyserGithubUrl, GeyserTelegramUrl, GeyserTwitterUrl } from '@/shared/constants/index.ts'

/** Shared social icon links for footer-like components. */
export const SocialLinks = () => {
  return (
    <HStack spacing={6}>
      <ChakraLink href={GeyserTwitterUrl} isExternal aria-label="Geyser on X">
        <Icon as={FaXTwitter} boxSize={6} cursor="pointer" />
      </ChakraLink>
      <ChakraLink href={GeyserGithubUrl} isExternal aria-label="Geyser on GitHub">
        <Icon as={PiGithubLogoBold} boxSize={6} cursor="pointer" />
      </ChakraLink>
      <ChakraLink href={GeyserTelegramUrl} isExternal aria-label="Geyser on Telegram">
        <Icon as={PiTelegramLogoBold} boxSize={6} cursor="pointer" />
      </ChakraLink>
      <ChakraLink href={GeyserDiscordUrl} isExternal aria-label="Geyser on Discord">
        <Icon as={PiDiscordLogoBold} boxSize={6} cursor="pointer" />
      </ChakraLink>
      <ChakraLink href="https://instagram.com/geyserfund" isExternal aria-label="Geyser on Instagram">
        <Icon as={PiInstagramLogoBold} boxSize={6} cursor="pointer" />
      </ChakraLink>
      <ChakraLink href="https://youtube.com/@geyserfund" isExternal aria-label="Geyser on YouTube">
        <Icon as={PiYoutubeLogoBold} boxSize={6} cursor="pointer" />
      </ChakraLink>
      <ChakraLink href="https://tiktok.com/@geyserfund" isExternal aria-label="Geyser on TikTok">
        <Icon as={PiTiktokLogoBold} boxSize={6} cursor="pointer" />
      </ChakraLink>
    </HStack>
  )
}
