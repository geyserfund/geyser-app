import { Button, HStack, Image, Link, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiDownloadSimple } from 'react-icons/pi'

import { ScrollInvoke } from '@/helpers/ScrollInvoke.tsx'
import { Body, H1 } from '@/shared/components/typography'
import { UserProjectContributionFragment } from '@/types/generated/graphql.ts'
import { useMobileMode } from '@/utils/index.ts'

import { getAppEndPoint } from '../../../../../../../config/domain'
import { ID, NoContributionImageUrl } from '../../../../../../../shared/constants'
import { useUserProfileAtom, useViewingOwnProfileAtomValue } from '../../../../../state'
import { ContributionSummary } from '../components/ContributionSummary'
import { TabPanelSkeleton } from '../components/TabPanelSkeleton'
import { useProfileContributionQuery } from '../hooks/useProfileContributionQuery'

export const ProfileContributions = () => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()

  const { userProfile } = useUserProfileAtom()

  const { isLoading, contributions, fetchNext, isLoadingMore, noMoreItems } = useProfileContributionQuery(
    userProfile.id,
  )

  const isViewingOwnProfile = useViewingOwnProfileAtomValue()

  if (isLoading) {
    return <TabPanelSkeleton />
  }

  const appEndpoint = getAppEndPoint()

  const downloadUrl = `${appEndpoint}/export/payments/user`

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

      {contributions.map((c: UserProjectContributionFragment) => {
        return (
          <>
            <ContributionSummary key={c.id} contribution={c} />
            <ScrollInvoke
              elementId={!isMobile ? ID.profile.tabScrollContainer : undefined}
              onScrollEnd={fetchNext}
              isLoading={isLoadingMore}
              noMoreItems={noMoreItems}
            />
          </>
        )
      })}
      {contributions.length === 0 && (
        <VStack w="full" p="20px" spacing="20px">
          <Image height="200px" src={NoContributionImageUrl} alt={'no contribution image'} />
          <Body medium light>
            {t('No contributions made yet')}
          </Body>
        </VStack>
      )}
    </VStack>
  )
}
