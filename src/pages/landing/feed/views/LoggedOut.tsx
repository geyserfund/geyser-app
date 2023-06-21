import { Box, Image, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body1 } from '../../../../components/typography'
import { ButtonComponent } from '../../../../components/ui'
import { FeedLoggedOutUrl } from '../../../../constants'
import { useAuthContext } from '../../../../context'

export const LoggedOut = () => {
  const { t } = useTranslation()
  const { loginOnOpen } = useAuthContext()
  return (
    <VStack w="full" padding="12px" spacing="20px">
      <Box width="200px">
        <Image w="full" h="auto" alt="feed-logged-out" src={FeedLoggedOutUrl} />
      </Box>
      <VStack w="full">
        <Body1 bold color="neutral.1000">
          {t("You're not logged in")}
        </Body1>
        <Body1 color="neutral.1000">{t('Login now to see activity')}</Body1>
      </VStack>
      <ButtonComponent
        primary
        width="full"
        maxWidth="200px"
        onClick={loginOnOpen}
      >
        {t('Login')}
      </ButtonComponent>
    </VStack>
  )
}
