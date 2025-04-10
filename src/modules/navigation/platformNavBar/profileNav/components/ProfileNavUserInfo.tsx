import { Avatar, Button, HStack, VStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useTranslation } from 'react-i18next'

import { ExternalAccountType } from '@/modules/auth'
import { loginMethodAtom } from '@/modules/auth/state'
import { ProfileText } from '@/shared/components/display/ProfileText'
import { Body } from '@/shared/components/typography'
import { externalAccountIconMap } from '@/shared/constants/platform/externalAccountIcons'
import { UserMeFragment } from '@/types'

export const ProfileNavUserInfo = ({ user }: { user: UserMeFragment }) => {
  const { t } = useTranslation()

  const loginMethod = useAtomValue(loginMethodAtom)
  const Icon = loginMethod ? externalAccountIconMap[loginMethod as ExternalAccountType] : null

  return (
    <VStack w="full">
      <HStack spacing={2} w="full" justifyContent={'start'} _hover={{ cursor: 'pointer' }}>
        <Avatar src={user.imageUrl || ''} />
        <VStack flex={1} spacing={0} alignItems={'flex-start'} justifyContent={'center'} overflowX={'hidden'}>
          <Body w="full" fontSize="xl" lineHeight="1.2" bold isTruncated>
            {user.username}
          </Body>
          {user.guardianType && <ProfileText size="sm" name={user.username} guardian={user.guardianType} />}
        </VStack>
      </HStack>
      {loginMethod && (
        <Button
          size="xs"
          variant="soft"
          width="full"
          colorScheme="neutral1"
          rightIcon={loginMethod ? <Icon height="16px" width="16px" /> : undefined}
          color="neutral1.12"
        >
          {t('Logged in with')}
        </Button>
      )}
    </VStack>
  )
}
