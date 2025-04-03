import { ButtonProps, Divider, HStack, StackProps, VStack } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Link as ChakraLink } from '@chakra-ui/react'
import { ComponentWithAs } from '@chakra-ui/system'
import { t } from 'i18next'
import { Link } from 'react-router-dom'

import {
  FeedbackUrl,
  getPath,
  GeyserAboutUrl,
  GeyserGithubUrl,
  GeyserPrivacyUrl,
  GeyserTermsUrl,
  GuideUrl,
} from '@/shared/constants'
import { useMobileMode } from '@/utils/index.ts'

type UserExternalLinksComponentProps = {
  noMobile?: boolean
  onlyMobile?: boolean
  spread?: boolean
} & StackProps

export const UserExternalLinksComponent = ({
  noMobile,
  onlyMobile,
  spread,
  ...rest
}: UserExternalLinksComponentProps) => {
  const isMobile = useMobileMode()
  if (noMobile && isMobile) {
    return null
  }

  if (onlyMobile && !isMobile) {
    return null
  }

  return (
    <VStack w="full" paddingTop={20} {...rest}>
      <Divider />
      <UserExternalLinks spread={spread} />
    </VStack>
  )
}

type UserExternalLinksProps = {
  spread?: boolean
} & StackProps

export const UserExternalLinks = ({ spread, ...props }: UserExternalLinksProps) => {
  return (
    <HStack
      w="full"
      flexWrap="wrap"
      paddingX={4}
      spacing={{ base: 2, lg: spread ? 2 : 0, xl: 2 }}
      justifyContent="center"
      {...props}
    >
      <UserNavExternalButton as={ChakraLink} isExternal href={GuideUrl}>
        {t('Guide')}
      </UserNavExternalButton>
      <UserNavExternalButton as={ChakraLink} isExternal href={FeedbackUrl}>
        {t('Feedback')}
      </UserNavExternalButton>
      <UserNavExternalButton as={ChakraLink} isExternal href={GeyserGithubUrl}>
        {t('Github')}
      </UserNavExternalButton>
      <UserNavExternalButton as={ChakraLink} isExternal href={GeyserAboutUrl}>
        {t('About')}
      </UserNavExternalButton>

      <UserNavExternalButton as={ChakraLink} isExternal href={GeyserTermsUrl} color="neutral1.9">
        {t('Terms')}
      </UserNavExternalButton>
      <UserNavExternalButton as={ChakraLink} isExternal href={GeyserPrivacyUrl} color="neutral1.9">
        {t('Privacy')}
      </UserNavExternalButton>
      <UserNavExternalButton as={Link} to={getPath('project', 'geyser')} color="neutral1.9">
        {t('Donate')}
      </UserNavExternalButton>
    </HStack>
  )
}

const UserNavExternalButton: ComponentWithAs<'button', ButtonProps> = (props) => {
  return (
    <Button
      variant="ghost"
      colorScheme="neutral1"
      size="sm"
      textDecoration={'none'}
      paddingX={0}
      _hover={{ backgroundColor: 'none', textDecoration: 'underline' }}
      {...props}
    />
  )
}
