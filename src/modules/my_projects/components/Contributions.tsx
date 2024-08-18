import { Box, Divider, HStack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { DonateIcon } from '@/components/icons/svg/DonateIcon'
import { Body } from '@/shared/components/typography'
import { commaFormatted } from '@/utils'

import { useProjectStats } from '../hooks/useProjectStats'

interface ContributionsProps {
  projectId: string
}

const Contributions: React.FC<ContributionsProps> = ({ projectId }) => {
  const { stats, isLoading, error } = useProjectStats(projectId)

  if (isLoading) return <Box>Loading...</Box>
  if (error) return <Box>Error: {error.message}</Box>

  const { total, totalUsd } = stats || {}

  return (
    <Box borderWidth={1} borderRadius="lg" p={4} flex={1}>
      <Header total={total} totalUsd={totalUsd} />
      <Divider my={4} />
    </Box>
  )
}

export default Contributions

const Header = ({ total, totalUsd }: { total: number | undefined; totalUsd: number | undefined }) => {
  const { t } = useTranslation()

  const noContributionsReceived = !total || total === 0

  return (
    <VStack w="100%" align="stretch" spacing={0.5}>
      <HStack w="100%" justifyContent="center">
        <DonateIcon />
        <Body fontSize={'14px'} regular muted>
          {t('Contributions Received')}
        </Body>
      </HStack>

      {noContributionsReceived ? (
        <HStack w="100%" justifyContent="center">
          <Body fontSize={'20px'} bold>
            No contributions received
          </Body>
        </HStack>
      ) : (
        <HStack w="100%" justifyContent="center">
          <Body fontSize={'20px'} bold>
            {commaFormatted(total)}{' '}
            <Body as="span" fontSize={'20px'} color={'neutralAplha.11'}>
              Sats (${commaFormatted(totalUsd)})
            </Body>
          </Body>
        </HStack>
      )}
    </VStack>
  )
}
