import React, { useEffect } from 'react';
import {
  HStack,
  Text,
  VStack,
  Skeleton,
  Image,
  Container,
  Heading,
  Stack,
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';

import {
  colors,
  LandingBannerPatternUrl,
  LandingLetTheSatsFlowUrl,
} from '../../../constants';
import {
  getShortAmountLabel,
  isMobileMode,
  useNotification,
} from '../../../utils';
import { ALL_PROJECTS_SUMMARY } from '../../../graphql';

export const TopBanner = () => {
  const { toast } = useNotification();
  const isMobile = isMobileMode();

  const {
    loading: isSummaryLoading,
    error: summaryError,
    data: summaryData,
  } = useQuery(ALL_PROJECTS_SUMMARY);

  const projectsSummaryData =
    (summaryData && summaryData.projectsSummary) || {};

  useEffect(() => {
    if (summaryError) {
      toast({
        title: 'Could not load summary data',
        description: 'Please refresh the page',
        status: 'error',
      });
    }
  }, [summaryError]);

  const satsDataArray = [
    [
      projectsSummaryData.projectsCount &&
        projectsSummaryData.projectsCount.toLocaleString(),
      'Projects',
    ],
    [
      projectsSummaryData.fundedTotal &&
        projectsSummaryData.fundedTotal.toLocaleString(),
      'Sats Raised',
    ],
    [
      projectsSummaryData.fundersCount &&
        projectsSummaryData.fundersCount.toLocaleString(),
      'Pleb Contributors',
    ],
  ];

  return (
    <VStack
      width="full"
      align="center"
      backgroundImage={LandingBannerPatternUrl}
    >
      <Container maxW={'5xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 6, md: 8 }}
          py={{ base: 6, md: 8 }}
        >
          <VStack spacing={3}>
            <Image src={LandingLetTheSatsFlowUrl} maxHeight="76px" />

            <Heading as="h1" fontWeight={'bold'} size="lg" lineHeight={'110%'}>
              Play a part in world-changing ideas by contributing to them and
              launching them on Geyser!
            </Heading>
          </VStack>

          <HStack
            fontSize={'sm'}
            spacing={4}
            textColor={'brand.neutral700'}
            backgroundColor={colors.bgWhite}
            padding="5px 10px"
            borderRadius="4px"
            shadow="md"
          >
            {isSummaryLoading ? (
              <HStack
                spacing={1.5}
                justifyContent="flex-start"
                alignItems={'center'}
              >
                <Skeleton w="25px" h="25px" />
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
                );
              })
            )}
          </HStack>
        </Stack>
      </Container>
    </VStack>
  );
};
