import { Button, ButtonProps, Divider, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { Link } from 'react-router'

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
    <VStack height={'100%'} p={6} spacing={3} borderRight="1px solid" borderColor="neutral1.6" boxShadow="none">
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
        <VStack key={item.label} spacing={3} w="full">
          <ProfileSettingsMenuButton
            item={item}
            currentProfileSettingsItem={currentProfileSettingsItem}
            isMobile={isMobile}
            userId={user.id}
            {...props}
          />
          {item.showDividerAfter ? <Divider borderColor="neutral1.6" /> : null}
        </VStack>
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
      boxShadow="none"
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
