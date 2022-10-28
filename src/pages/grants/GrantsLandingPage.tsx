/* eslint-disable complexity */
import React, { useEffect } from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { useTheme } from '@chakra-ui/react';
import { isMobileMode, isMediumScreen, useNotification } from '../../utils';
import { QUERY_GRANTS } from '../../graphql';
import GrantsHeader from '../../assets/grants-header.webp';
import shareicon from '../../assets/shareico.svg';
import { fonts } from '../../constants/fonts';
import borderimg from '../../assets/border.svg';
import satwalletimg from '../../assets/walletsats.svg';

import { projectTypes } from '../../constants';
import { Project, ProjectsGetQueryInput } from '../../types/generated/graphql';
import { ListText } from './components/ListText';
import { CustomGrantCard } from './components/CustomGrantCard';
import { GrantFooter } from './components/GrantFooter';

type ResponseData = {
  projects: {
    projects: Project[];
  };
};

type QueryVariables = {
  input: ProjectsGetQueryInput;
};

export const GrantsLandingPage = () => {
  const isMobile = isMobileMode();
  const isMedium = isMediumScreen();
  const { toast } = useNotification();
  const theme = useTheme();

  const { loading, error, data } = useQuery<ResponseData, QueryVariables>(
    QUERY_GRANTS,
    {
      variables: { input: { where: { type: projectTypes.grant } } },
    },
  );

  // const grants = (data && data.projects.projects) || [];
  const grants = data?.projects.projects || [];

  useEffect(() => {
    if (error) {
      toast({
        title: 'Could not load projects',
        description: 'Please refresh the page',
        status: 'error',
      });
    }
  }, [error]);

  const grantsSort = (grantA: Project) => {
    if (grantA.name === 'bitcoineducation') {
      return -1;
    }

    return 0;
  };

  const grantsSorted = [...grants].sort(grantsSort);

  return (
    <>
      <Box
        paddingTop={isMobile ? '81px' : '91px'}
        bg={theme.colors.brand.bgGrey4}
        minHeight="100vh"
      >
        <Box my={5}>
          <Text
            fontSize={isMobile ? '4xl' : '48px'}
            fontWeight="medium"
            textAlign="center"
          >
            🥳
          </Text>
          <Text
            fontSize={'27px'}
            fontWeight="bold"
            textAlign="center"
            textShadow={' 0px 0px 25.7663px rgba(22, 232, 194, 0.11)'}
            color={theme.colors.brand.primary500}
          >
            Geyser Grants
          </Text>
          <Text
            fontFamily={fonts.interBlack}
            fontSize={isMobile ? '35' : '44px'}
            fontWeight="700"
            textAlign="center"
            justify="center"
          >
            Empowering{isMobile ? <br /> : null} bitcoin creators
          </Text>
          <Text
            fontSize={isMobile ? '15px' : '16px'}
            fontWeight="500"
            color={theme.colors.brand.neutral600}
            textAlign="center"
            justify="center"
          >
            Funding educators, creatives and builders doing Bitcoin-only
            projects on Geyser. {isMobile ? <br /> : <br />} Funded by
            bitcoiners who want to change{isMobile ? <br /> : ''} the world.
          </Text>
          <Box
            display="flex"
            justifyContent={'center'}
            alignItems="center"
            flexDirection="column"
          >
            <Box
              border={'2px solid #E9ECEF'}
              borderRadius="12px"
              pb={4}
              pt={6}
              bg="brand.bgWhite"
              mt={6}
              px={4}
              width={isMobile ? '100%' : '909px'}
              display="flex"
              flexDirection={'column'}
              justifyContent="center"
              alignItems={'center'}
            >
              <Box display="flex" alignItems={'center'}>
                <Box mr={6}>
                  <ListText
                    title="351 M"
                    subtitle="GRANT CONTRIBUTIONS "
                    isSatLogo={true}
                  />
                </Box>
                <ListText
                  title="100 M"
                  subtitle="GRANTS DISTRIBUTED"
                  isSatLogo={true}
                />
              </Box>
              <Box
                display="flex"
                alignItems={'center'}
                mt="6"
                flexDirection={isMobile ? 'column' : 'row'}
              >
                <Button
                  variant={'solid'}
                  fontSize="sm"
                  px={10}
                  mr="2"
                  backgroundColor="brand.primary400"
                >
                  Contribute
                </Button>
                {isMobile ? (
                  <Text
                    fontSize={'13px'}
                    fontWeight="500"
                    mt={3}
                    color="brand.neutral600"
                  >
                    Contribute to the Bitcoin ecosystem by becoming a Geyser
                    Grants sponsor. You can also easily contribute by sending or
                    streaming recurring payments to
                    <Text
                      variant="span"
                      decoration={'underline'}
                      color="brand.primary"
                    >
                      {' '}
                      <a href="">grants@geyser.fund.</a>
                    </Text>
                  </Text>
                ) : (
                  <Box display="flex" alignItems={'center'}>
                    <Text
                      fontSize={'13px'}
                      fontWeight="500"
                      mr={1}
                      color="brand.neutral600"
                    >
                      Or sending SATs to our lightning address:{' '}
                    </Text>
                    <Text decoration={'underline'} color="brand.primary">
                      {' '}
                      <a href="">grants@geyser.fund.</a>
                    </Text>
                  </Box>
                )}
              </Box>
            </Box>
            <Box width={isMobile ? '100%' : '909px'} mt="4">
              <Box>
                <Text
                  fontWeight={'bold'}
                  fontSize="19px"
                  mb={1}
                  fontFamily={fonts.interBlack}
                >
                  Latest Grant
                </Text>
                <CustomGrantCard
                  showBanner={true}
                  status={true}
                  title="Geyser Grants Round 2"
                  date="DEC 2022"
                  to={''}
                  sponsors={[satwalletimg, borderimg]}
                />
              </Box>
              <Box mt={7}>
                <Text
                  fontWeight={'bold'}
                  fontSize="19px"
                  mb={1}
                  fontFamily={fonts.interBlack}
                >
                  Previous Grant
                </Text>
                <CustomGrantCard
                  showBanner={false}
                  status={false}
                  title="Geyser Grants Round 1"
                  date="AUG 2022"
                  to={''}
                  sponsors={[borderimg, satwalletimg]}
                />
              </Box>
              <Box mt={4}>
                <Text
                  fontWeight={'bold'}
                  fontSize="large"
                  fontFamily={fonts.interBlack}
                >
                  More Information
                </Text>
                <Text
                  mt={5}
                  color="brand.neutral600"
                  justify="center"
                  fontSize={'14px'}
                >
                  Bitcoin is signal, everything else is noise. We created Geyser
                  Grants to help broadcast more Bitcoin signal into the world.
                  That is, to accelerate the growth of the Bitcoin ecosystem by
                  increasing Bitcoin awarenes, enabling Bitcoin culture, and
                  supporting needed development. Through these grants we will be
                  supporting Bitcoin educators, developers, entrepreneurs and
                  creatives with the resources they need to bootstrap their
                  initiatives. We accept Bitcoin contributions for each
                  individual grant and take no fees at this stage. When the
                  Round goes live applications will be opened, and they will be
                  evaluated once the Rounds close. Grants will be given away as
                  soon as the goal is reached. For more information see this
                  doc.
                </Text>
                <Box w={20} mt="4" mb={10}>
                  <Box
                    boxShadow="lg"
                    px="4"
                    gap={4}
                    py={'2'}
                    alignItems="center"
                    display="flex"
                  >
                    <Text fontWeight={'600'}>Faq</Text>
                    <img src={shareicon} alt="icon" />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <GrantFooter />
      </Box>
    </>
  );
};
