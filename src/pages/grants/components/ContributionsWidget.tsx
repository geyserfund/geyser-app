import { Box, Text } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { createUseStyles } from 'react-jss'

import { BadgeIcon } from '../../../components/icons/svg/BadgeIcon'
import { ContributionsIcon } from '../../../components/icons/svg/ContributionsIcon'
import { GeyserLogoNameIcon } from '../../../components/icons/svg/GeyserLogoNameIcon'
import { TimerIcon } from '../../../components/icons/svg/TimerIcon'
import { Countdown } from '../../../components/ui/Countdown'
import { colors, fonts } from '../../../styles'
import { useMobileMode } from '../../../utils'
import { WidgetItem } from './WidgetItem'

interface Props {
  balance: string
  contributions: string
}

const useStyles = createUseStyles({
  container: {
    borderRadius: '8px',
    backgroundColor: colors.gray2,
  },
})

export const ContributionsWidget = ({ balance, contributions }: Props) => {
  const classes = useStyles()
  const isMobile = useMobileMode()

  return (
    <Box className={classes.container} pb={4} pt={2} mt={4}>
      <Box
        display="flex"
        flexDir={isMobile ? 'column' : 'row'}
        alignItems="center"
        justifyContent="space-around"
      >
        <Box display="flex" alignItems="start" my={2}>
          <TimerIcon
            mt={1}
            mr={2}
            width="36px"
            height="100%"
            color="brand.primary500"
          />
          <WidgetItem subtitle="Time left to vote">
            <Countdown
              endDate={DateTime.fromObject({ year: 2023, month: 4 }).toMillis()}
              sectionProps={{
                color: colors.primary500,
                fontSize: '22px',
                fontWeight: 700,
                fontFamily: fonts.livvic,
              }}
              dividerProps={{
                color: colors.neutral500,
                fontSize: '26px',
                fontWeight: 700,
                fontFamily: fonts.livvic,
              }}
            />
          </WidgetItem>
        </Box>
        <Box display="flex" alignItems="start" my={2}>
          <BadgeIcon
            mt={1}
            mr={2}
            width="36px"
            height="100%"
            color="brand.primary500"
          />
          <WidgetItem subtitle="Geyser grant">{balance}</WidgetItem>
        </Box>
        <Box display="flex" alignItems="start" my={2}>
          <ContributionsIcon
            mt={1}
            mr={2}
            width="36px"
            height="100%"
            color="brand.primary500"
          />
          <WidgetItem subtitle="Worth of votes">{balance}</WidgetItem>
        </Box>
      </Box>
      <Box
        mt={isMobile ? 1 : 4}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="18px">Sponsored by</Text>
        <GeyserLogoNameIcon
          ml={2}
          color={colors.neutral900}
          width="82px"
          height="26px"
        />
      </Box>
    </Box>
  )
}
