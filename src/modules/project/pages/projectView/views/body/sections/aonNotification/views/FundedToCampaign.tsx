import { Button, HStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'

export const FundedToCampaign = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <Feedback variant={FeedBackVariant.SUCCESS} iconProps={{ fontSize: '20px', marginTop: '2px' }}>
      <HStack w="full" flexWrap="wrap" spacing={0}>
        <Body bold>{t('You contributed to this project.')}</Body>
        <Body bold light ml={1}>
          {t('You can refund by ')}
        </Body>
        <Button paddingY={0} paddingX={1} colorScheme="neutral1" variant="ghost" size="sm" onClick={onOpen}>
          <Body size="md" bold>
            {t('clicking here.')}
          </Body>
        </Button>
      </HStack>
    </Feedback>
  )
}
