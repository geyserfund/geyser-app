import { Button, Image, Link, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiDownloadSimple } from 'react-icons/pi'

import { Body } from '@/shared/components/typography'

import { getAppEndPoint } from '../../../../../../../config/domain'
import { NoContributionImageUrl } from '../../../../../../../shared/constants'
import { UserProjectContributionsFragment } from '../../../../../../../types'
import { useUserProfileAtom, useViewingOwnProfileAtomValue } from '../../../../../state'
import { ContributionSummary } from '../components/ContributionSummary'
import { TabPanelSkeleton } from '../components/TabPanelSkeleton'
import { useProfileContributionQuery } from '../hooks/useProfileContributionQuery'

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

  return (
    <>
      {isViewingOwnProfile ? (
        <Button
          as={Link}
          href={downloadUrl}
          isExternal
          size="md"
          variant="outline"
          colorScheme="neutral1"
          rightIcon={<PiDownloadSimple fontSize={'16px'} />}
          alignSelf={'flex-end'}
          padding={2}
        >
          {t('Export')}
        </Button>
      ) : null}
      {contributions.map((c: UserProjectContributionsFragment) => {
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
    </>
  )
}
