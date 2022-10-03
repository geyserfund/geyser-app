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
import { useHistory } from 'react-router';
import { useQuery } from '@apollo/client';

import BannerPattern from '../../../assets/banner-pattern.png';
import { colors } from '../../../constants';
import { useNotification } from '../../../utils';
import { ButtonComponent } from '../../../components/ui';
import { ALL_PROJECTS_SUMMARY } from '../../../graphql';
import SatsFlowSVG from '../../../assets/images/let-the-sats-flow.svg';

export const TopBanner = () => {
  const { toast } = useNotification();
  const history = useHistory();

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

  const handleLaunch = () => {
    history.push('/launch');
  };

  return (
    <VStack width="full" align="center" backgroundImage={BannerPattern}>
      <Container maxW={'5xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 6, md: 8 }}
          py={{ base: 8, md: 12 }}
        >
          <VStack spacing={3}>
            <Image src={SatsFlowSVG} maxHeight="80px" />

            <Heading as="h1" fontWeight={600} size="xl" lineHeight={'110%'}>
              Play a part in world-changing ideas by contributing to them and
              launching them on Geyser!
            </Heading>
          </VStack>

          <HStack fontSize={'md'} spacing={4}>
            <HStack spacing={2}>
              {isSummaryLoading ? (
                <Skeleton w="25px" h="25px" />
              ) : (
                <Text fontWeight={'bold'} textColor={colors.neutral900}>
                  {projectsSummaryData.projectsCount}
                </Text>
              )}
              <Text
                textAlign={'start'}
                textColor={colors.neutral700}
                fontSize="md"
                textTransform={'uppercase'}
              >
                Projects
              </Text>
            </HStack>

            <HStack spacing={2}>
              {isSummaryLoading ? (
                <Skeleton w="25px" h="25px" />
              ) : (
                <Text fontWeight={'bold'} textColor={colors.neutral900}>
                  {projectsSummaryData.fundedTotal}
                </Text>
              )}
              <Text
                textAlign={'start'}
                textColor={colors.neutral700}
                fontSize="md"
                textTransform={'uppercase'}
              >
                Sats Raised
              </Text>
            </HStack>

            <HStack spacing={2}>
              {isSummaryLoading ? (
                <Skeleton w="25px" h="25px" />
              ) : (
                <Text fontWeight={'bold'} textColor={colors.neutral900}>
                  {projectsSummaryData.fundersCount}
                </Text>
              )}
              <Text
                textAlign={'start'}
                textColor={colors.neutral700}
                fontSize="md"
                textTransform={'uppercase'}
              >
                Pleb Contributors
              </Text>
            </HStack>
          </HStack>

          {/* TODO: Make this the basis for a re-useable "Primary"/CTA button component */}
          <ButtonComponent
            primary
            width={300}
            onClick={handleLaunch}
            fontSize="16px"
            bg={'primary400'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'brand.primaryTint',
            }}
            _focus={{
              bg: 'brand.primaryTint',
            }}
          >
            🚀 Launch Your Project
          </ButtonComponent>
        </Stack>
      </Container>
    </VStack>
  );
};
