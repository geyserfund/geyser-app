import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useState } from 'react'

import { postNudgeCreatorData } from '@/api/airtable.ts'
import { fundingInputAfterRequestAtom } from '@/modules/project/funding/state/fundingContributionCreateInputAtom.ts'
import { fundingProjectAtom } from '@/modules/project/funding/state/fundingFormAtom.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useNotification } from '@/utils/index.ts'

export const FiatSwapOwnerNotVerified = () => {
  const toast = useNotification()

  const fundingContributionAfterRequest = useAtomValue(fundingInputAfterRequestAtom)
  const project = useAtomValue(fundingProjectAtom)

  const [loading, setLoading] = useState(false)
  const [nudged, setNudged] = useState(false)

  const handleClick = async () => {
    if (nudged) return
    setLoading(true)
    try {
      await postNudgeCreatorData({
        projectName: project.name,
        creatorName: project.owners[0]?.user?.username || '',
        contributorName: fundingContributionAfterRequest?.user?.username || '',
      })
      setNudged(true)
      toast.success({
        title: t('Creator will be notified shortly'),
        description: t('Meanwhile, please try other payment methods'),
      })
    } catch {
      toast.error({
        title: t('Failed to nudge creator'),
        description: t('Please try again later'),
      })
    }

    setLoading(false)
  }

  return (
    <VStack w="full" spacing={6}>
      <VStack spacing={2} w="full" maxWidth={'500px'}>
        <Body medium> {t('This project has not enabled fiat contributions yet')}</Body>
        <Body size="sm" textAlign={'center'}>
          {t('Let the creator know you would like to make a payment with fiat, so they can get it setup.')}
        </Body>
      </VStack>
      <Button
        w="250px"
        variant="solid"
        colorScheme="primary1"
        size="lg"
        onClick={handleClick}
        isLoading={loading}
        isDisabled={nudged}
      >
        {t('Nudge the creator')}
      </Button>
    </VStack>
  )
}
