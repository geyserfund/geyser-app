import { Button, HStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router'

import { useProjectAtom, useRewardsAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'

export const RewardNotice = () => {
  const { project } = useProjectAtom()
  const { hasRewards } = useRewardsAtom()

  if (!hasRewards) {
    return null
  }

  return (
    <Feedback variant={FeedBackVariant.PRIORITY} noIcon>
      <HStack w="full" justifyContent="space-between">
        <Body>{t('Support this campaign by buying a product')}</Body>
        <Button as={Link} to={getPath('projectRewards', project.name)} variant="solid" colorScheme="cyan">
          {t('View products')}
        </Button>
      </HStack>
    </Feedback>
  )
}
