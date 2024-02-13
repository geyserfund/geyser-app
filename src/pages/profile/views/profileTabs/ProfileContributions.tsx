import { Box, HStack, Link, Text, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { H3 } from '../../../../components/typography'
import { ImageWithReload, SatoshiAmount } from '../../../../components/ui'
import { getPath } from '../../../../constants'
import { ProfileTabLayout } from '../../components'
import { UserProfile, UserProfileContributionType } from '../../type'

function contributionAmount(c: UserProfileContributionType) {
  if (c.funder) {
    return c.funder.amountFunded ?? 0
  }

  return 0
}

interface ContributionSummaryProps {
  title: string
  url: string
  imageSrc: string
  amount: number
}

const ContributionSummary = ({ title, url, amount, imageSrc }: ContributionSummaryProps) => {
  return (
    <Link href={url} textDecoration="none" _hover={{ textDecoration: 'none' }}>
      <HStack spacing={2}>
        <Box width="75px" height="75px">
          <ImageWithReload
            width="100%"
            height="100%"
            objectFit="cover"
            src={imageSrc}
            alt={`${title}-header-image`}
            borderRadius="8px"
          />
        </Box>
        <VStack align="flex-start">
          <H3>{title}</H3>
          <SatoshiAmount color="primary.800" fontSize="2xl" fontWeight="bold">
            {amount}
          </SatoshiAmount>
        </VStack>
      </HStack>
    </Link>
  )
}

export const ProfileContributions = ({ userProfile }: { userProfile: UserProfile }) => {
  const { t } = useTranslation()
  const contributions = useMemo(() => {
    const contributions = [...userProfile.contributions]
    contributions.sort((a, b) => contributionAmount(b) - contributionAmount(a))
    return contributions
  }, [userProfile])
  return (
    <ProfileTabLayout title={t('My contributions')}>
      {contributions.map((c: UserProfileContributionType) => (
        <ContributionSummary
          key={c.project.id}
          title={c.project.title}
          imageSrc={c.project.thumbnailImage || ''}
          url={getPath('project', c.project.name)}
          amount={contributionAmount(c)}
        />
      ))}
      {contributions.length === 0 && <Text>{t('This user has no contributions yet.')}</Text>}
    </ProfileTabLayout>
  )
}
