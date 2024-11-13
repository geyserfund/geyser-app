import { Button, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { ImageWithReload } from '@/components/ui'
import { RankMedal } from '@/shared/components/display/RankMedal'
import { CardLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { useCurrencyFormatter } from '@/shared/utils/hooks'
import { FormatCurrencyType } from '@/shared/utils/hooks/useCurrencyFormatter'
import { LeaderboardPeriod } from '@/types'
import { getShortAmountLabel } from '@/utils'

import { StandardOption } from '../types'
import { TitleWithPeriod } from './TitleWithPeriod'

const projectTitle =
  'This is the project title, this is what happens when you have a long title that needs to be truncated'
const projectBalance = 2100000
const projectBalanceUsdCent = 120000

export const TopProjects = () => {
  const { formatAmount } = useCurrencyFormatter()

  const [period, setPeriod] = useState<LeaderboardPeriod>(LeaderboardPeriod.Month)

  const handlePeriodChange = (selectedOption: StandardOption<LeaderboardPeriod> | null) => {
    if (selectedOption) {
      setPeriod(selectedOption.value)
    }
  }

  return (
    <VStack w="full">
      <TitleWithPeriod title={t('Top Projects')} period={period} handlePeriodChange={handlePeriodChange} />
      <CardLayout w="full" direction="row" flexWrap={'wrap'}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((key, index) => {
          return (
            <HStack flex={1} overflow={'hidden'} key={key} minWidth={'250px'} maxWidth={{ base: 'full', lg: '335px' }}>
              <RankMedal rank={index + 1} boxSize={'32px'} size="20px" />
              <HStack
                as={Link}
                /** TODO: chaqnge to project id */
                to={getPath('project', '123')}
                flex={1}
                overflow={'hidden'}
                key={key}
                _hover={{ cursor: 'pointer', backgroundColor: 'neutral1.3' }}
                borderRadius="16px"
                paddingRight={2}
              >
                <ImageWithReload borderRadius={'16px'} height="64px" width="64px" src={''} />
                <VStack w="full" overflow="hidden" flex={1} spacing={0} alignItems="start">
                  <Body w="full" bold isTruncated>
                    {projectTitle}
                  </Body>
                  <Body size="sm" medium isTruncated>
                    {`${formatAmount(projectBalanceUsdCent, FormatCurrencyType.Usdcent)} `}
                    <Body as="span" light>{`(${getShortAmountLabel(projectBalance)} sats)`}</Body>
                  </Body>
                </VStack>
              </HStack>
            </HStack>
          )
        })}
      </CardLayout>
      <HStack w="full" justifyContent="center" pt={1}>
        <Button as={Link} to={getPath('hallOfFameProjects')} variant="soft" colorScheme="neutral1">
          {t('See all top projects')}
        </Button>
      </HStack>
    </VStack>
  )
}
