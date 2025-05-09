import { Button, HStack, Image, Link, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiDownloadSimple } from 'react-icons/pi'

import { Body, H1 } from '@/shared/components/typography'

import { getAppEndPoint } from '../../../../../../../config/domain'
import { NoContributionImageUrl } from '../../../../../../../shared/constants'
import { UserProjectContributionsFragment } from '../../../../../../../types'
import { useUserProfileAtom, useViewingOwnProfileAtomValue } from '../../../../../state'
import { ContributionSummary } from '../components/ContributionSummary'
import { TabPanelSkeleton } from '../components/TabPanelSkeleton'
import { useProfileContributionQuery } from '../hooks/useProfileContributionQuery'

/** Helper function to get contribution date for sorting */
const getContributionDate = (contribution: any) => {
  const contributions =
    contribution?.funder?.contributions && contribution?.funder?.contributions?.length > 0
      ? contribution?.funder?.contributions
      : []

  return Number(contributions[0]?.confirmedAt || 0)
}

/** Sort contributions by date in descending order */
const sortContributionsByDate = (contributions: any[]) => {
  return [...contributions].sort((a, b) => {
    const aDate = getContributionDate(a)
    const bDate = getContributionDate(b)
    return bDate - aDate
  })
}

export const ProfileContributions = () => {
  const { t } = useTranslation()

  const { userProfile } = useUserProfileAtom()

  const { isLoading, contributions } = useProfileContributionQuery(userProfile.id)

  const isViewingOwnProfile = useViewingOwnProfileAtomValue()

  if (isLoading) {
    return <TabPanelSkeleton />
  }

  const appEndpoint = getAppEndPoint()

  const downloadUrl = `${appEndpoint}/export/payments/user`

  const contributionsSorted = sortContributionsByDate(contributions)

  return (
    <VStack w="full" alignItems={'start'} spacing={4}>
      <HStack w="full" justifyContent={{ base: 'space-between', lg: 'flex-end' }}>
        <H1 size="2xl" bold display={{ base: 'unset', lg: 'none' }}>
          {t('Contributions')}
        </H1>
        {isViewingOwnProfile ? (
          <Button
            as={Link}
            href={downloadUrl}
            isExternal
            size="md"
            variant="outline"
            colorScheme="neutral1"
            rightIcon={<PiDownloadSimple fontSize={'16px'} />}
            padding={2}
          >
            {t('Export')}
          </Button>
        ) : null}
      </HStack>

      {contributionsSorted.map((c: UserProjectContributionsFragment) => {
        if (!c.funder) {
          return null
        }

        return <ContributionSummary key={c.funder?.id} funder={c.funder} project={c.project} />
      })}
      {contributions.length === 0 && (
        <VStack w="full" p="20px" spacing="20px">
          <Image height="200px" src={NoContributionImageUrl} />
          <Body medium light>
            {t('No contributions made yet')}
          </Body>
        </VStack>
      )}
    </VStack>
  )
}
