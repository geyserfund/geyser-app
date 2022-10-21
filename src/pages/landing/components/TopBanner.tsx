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
import { colors, getPath } from '../../../constants';
import { useNotification } from '../../../utils';
import { ButtonComponent } from '../../../components/ui';
import { ALL_PROJECTS_SUMMARY } from '../../../graphql';
import SatsFlowSVG from '../../../assets/images/let-the-sats-flow.svg';
import { useAuthContext } from '../../../context';

export const TopBanner = () => {
  const { toast } = useNotification();
  const history = useHistory();
  const { isLoggedIn } = useAuthContext();

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
    const routePath = getPath('publicProjectLaunch');

    history.push(routePath);
  };

  return (
    <VStack width="full" align="center" backgroundImage={BannerPattern}>
      <Container maxW={'5xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 6, md: 8 }}
          py={{ base: 6, md: 8 }}
        >
          <VStack spacing={3}>
            <Image src={SatsFlowSVG} maxHeight="76px" />

            <Heading as="h1" fontWeight={'bold'} size="lg" lineHeight={'110%'}>
              Play a part in world-changing ideas by contributing to them and
              launching them on Geyser!
            </Heading>
          </VStack>

          <HStack fontSize={'sm'} spacing={4} textColor={'brand.neutral700'}>
            {[
              [projectsSummaryData.projectsCount, 'Projects'],
              [projectsSummaryData.fundedTotal, 'Sats Raised'],
              [projectsSummaryData.fundersCount, 'Pleb Contributors'],
            ].map((statsData, index) => {
              return (
                <HStack
                  spacing={1.5}
                  key={index}
                  justifyContent="flex-start"
                  alignItems={'center'}
                >
                  {isSummaryLoading ? (
                    <Skeleton w="25px" h="25px" />
                  ) : (
                    <Text fontWeight={'bold'} textColor={colors.neutral900}>
                      {statsData[0]}
                    </Text>
                  )}

                  <Text
                    textColor={colors.neutral700}
                    textTransform={'uppercase'}
                  >
                    {statsData[1]}
                  </Text>
                </HStack>
              );
            })}
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
            Launch Your Project
          </ButtonComponent>
        </Stack>
      </Container>
    </VStack>
  );
};
