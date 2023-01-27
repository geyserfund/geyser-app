import { useQuery } from '@apollo/client'
import {
  Container,
  HStack,
  Image,
  Skeleton,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useEffect } from 'react'

import { H2, H3 } from '../../../components/typography'
import Loader from '../../../components/ui/Loader'
import {
  LandingBannerPatternUrl,
  LandingLetTheSatsFlowUrl,
} from '../../../constants'
import { ALL_PROJECTS_SUMMARY } from '../../../graphql'
import { colors } from '../../../styles'
import {
  getShortAmountLabel,
  useMobileMode,
  useNotification,
} from '../../../utils'

export const TopBanner = () => {
  const { toast } = useNotification()
  const isMobile = useMobileMode()

  const {
    loading: isSummaryLoading,
    error: summaryError,
    data: summaryData,
  } = useQuery(ALL_PROJECTS_SUMMARY)

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
    [projectsSummaryData.projectsCount, 'Projects'],
    [projectsSummaryData.fundedTotal, 'Sats Raised'],
    [projectsSummaryData.fundersCount, 'Pleb Contributors'],
  ]

  return (
    <VStack
      width="full"
      align="center"
      backgroundImage={LandingBannerPatternUrl}
    >
      <Container maxW={'6xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 6, md: 8 }}
          py={{ base: 6, md: 8 }}
        >
          <VStack spacing={3}>
            <Image src={LandingLetTheSatsFlowUrl} maxHeight="76px" />

            <H2>
              Play a part in world-changing ideas by contributing to them and
              launching them on Geyser!
            </H2>
            <H3>
              Support the creators of the new digital economy & Launch your
              project ideas in just a few clicks to start receiving Sats!
            </H3>
          </VStack>

          <HStack
            fontSize={'sm'}
            spacing={4}
            textColor={'brand.neutral700'}
            backgroundColor={colors.bgWhite}
            padding="5px 15px"
            borderRadius="4px"
            shadow="md"
          >
            {isSummaryLoading ? (
              <HStack
                spacing={1.5}
                justifyContent="flex-start"
                alignItems={'center'}
              >
                <Loader size="md" />
              </HStack>
            ) : (
              satsDataArray.map((statsData, index) => {
                return (
                  <Stack
                    spacing={1.5}
                    key={index}
                    justifyContent="flex-start"
                    alignItems={'center'}
                    direction={isMobile ? 'column' : 'row'}
                  >
                    {isSummaryLoading ? (
                      <Skeleton w="25px" h="25px" />
                    ) : (
                      <Text fontWeight={'bold'} textColor={colors.neutral900}>
                        {getShortAmountLabel(parseInt(statsData[0], 10))}
                      </Text>
                    )}

                    <Text
                      textColor={colors.neutral700}
                      textTransform={'uppercase'}
                    >
                      {statsData[1]}
                    </Text>
                  </Stack>
                )
              })
            )}
          </HStack>
        </Stack>
      </Container>
    </VStack>
  )
}
