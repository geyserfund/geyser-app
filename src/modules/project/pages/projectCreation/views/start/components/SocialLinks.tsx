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

import { GeyserTelegramUrl } from '@/shared/constants/index.ts'

export const SocialLinks = () => {
  return (
    <HStack spacing={6}>
      <ChakraLink href="https://twitter.com/geyserfund" isExternal>
        <Icon as={FaXTwitter} boxSize={6} cursor="pointer" />
      </ChakraLink>
      <ChakraLink href="https://github.com/geyserfund" isExternal>
        <Icon as={PiGithubLogoBold} boxSize={6} cursor="pointer" />
      </ChakraLink>
      <ChakraLink href={GeyserTelegramUrl} isExternal>
        <Icon as={PiTelegramLogoBold} boxSize={6} cursor="pointer" />
      </ChakraLink>
      <ChakraLink href="https://discord.gg/PgBQRxbtgJ" isExternal>
        <Icon as={PiDiscordLogoBold} boxSize={6} cursor="pointer" />
      </ChakraLink>
      <ChakraLink href="https://instagram.com/geyserfund" isExternal>
        <Icon as={PiInstagramLogoBold} boxSize={6} cursor="pointer" />
      </ChakraLink>

      <ChakraLink href="https://youtube.com/@geyserfund" isExternal>
        <Icon as={PiYoutubeLogoBold} boxSize={6} cursor="pointer" />
      </ChakraLink>
      <ChakraLink href="https://tiktok.com/@geyserfund" isExternal>
        <Icon as={PiTiktokLogoBold} boxSize={6} cursor="pointer" />
      </ChakraLink>
    </HStack>
  )
}
