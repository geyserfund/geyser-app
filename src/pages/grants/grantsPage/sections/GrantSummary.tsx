import { Box, Image } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CardLayout } from '../../../../components/layouts'
import { Body1, H1, H3 } from '../../../../components/typography'
import { StatusLabel } from '../../../../components/ui/StatusLabel'
import { Grant } from '../../../../types'
import { getShortAmountLabel, useMobileMode } from '../../../../utils'
import { ContributionsWidget } from '../../components/ContributionsWidget'
import {
  GRANT_STATUS_COUNTDOWN_TITLES,
  GRANT_STATUS_COUNTDOWN_TITLES_NON_VOTE,
  GRANT_STATUS_MAP,
  GrantHasVoting,
} from '../../constants'

export const GrantSummary = ({
  grant,
  grantHasVoting,
}: {
  grant: Grant
  grantHasVoting?: boolean
}) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()

  const votingEndDate = grant.statuses.find(
    (s) => s.status === grant.status,
  )?.endAt
  return (
    <CardLayout noborder={isMobile} padding={{ base: '10px', lg: 0 }}>
      {grant.image ? (
        <Box width="100%">
          <Image
            width="100%"
            height="100%"
            objectFit="cover"
            borderTopLeftRadius="6px"
            borderTopRightRadius="6px"
            alt="grant header image"
            src={grant.image}
          />
        </Box>
      ) : null}
      <Box px={{ base: 0, lg: 5 }}>
        <Box pb={2}>
          <StatusLabel textTransform="uppercase">
            {t(GRANT_STATUS_MAP[grant.status])}
          </StatusLabel>
        </Box>

        <Box
          display="flex"
          flexDir={{ base: 'column', lg: 'row' }}
          width="100%"
          pt={2}
          justifyContent="space-between"
        >
          <Box pt={2}>
            <H1>{t(grant.title)}</H1>
          </Box>
        </Box>
        <Box pt={4}>
          <H3 fontSize="18px">{t(grant.shortDescription)}</H3>
          <Body1 fontSize="16px" pt={4}>
            {t(grant.description || '')}
          </Body1>
          <ContributionsWidget
            sponsors={grant.sponsors}
            endDateSubtitle={
              grantHasVoting
                ? t(GRANT_STATUS_COUNTDOWN_TITLES[grant.status])
                : t(GRANT_STATUS_COUNTDOWN_TITLES_NON_VOTE[grant.status])
            }
            endDateTimestamp={votingEndDate}
            balance={getShortAmountLabel(grant.balance || 0, true)}
            hasVoting={GrantHasVoting[grant.name]}
            contributions={getShortAmountLabel(
              grant.applicants.reduce(
                (prev, curr) => prev + (curr?.funding.communityFunding || 0),
                0,
              ) || 0,
              true,
            )}
          />
        </Box>
      </Box>
    </CardLayout>
  )
}
