import { useQuery } from '@apollo/client'
import {
  Container,
  HStack,
  Image,
  Skeleton,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { useEffect } from 'react'

import BannerGlowImage from '../../../assets/bannerGlow.svg'
import { Body2, MonoBody1 } from '../../../components/typography'
import Loader from '../../../components/ui/Loader'
import { dimensions, LetTheSatsFlow3DUrl } from '../../../constants'
import { ALL_PROJECTS_SUMMARY } from '../../../graphql'
import { colors } from '../../../styles'
import {
  getShortAmountLabel,
  useMobileMode,
  useNotification,
} from '../../../utils'

export const GradientBanner = () => {
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
      backgroundImage={BannerGlowImage}
      backgroundSize="contain"
    >
      <Container maxW={'6xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing="17px"
          paddingBottom="12px"
        >
          <VStack
            spacing={3}
            marginTop={`${dimensions.topNavBar.desktop.height - 10}px`}
          >
            <Image src={LetTheSatsFlow3DUrl} maxHeight="76px" />
          </VStack>

          <HStack
            fontSize={'sm'}
            spacing={4}
            textColor={'brand.neutral700'}
            backgroundColor={'brand.primary100'}
            boxShadow="0px 0px 8.11659px rgba(0, 0, 0, 0.1)"
            padding="5px 15px"
            borderRadius="8px"
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
                    spacing={isMobile ? 0 : 1.5}
                    key={index}
                    justifyContent="flex-start"
                    alignItems={'center'}
                    direction={isMobile ? 'column' : 'row'}
                  >
                    {isSummaryLoading ? (
                      <Skeleton w="25px" h="25px" />
                    ) : (
                      <MonoBody1
                        bold
                        textColor={colors.neutral600}
                        marginTop="2px"
                      >
                        {getShortAmountLabel(parseInt(statsData[0], 10))}
                      </MonoBody1>
                    )}

                    <Body2
                      textColor={colors.neutral600}
                      textTransform={'uppercase'}
                    >
                      {statsData[1]}
                    </Body2>
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
