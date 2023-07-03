import { Box, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { BadgeIcon } from '../../../components/icons/svg/BadgeIcon'
import { ContributionsIcon } from '../../../components/icons/svg/ContributionsIcon'
import { TimerIcon } from '../../../components/icons/svg/TimerIcon'
import { Countdown } from '../../../components/ui/Countdown'
import { fonts } from '../../../styles'
import { Maybe, Sponsor } from '../../../types'
import { SponsorList } from './SponsorList'
import { WidgetItem } from './WidgetItem'

interface Props {
  sponsors?: Maybe<Sponsor>[]
  balance?: string
  contributions?: string
  endDateSubtitle: string
  endDateTimestamp: number
}

export const ContributionsWidget = ({
  sponsors,
  balance,
  contributions,
  endDateTimestamp,
  endDateSubtitle,
}: Props) => {
  const { t } = useTranslation()
  return (
    <Box borderRadius="8px" backgroundColor="neutral.100" pb={4} pt={2} mt={4}>
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-around"
      >
        <Box
          px={2}
          width={{ base: '100%', lg: 'auto' }}
          display="flex"
          alignItems="start"
          justifyContent="center"
          my={2}
        >
          <TimerIcon
            mt={1}
            mr={2}
            width="36px"
            height="100%"
            color="primary.500"
          />
          <WidgetItem subtitle={endDateSubtitle}>
            <Countdown
              endDate={endDateTimestamp}
              sectionProps={{
                color: 'primary.500',
                fontSize: '22px',
                fontWeight: 700,
                fontFamily: fonts.livvic,
              }}
              dividerProps={{
                color: 'neutral.500',
                fontSize: '26px',
                fontWeight: 700,
                fontFamily: fonts.livvic,
              }}
            />
          </WidgetItem>
        </Box>
        <Box px={2} display="flex" alignItems="start" my={2}>
          <BadgeIcon
            mt={1}
            mr={2}
            width="36px"
            height="100%"
            color="primary.500"
          />
          <WidgetItem subtitle={t('Geyser grant')}>{balance}</WidgetItem>
        </Box>
        <Box px={2} display="flex" alignItems="start" my={2}>
          <ContributionsIcon
            mt={1}
            mr={2}
            width="36px"
            height="100%"
            color="primary.500"
          />
          <WidgetItem subtitle={t('Worth of votes')}>
            {contributions}
          </WidgetItem>
        </Box>
      </Box>
      <Box
        mt={{ base: 1, lg: 4 }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <SponsorList sponsors={sponsors}>
          <Text fontSize="18px">{t('Sponsored by')}</Text>
        </SponsorList>
      </Box>
    </Box>
  )
}
