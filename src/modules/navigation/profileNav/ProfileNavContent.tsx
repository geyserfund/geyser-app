import {
  Button,
  ButtonProps,
  ComponentWithAs,
  Divider,
  HStack,
  Link as ChakraLink,
  MenuItem,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiCertificate, PiMagnifyingGlass } from 'react-icons/pi'
import { RiHomeLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

import { dimensions, FeedbackUrl, getPath, GeyserAboutUrl, GeyserGithubUrl, GuideUrl } from '../../../constants'
import { useAuthContext } from '../../../context'
import { Body } from '../../../shared/components/typography'
import { LoginButton } from '../components/LoginButton'
import { ProfileNavUserInfo } from './components'
import { ModeChange } from './components/ModeChange'

export const ProfileNavContent = () => {
  const { t } = useTranslation()
  const { logout, user } = useAuthContext()
  return (
    <VStack
      padding={4}
      width={dimensions.sideNav.width}
      spacing={6}
      alignItems={'start'}
      justifyContent={{ base: 'space-between', lg: 'start' }}
      height="100%"
    >
      <VStack w="full" spacing={6}>
        {user.id ? (
          <ProfileNavUserInfo user={user} />
        ) : (
          <HStack w="full" justifyContent="center">
            <LoginButton w="full" />
          </HStack>
        )}
        <Divider borderColor="neutral1.6" />
        <VStack spacing={2} w="full">
          <MenuItem as={Link} to={getPath('landingPage')}>
            <HStack>
              <RiHomeLine />
              <Body>{t('Home')}</Body>
            </HStack>
          </MenuItem>
          <MenuItem as={Link} to={getPath('projectDiscovery')}>
            <HStack>
              <PiMagnifyingGlass />
              <Body>{t('Discover')}</Body>
            </HStack>
          </MenuItem>
          <MenuItem as={Link} to={getPath('grants')}>
            <HStack>
              <PiCertificate />
              <Body>{t('Grants')}</Body>
            </HStack>
          </MenuItem>
        </VStack>
        {user && (
          <>
            <Divider borderColor="neutral1.6" />
            <VStack spacing={2} w="full">
              <MenuItem as={Link} to={getPath('userProfileSettings', user.id)}>
                <Body>{t('Settings')}</Body>
              </MenuItem>
              <MenuItem onClick={logout}>
                <Body>{t('Sign Out')}</Body>
              </MenuItem>
            </VStack>
          </>
        )}
      </VStack>

      <VStack w="full" spacing={6}>
        <Divider borderColor="neutral1.6" />
        <HStack w="full" paddingX={4} spacing={0} justifyContent="space-between">
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
        </HStack>

        <ModeChange />
      </VStack>
    </VStack>
  )
}

const UserNavButton: ComponentWithAs<'button', ButtonProps> = (props) => {
  return (
    <Button
      w="full"
      variant="ghost"
      colorScheme="neutral1"
      size="lg"
      justifyContent={'start'}
      _hover={{
        bg: 'primary1.9',
        color: 'neutral1.1',
      }}
      {...props}
    />
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
      _hover={{ backgroundColor: 'none' }}
      {...props}
    />
  )
}
