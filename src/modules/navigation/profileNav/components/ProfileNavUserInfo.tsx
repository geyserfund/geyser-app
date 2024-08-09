import { Avatar, Button, HStack, VStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useTranslation } from 'react-i18next'

import { ExternalAccountType } from '../../../../pages/auth'
import { loginMethodAtom } from '../../../../pages/auth/state'
import { Body } from '../../../../shared/components/typography'
import { externalAccountIconMap } from '../../../../shared/constants/platform/externalAccountIcons'
import { UserMeFragment } from '../../../../types'

export const ProfileNavUserInfo = ({ user }: { user: UserMeFragment }) => {
  const { t } = useTranslation()

  const loginMethod = useAtomValue(loginMethodAtom)
  const Icon = loginMethod ? externalAccountIconMap[loginMethod as ExternalAccountType] : null

  return (
    <HStack spacing={2} w="full" justifyContent={'start'} _hover={{ cursor: 'pointer' }}>
      <Avatar src={user.imageUrl || ''} />
      <VStack flex={1} spacing={0} alignItems={'start'} overflowX={'hidden'}>
        <Body w="full" fontSize="xl" bold isTruncated>
          {user.username}
        </Body>
        {loginMethod && (
          <Button size="xs" variant="outline" colorScheme="neutral1" rightIcon={loginMethod ? <Icon /> : undefined}>
            {t('Logged in with')}
          </Button>
        )}
      </VStack>
    </HStack>
  )
}
