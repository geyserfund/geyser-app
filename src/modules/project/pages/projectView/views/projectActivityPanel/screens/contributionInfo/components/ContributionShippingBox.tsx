import { Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CreatorEmailButton } from '../../../../../../../../../components/molecules'
import { MonoBody1 } from '../../../../../../../../../components/typography'
import { useCustomTheme } from '../../../../../../../../../utils'
import { CreatorEmailContentButton } from '../../success/components/CreatorEmailContentButton'

export const ContributionShippingBox = ({ creatorEmail }: { creatorEmail?: string | null }) => {
  const { t } = useTranslation()
  const { colors } = useCustomTheme()
  return (
    <VStack
      padding={2}
      width={'full'}
      borderRadius="8px"
      backgroundColor={colors.primary[50]}
      spacing={2}
      justify={'flex-start'}
      alignItems="flex-start"
      mb={3}
    >
      <Text fontSize={'16px'} fontWeight={'bold'} textColor={'neutral.900'}>
        {t('Send Email to Creator')}
      </Text>
      <MonoBody1 fontSize={'14px'} fontWeight={'normal'} textColor={'neutral.600'}>
        {t('Send your shipping address to the creator’s email, so they can send out your rewards more quickly.')}
      </MonoBody1>
      <Text fontSize={'16px'} fontWeight={'semibold'} textColor={'neutral.900'}>
        {t('Creator email')}
      </Text>
      <CreatorEmailButton email={creatorEmail || ''} />
      <CreatorEmailContentButton />
    </VStack>
  )
}
