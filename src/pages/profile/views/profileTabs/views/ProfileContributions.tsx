import { Button, Image, Link, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BsArrowDownSquare } from 'react-icons/bs'

import { Body2 } from '../../../../../components/typography'
import { getAppEndPoint } from '../../../../../config/domain'
import { NoContributionImageUrl } from '../../../../../constants'
import { UserProjectContributionsFragment } from '../../../../../types'
import { ProfileTabLayout } from '../../../components'
import { ContributionSummary } from '../components/ContributionSummary'
import { TabPanelSkeleton } from '../components/TabPanelSkeleton'

interface ProfileContributionsProps {
  contributions: UserProjectContributionsFragment[]
  isLoading: boolean
}

export const ProfileContributions = ({ contributions, isLoading }: ProfileContributionsProps) => {
  const { t } = useTranslation()

  if (isLoading) {
    return <TabPanelSkeleton />
  }

  const appEndpoint = getAppEndPoint()

  const downloadUrl = `${appEndpoint}/export/payments/user`

  return (
    <ProfileTabLayout
      heading={t('Contributions')}
      headerContent={
        <Button
          as={Link}
          href={downloadUrl}
          isExternal
          size="sm"
          textDecoration={'none'}
          variant="secondary"
          rightIcon={<BsArrowDownSquare fontSize={'16px'} />}
        >
          {t('Export')}
        </Button>
      }
    >
      {contributions.map((c: UserProjectContributionsFragment) => (
        <ContributionSummary key={c.funder?.id} funder={c.funder} project={c.project} />
      ))}
      {contributions.length === 0 && (
        <VStack w="full" p="20px" spacing="20px">
          <Image height="200px" src={NoContributionImageUrl} />
          <Body2 semiBold color={'neutral.600'}>
            {' '}
            {t('No contributions made yet')}
          </Body2>
        </VStack>
      )}
    </ProfileTabLayout>
  )
}
