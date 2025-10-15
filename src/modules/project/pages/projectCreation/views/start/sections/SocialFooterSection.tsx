import { HStack, Icon, Link as ChakraLink } from '@chakra-ui/react'
import { t } from 'i18next'
import { FaXTwitter } from 'react-icons/fa6'
import { PiInstagramLogoBold, PiTiktokLogoBold, PiYoutubeLogoBold } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { SubscribeForm } from '@/shared/sections/SubscribeForm.tsx'

import { CreationLayoutCard } from '../components/CreationLayoutCard.tsx'

/** Social media footer section with icons and email input */
export const SocialFooterSection = () => {
  return (
    <CreationLayoutCard>
      <Body size="md" textAlign="center" maxWidth={dimensions.creation.start.maxWidth}>
        {t(
          'Follow Geyser on socials and subscribe to our newsletter for the latest tips, stories, and project updates.',
        )}
      </Body>

      <HStack spacing={8}>
        <ChakraLink href="https://instagram.com/geyserfund" isExternal>
          <Icon as={PiInstagramLogoBold} boxSize={8} cursor="pointer" />
        </ChakraLink>
        <ChakraLink href="https://twitter.com/geyserfund" isExternal>
          <Icon as={FaXTwitter} boxSize={8} cursor="pointer" />
        </ChakraLink>
        <ChakraLink href="https://youtube.com/@geyserfund" isExternal>
          <Icon as={PiYoutubeLogoBold} boxSize={8} cursor="pointer" />
        </ChakraLink>
        <ChakraLink href="https://tiktok.com/@geyserfund" isExternal>
          <Icon as={PiTiktokLogoBold} boxSize={8} cursor="pointer" />
        </ChakraLink>
      </HStack>

      <SubscribeForm
        maxWidth={'400px'}
        buttonProps={{
          children: t('Get Started'),
          variant: 'solid',
          colorScheme: 'primary1',
        }}
        flexDirection="column"
        alignItems="center"
        spacing={4}
      />
    </CreationLayoutCard>
  )
}
