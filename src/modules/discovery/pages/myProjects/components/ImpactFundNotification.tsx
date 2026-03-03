import { Button, HStack, Icon, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiInfo } from 'react-icons/pi'
import { Link } from 'react-router'

import { getEligibleImpactFund } from '@/modules/project/pages/projectView/views/body/sections/impactFundEligibility.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectForMyProjectsFragment, useImpactFundApplicationsQuery, useImpactFundQuery } from '@/types'

type ImpactFundNotificationProps = {
  project: ProjectForMyProjectsFragment
}

export const ImpactFundNotification = ({ project }: ImpactFundNotificationProps) => {
  const eligibleImpactFund = getEligibleImpactFund({
    region: project?.location?.region,
    subCategory: project?.subCategory,
  })

  const { data: fundData } = useImpactFundQuery({
    skip: !eligibleImpactFund,
    variables: { input: { where: { name: eligibleImpactFund?.name ?? '' } } },
  })

  const fundId = fundData?.impactFund?.id

  const { data: applicationsData } = useImpactFundApplicationsQuery({
    skip: !fundId || !project.id,
    variables: { input: { impactFundId: fundId!, projectId: project.id } },
  })

  const hasExistingApplication = (applicationsData?.impactFundApplications?.totalCount ?? 0) > 0

  const showNotification = eligibleImpactFund && !hasExistingApplication

  if (!showNotification) {
    return null
  }

  return (
    <Stack
      w="full"
      direction={{ base: 'column', md: 'row' }}
      spacing={3}
      px={3}
      py={2}
      bg="neutral1.2"
      borderRadius="6px"
      alignItems={{ base: 'stretch', md: 'center' }}
      justifyContent={{ base: 'flex-start', md: 'space-between' }}
    >
      <HStack spacing={2} flex={1} alignItems="start">
        <Icon as={PiInfo} color="neutral1.11" boxSize="16px" flexShrink={0} mt={0.5} />
        <VStack align="start" spacing={0} flex={1} minW={0}>
          <Body size="sm" bold color="neutral1.11">
            {t('Eligible for {{fundName}}.', { fundName: eligibleImpactFund.title })}
          </Body>
          <Body size="sm" color="neutral1.11">
            {t('Your project may be eligible for funding.')}
          </Body>
        </VStack>
      </HStack>
      <Button
        as={Link}
        to={getPath('impactFunds', encodeURIComponent(eligibleImpactFund.name))}
        size="sm"
        variant="soft"
        colorScheme="neutral1"
        flexShrink={0}
        alignSelf={{ base: 'flex-start', md: 'center' }}
      >
        {t('Learn more')}
      </Button>
    </Stack>
  )
}
