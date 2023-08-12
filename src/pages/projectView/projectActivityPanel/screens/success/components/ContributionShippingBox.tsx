import { Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CreatorEmailButton } from '../../../../../../components/molecules'
import { useProjectContext } from '../../../../../../context'
import { CreatorEmailContentButton } from './CreatorEmailContentButton'

export const ContributionShippingBox = () => {
  const { t } = useTranslation()
  const { project } = useProjectContext()
  const ownerEmail = project?.owners[0]?.user.email || ''
  return (
    <VStack
      padding={2}
      width={'full'}
      borderRadius="8px"
      backgroundColor="primary.100"
      spacing={2}
      justify="flex-start"
      alignItems="flex-start"
    >
      <Text variant="body1">{t('Shipping')}</Text>
      <Text>
        {t(
          "To receive the selected items, you need to send your shipping details to the creator's email.",
        )}
      </Text>

      <CreatorEmailButton email={ownerEmail} />
      <CreatorEmailContentButton />
    </VStack>
  )
}
