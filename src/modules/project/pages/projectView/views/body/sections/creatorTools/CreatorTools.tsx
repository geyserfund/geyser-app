import { Box, Button, HStack, Link as ChakraLink } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowUpRight, PiCoinsDuotone } from 'react-icons/pi'
import { Link, useLocation } from 'react-router'

import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath, GuideStepByStepUrl } from '@/shared/constants/index.ts'
import { ProjectStatus, useImpactFundApplicationsQuery, useImpactFundQuery } from '@/types'

import { useProjectAtom } from '../../../../../../hooks/useProjectAtom.ts'
import { getEligibleImpactFund } from '../impactFundEligibility.ts'
import { CreatorButtons } from './components/CreatorButtons.tsx'

export const CreatorTools = () => {
  const { project, isProjectOwner } = useProjectAtom()
  const location = useLocation()
  const isDraftUrl = location.pathname.includes('/draft')
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
    variables: { input: { impactFundId: fundId ?? 0, projectId: project.id } },
  })

  const hasExistingApplication = (applicationsData?.impactFundApplications?.totalCount ?? 0) > 0

  if (
    !isProjectOwner ||
    isDraftUrl ||
    (project.status && [ProjectStatus.Closed, ProjectStatus.Deleted].includes(project.status))
  )
    return null

  return (
    <CardLayout
      display={{ base: 'none', lg: 'flex' }}
      w="full"
      direction="row"
      flexWrap="wrap"
      backgroundColor="neutral1.3"
      spacing={4}
    >
      <HStack w="full" justifyContent="space-between">
        <Body size="2xl" bold>
          {t('Creator tools')}
        </Body>
        <Button
          size={'md'}
          as={ChakraLink}
          href={GuideStepByStepUrl}
          isExternal
          variant="ghost"
          colorScheme="neutral1"
          paddingX={2}
          rightIcon={<PiArrowUpRight />}
        >
          {t('Guides & Checklist')}
        </Button>
      </HStack>

      {eligibleImpactFund && !hasExistingApplication && (
        <HStack
          w="full"
          justifyContent="space-between"
          alignItems="center"
          bg="utils.pbg"
          border="1px solid"
          borderColor="neutral1.6"
          borderRadius="8px"
          px={4}
          py={4}
          spacing={4}
        >
          <HStack spacing={3} flex={1} alignItems="center">
            <Box color="neutral1.11" flexShrink={0}>
              <PiCoinsDuotone size={22} />
            </Box>
            <Body size="md" medium>
              {t('Your project may be eligible to receive funds through the')}{' '}
              <Body as="span" size="md" bold>
                {eligibleImpactFund.title}
              </Body>
              {'.'}
            </Body>
          </HStack>

          <Button
            as={Link}
            to={getPath('impactFunds', encodeURIComponent(eligibleImpactFund.name))}
            size="md"
            variant="solid"
            colorScheme="primary1"
            flexShrink={0}
          >
            {t('Learn more')}
          </Button>
        </HStack>
      )}

      <HStack w="full" spacing={4} alignItems="stretch">
        <CreatorButtons />
      </HStack>
    </CardLayout>
  )
}
