import { HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'
import { Trans } from 'react-i18next'

import { ImageWithReload } from '@/components/ui'
import { RankMedal } from '@/shared/components/display/RankMedal'
import { Body } from '@/shared/components/typography'
import { standardPadding } from '@/shared/styles'
import { useCurrencyFormatter } from '@/shared/utils/hooks'
import { FormatCurrencyType } from '@/shared/utils/hooks/useCurrencyFormatter'
import { LeaderboardPeriod } from '@/types'
import { getShortAmountLabel } from '@/utils'

import { StandardOption } from '../types'
import { TitleWithPeriod } from './TitleWithPeriod'

export enum HeroType {
  Creators = 'Creators',
  Contributors = 'Contributors',
  Ambassadors = 'Ambassadors',
}

const heroName = 'Avery Harlow'
const contributed = 2100000
const contributedUsdCent = 120000
const numberOfContributions = 12
const numberOfProjects = 13

export const TopHeroes = ({ heroType }: { heroType: HeroType }) => {
  const { formatAmount } = useCurrencyFormatter()

  const [period, setPeriod] = useState<LeaderboardPeriod>(LeaderboardPeriod.Month)

  const handlePeriodChange = (selectedOption: StandardOption<LeaderboardPeriod> | null) => {
    if (selectedOption) {
      setPeriod(selectedOption.value)
    }
  }

  return (
    <VStack w="full" flex={1} overflowY={'auto'}>
      <TitleWithPeriod
        title={t('Top Heroes')}
        period={period}
        handlePeriodChange={handlePeriodChange}
        px={standardPadding}
      />
      <VStack w="full" alignItems={'start'} paddingBottom={6}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((key, index) => {
          return (
            <HStack overflow={'hidden'} key={key} width="full" px={standardPadding}>
              <RankMedal rank={index + 1} boxSize={'32px'} size="20px" />
              <ImageWithReload borderRadius={'50%'} height="64px" width="64px" src={''} />
              <VStack w="full" overflow="hidden" flex={1} spacing={0} alignItems="start">
                <Body w="full" bold isTruncated>
                  {heroName}
                </Body>

                <Body size="sm" light isTruncated>
                  <Trans
                    i18nKey={
                      'Contributed <1>{{usdAmount}}</1> ({{satsAmount}} sats) with <3>{{numberOfContributions}}</3> contributions to <5>{{numberOfProjects}}</5> projects'
                    }
                    values={{
                      usdAmount: formatAmount(contributedUsdCent, FormatCurrencyType.Usdcent),
                      satsAmount: getShortAmountLabel(contributed),
                      numberOfContributions,
                      numberOfProjects,
                    }}
                  >
                    {'Contributed '}
                    <Body as="span" medium dark>
                      {'{{usdAmount}}'}
                    </Body>
                    {' ({{satsAmount}} sats) with '}
                    <Body as="span" medium dark>
                      {'{{numberOfContributions}}'}
                    </Body>
                    {' contributions to '}
                    <Body as="span" medium dark>
                      {'{{numberOfProjects}}'}
                    </Body>
                    {' projects'}
                  </Trans>
                </Body>
              </VStack>
            </HStack>
          )
        })}
      </VStack>
    </VStack>
  )
}

// const TopHeroItem = () => {
//     return (

//     )
// }
