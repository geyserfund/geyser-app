import { useQuery } from '@apollo/client'
import { Box, Container, HStack, Stack, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { LetTheSatsFlowIcon } from '../../../components/icons'
import { SkeletonLayout } from '../../../components/layouts'
import { Body2, H3, MonoBody1 } from '../../../components/typography'
import { dimensions } from '../../../constants'
import { QUERY_PROJECTS_SUMMARY } from '../../../graphql'
import { fonts } from '../../../styles'
import {
  getBitcoinAmount,
  getShortAmountLabel,
  toInt,
  useMobileMode,
  useNotification,
} from '../../../utils'
import { BannerBackground } from './BannerBackground'

export const GradientBanner = () => {
  const { t } = useTranslation()
  const { toast } = useNotification()
  const isMobile = useMobileMode()

  const {
    loading: isSummaryLoading,
    error: summaryError,
    data: summaryData,
  } = useQuery(QUERY_PROJECTS_SUMMARY)

  const projectsSummaryData = (summaryData && summaryData.projectsSummary) || {}

  useEffect(() => {
    if (summaryError) {
      toast({
        title: 'Could not load summary data',
        description: 'Please refresh the page',
        status: 'error',
      })
    }
  }, [summaryError])

  const satsDataArray = [
    [projectsSummaryData.projectsCount, 'projects'],
    [projectsSummaryData.fundedTotal, 'bitcoin raised'],
    [projectsSummaryData.fundersCount, 'contributors'],
  ]

  return (
    <VStack width="full" align="center" marginBottom="25px" position="relative">
      <Box w="full" h="full" position="absolute">
        <BannerBackground />
      </Box>
      <Container maxW={'6xl'}>
        <Stack
          fontFamily={fonts.livvic}
          textAlign={'center'}
          align={'center'}
          spacing="17px"
          paddingBottom="12px"
          position="relative"
        >
          <VStack
            spacing={3}
            marginTop={{
              base: `${dimensions.topNavBar.mobile.height + 12}px`,
              lg: `${dimensions.topNavBar.desktop.height - 24}px`,
            }}
            marginBottom={{ base: '70px', lg: '60px' }}
          >
            {/* <Image
              src={LetTheSatsFlowNoNameEdition}
              maxHeight="76px"
              alt="landing-header-image"
            /> */}
            <LetTheSatsFlowIcon color="primary.900" />
          </VStack>

          <VStack
            position="absolute"
            bottom="-20px"
            backgroundColor={'neutral.100'}
            shadow="md"
            padding="10px 20px"
            borderRadius="8px"
            spacing="10px"
            color={'neutral.900'}
          >
            <H3 fontFamily="inherit">
              {t('Play a part in world-changing ideas')} {'!'}
            </H3>
            <HStack fontSize={'sm'} spacing={4}>
              {isSummaryLoading ? (
                <SummarySkeleton />
              ) : (
                satsDataArray.map((statsData, index) => {
                  return (
                    <Stack
                      spacing={isMobile ? 0 : 1.5}
                      key={index}
                      justifyContent="flex-start"
                      alignItems={'center'}
                      direction={isMobile ? 'column' : 'row'}
                    >
                      <MonoBody1 bold marginTop="2px" color="neutral.700">
                        {index === 1
                          ? getBitcoinAmount(toInt(statsData[0]), true)
                          : getShortAmountLabel(toInt(statsData[0]))}
                      </MonoBody1>

                      <Body2 textTransform={'uppercase'} color="neutral.700">
                        {t(statsData[1])}
                      </Body2>
                    </Stack>
                  )
                })
              )}
            </HStack>
          </VStack>
        </Stack>
      </Container>
    </VStack>
  )
}

export const SummarySkeleton = () => {
  const isMobile = useMobileMode()
  return (
    <>
      {[1, 2, 3].map((value) => {
        return (
          <Stack
            spacing={isMobile ? 1 : 1.5}
            key={value}
            justifyContent="flex-start"
            alignItems={'center'}
            direction={isMobile ? 'column' : 'row'}
          >
            <SkeletonLayout width="30px" />
            <SkeletonLayout width="80px" />
          </Stack>
        )
      })}
    </>
  )
}
