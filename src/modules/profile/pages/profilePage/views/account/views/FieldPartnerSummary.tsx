import { useQuery } from '@apollo/client'
import { HStack, Icon, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import type { IconType } from 'react-icons'
import { PiArrowUpRight, PiChartLineUpBold, PiHandshakeBold, PiUsersThreeBold } from 'react-icons/pi'

import { QUERY_FIELD_PARTNER_PROJECTS } from '@/modules/project/graphql/queries/fieldPartnerProjectsQuery.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body, H2 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { ProjectForLandingPageFragment, ProjectStatus } from '@/types/index.ts'
import { getShortAmountLabel } from '@/utils'

import { SkeletonLayout } from '../../../../../../../shared/components/layouts'
import { useUserProfileAtom } from '../../../../../state'

type FieldPartnerProjectsQueryData = {
  projectsGet: {
    projects: ProjectForLandingPageFragment[]
  }
}

export const FieldPartnerSummary = () => {
  const { userProfile } = useUserProfileAtom()

  const { data, loading } = useQuery<FieldPartnerProjectsQueryData>(QUERY_FIELD_PARTNER_PROJECTS, {
    skip: !userProfile.id,
    variables: {
      input: {
        where: {
          fieldPartnerUserId: userProfile.id,
          status: ProjectStatus.Active,
        },
        pagination: {
          take: 100,
        },
      },
    },
  })

  const fieldPartnerProjects = useMemo(() => data?.projectsGet.projects || [], [data?.projectsGet.projects])
  const capitalEnabledSats = useMemo(
    () => fieldPartnerProjects.reduce((total, project) => total + (project.balance || 0), 0),
    [fieldPartnerProjects],
  )

  if (loading) {
    return <SkeletonLayout height="168px" width="100%" />
  }

  if (fieldPartnerProjects.length === 0) {
    return null
  }

  return (
    <VStack w="full" alignItems="start" spacing={3}>
      <Body size="xl" medium>
        {t('Field Partner')}
      </Body>

      <CardLayout
        to={getPath('discoveryImpactFunds')}
        w="full"
        spacing={0}
        padding={{ base: 3, lg: 4 }}
        borderColor="neutral1.5"
        hover
      >
        <HStack w="full" spacing={3} alignItems="start">
          <MetricIcon Icon={PiHandshakeBold} />
          <VStack flex={1} alignItems="start" spacing={1} minW={0}>
            <HStack spacing={2} flexWrap="wrap">
              <H2 size="md" bold>
                {t('Field Partner Program')}
              </H2>
              <Body size="xs" medium px={2.5} py={0.5} borderRadius="full" bgColor="primary1.3" color="primary1.11">
                {t('Active')}
              </Body>
            </HStack>
            <Body size="sm" color="neutral1.10">
              {t('Access to 0% capital, recoverable grants, and partner rewards.')}
            </Body>
          </VStack>
          <Icon as={PiArrowUpRight} boxSize={5} color="primary1.9" flexShrink={0} />
        </HStack>
      </CardLayout>

      <SimpleGrid w="full" columns={{ base: 1, sm: 2 }} spacing={3}>
        <FieldPartnerMetric
          Icon={PiUsersThreeBold}
          value={String(fieldPartnerProjects.length)}
          label={t('Projects onboarded')}
        />
        <FieldPartnerMetric
          Icon={PiChartLineUpBold}
          value={`${getShortAmountLabel(capitalEnabledSats, true)} sats`}
          label={t('Capital enabled')}
        />
      </SimpleGrid>
    </VStack>
  )
}

const MetricIcon = ({ Icon }: { Icon: IconType }) => {
  return (
    <HStack
      w="40px"
      h="40px"
      flexShrink={0}
      justifyContent="center"
      alignItems="center"
      borderRadius="12px"
      bgColor="primary1.2"
      color="primary1.9"
    >
      <Icon size={22} />
    </HStack>
  )
}

const FieldPartnerMetric = ({ Icon, value, label }: { Icon: IconType; value: string; label: string }) => {
  return (
    <CardLayout dense w="full" spacing={0} padding={3} borderColor="neutral1.5">
      <HStack spacing={3} alignItems="center">
        <MetricIcon Icon={Icon} />
        <VStack alignItems="start" spacing={0} minW={0}>
          <Body size="md" bold sx={{ fontVariantNumeric: 'tabular-nums' }}>
            {value}
          </Body>
          <Body size="sm" color="neutral1.10">
            {label}
          </Body>
        </VStack>
      </HStack>
    </CardLayout>
  )
}
