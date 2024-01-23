import { Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CreatorEmailButton } from '../../../../../../components/molecules'
import { CreatorEmailContentButton } from './CreatorEmailContentButton'
import { useCustomTheme } from '../../../../../../utils'

export const ContributionShippingBox = ({
  creatorEmail,
}: {
  creatorEmail?: string | null
}) => {
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
      <Text
        fontSize={'16px'}
        fontWeight={'bold'}
        textColor={'neutral.900'}
      >
        {t('Send Email to Creator')}
      </Text>
      <Text
        fontSize={'14px'}
        fontWeight={'normal'}
        textColor={'neutral.600'}
      >
        To receive the selected items, you need to send your shipping details to the creator's email. Geyser does not want to store your private information for security reasons.
      </Text>
      <Text
        fontSize={'16px'}
        fontWeight={'semibold'}
        textColor={'neutral.900'}
      >
        Creator email
      </Text>
      <CreatorEmailButton email={creatorEmail || ''} />
      <CreatorEmailContentButton />

    </VStack>
  )
}
