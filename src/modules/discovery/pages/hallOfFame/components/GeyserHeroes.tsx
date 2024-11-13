import { Button, HStack, Stack, VStack } from '@chakra-ui/react'
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

export const GeyserHeroes = () => {
  const [period, setPeriod] = useState<LeaderboardPeriod>(LeaderboardPeriod.Month)

  const handlePeriodChange = (selectedOption: StandardOption<LeaderboardPeriod> | null) => {
    if (selectedOption) {
      setPeriod(selectedOption.value)
    }
  }

  return (
    <VStack w="full">
      <TitleWithPeriod title={t('Geyser Heroes')} period={period} handlePeriodChange={handlePeriodChange} />
      <Stack direction={{ base: 'column', lg: 'row' }} w="full" alignItems={'start'} spacing={4}>
        <HeroSectionWrapper title={t('Creators')} description="Pioneer of groundbreaking projects">
          <RenderHeroList />
        </HeroSectionWrapper>
        <HeroSectionWrapper title={t('Contributors')} description="Champion who empowers projects">
          <RenderHeroList />
        </HeroSectionWrapper>
        <HeroSectionWrapper title={t('Ambassadors')} description="Catalyst expanding project reach">
          <RenderHeroList />
        </HeroSectionWrapper>
      </Stack>
      <HStack w="full" justifyContent="center" pt={1}>
        <Button as={Link} to={getPath('hallOfFameHeroesContributor')} variant="soft" colorScheme="neutral1">
          {t('See all Geyser Heroes')}
        </Button>
      </HStack>
    </VStack>
  )
}

const HeroSectionWrapper = ({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) => {
  return (
    <CardLayout w="full" flex={1} h="full" dense paddingY={4}>
      <VStack w="full" alignItems={'start'} paddingX={4}>
        <Body size="xl" light bold>
          {title}
        </Body>
        <Body size="sm light">{description}</Body>
      </VStack>
      {children}
    </CardLayout>
  )
}

const RenderHeroList = () => {
  const { formatAmount } = useCurrencyFormatter()
  return (
    <VStack w="full" alignItems={'start'}>
      {[1, 2, 3, 4, 5, 6].map((key, index) => {
        return (
          <HStack
            as={Link}
            to={getPath('userProfile', '123')}
            paddingX={4}
            w="full"
            flex={1}
            overflow={'hidden'}
            key={key}
            minWidth={'250px'}
            maxWidth={'335px'}
            _hover={{ cursor: 'pointer', backgroundColor: 'neutral1.3' }}
          >
            <RankMedal rank={index + 1} />
            <ImageWithReload borderRadius={'50%'} height="40px" width="40px" src={''} />
            <VStack w="full" overflow="hidden" flex={1} spacing={0} alignItems="start">
              <Body w="full" bold isTruncated>
                Avery Harlow
              </Body>
              <Body size="xs" medium isTruncated>
                {`${formatAmount(1200, FormatCurrencyType.Usdcent)} `}
                <Body as="span" light>{`(${getShortAmountLabel(2100000)} sats)`}</Body>
              </Body>
            </VStack>
          </HStack>
        )
      })}
    </VStack>
  )
}
