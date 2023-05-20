import { Box, Text } from '@chakra-ui/react'
import { createUseStyles } from 'react-jss'

import { BadgeIcon } from '../../../components/icons/svg/BadgeIcon'
import { ContributionsIcon } from '../../../components/icons/svg/ContributionsIcon'
import { TimerIcon } from '../../../components/icons/svg/TimerIcon'
import { Countdown } from '../../../components/ui/Countdown'
import { colors, fonts } from '../../../styles'
import { Maybe, Sponsor } from '../../../types'
import { useMobileMode } from '../../../utils'
import { SponsorList } from './SponsorList'
import { WidgetItem } from './WidgetItem'

interface Props {
  sponsors?: Maybe<Sponsor>[]
  balance?: string
  contributions?: string
  endDateSubtitle: string
  endDateTimestamp: number
}

const useStyles = createUseStyles({
  container: {
    borderRadius: '8px',
    backgroundColor: colors.gray2,
  },
})

export const ContributionsWidget = ({
  sponsors,
  balance,
  contributions,
  endDateTimestamp,
  endDateSubtitle,
}: Props) => {
  const classes = useStyles()
  const isMobile = useMobileMode()

  return (
    <Box className={classes.container} pb={4} pt={2} mt={4}>
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-around"
      >
        <Box
          px={2}
          width={isMobile ? '100%' : undefined}
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
          <WidgetItem subtitle="Geyser grant">{balance}</WidgetItem>
        </Box>
        <Box px={2} display="flex" alignItems="start" my={2}>
          <ContributionsIcon
            mt={1}
            mr={2}
            width="36px"
            height="100%"
            color="primary.500"
          />
          <WidgetItem subtitle="Worth of votes">{contributions}</WidgetItem>
        </Box>
      </Box>
      <Box
        mt={isMobile ? 1 : 4}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <SponsorList sponsors={sponsors}>
          <Text fontSize="18px">Sponsored by</Text>
        </SponsorList>
      </Box>
    </Box>
  )
}
