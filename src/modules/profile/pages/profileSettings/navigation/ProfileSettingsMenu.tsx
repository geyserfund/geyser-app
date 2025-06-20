import { Button, ButtonProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { Link } from 'react-router-dom'

import { useAuthContext } from '@/context'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { getPath } from '@/shared/constants/index.ts'
import { useMobileMode } from '@/utils'

import { currentProfileSettingsItemAtom } from './profileSettingsAtom'
import { ProfileSettingsItem, profileSettingsItems } from './profileSettingsNavData'

export const ProfileSettingsMenuMobile = () => {
  return (
    <VStack w="full" paddingX={1} spacing={4} paddingTop={3}>
      <ProfileSettingsMenuContent width="100%" />
    </VStack>
  )
}

export const ProfileSettingsMenuDesktop = () => {
  return (
    <VStack height={'100%'} p={6} spacing={3} borderRight="1px solid" borderColor="neutral1.6">
      <ProfileSettingsMenuContent />
    </VStack>
  )
}

const ProfileSettingsMenuContent = (props: ButtonProps) => {
  const { user } = useAuthContext()

  const isMobile = useMobileMode()

  const currentProfileSettingsItem = useAtomValue(currentProfileSettingsItemAtom)

  return (
    <>
      {profileSettingsItems.map((item) => (
        <ProfileSettingsMenuButton
          key={item.label}
          item={item}
          currentProfileSettingsItem={currentProfileSettingsItem}
          isMobile={isMobile}
          userId={user.id}
          {...props}
        />
      ))}
    </>
  )
}

type ProfileSettingsMenuButtonProps = {
  item: ProfileSettingsItem
  currentProfileSettingsItem?: ProfileSettingsItem
  isMobile?: boolean
  userId: string
} & ButtonProps

const ProfileSettingsMenuButton = ({
  item,
  currentProfileSettingsItem,
  isMobile,
  userId,
  ...rest
}: ProfileSettingsMenuButtonProps) => {
  const isActive = isMobile ? false : currentProfileSettingsItem?.path === item.path

  return (
    <Button
      variant="menu"
      colorScheme="primary1"
      size="lg"
      width={`${dimensions.project.dashboard.menu.width}px`}
      key={item.label}
      leftIcon={<item.icon fontSize="18px" />}
      as={Link}
      to={getPath(item.path, userId)}
      isActive={isActive}
      {...rest}
    >
      {t(item.label)}
    </Button>
  )
}
