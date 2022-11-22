import React, { useEffect } from 'react';
import { Box, Button, Grid, GridItem, Text } from '@chakra-ui/react';
import { isMobileMode } from '../../utils';
import satsymbol from '../../assets/satsymbolprimary.svg';
import { fonts } from '../../constants/fonts';
import { FaArrowLeft } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { useNotification } from '../../utils';

import { ApplyGrantCard } from './components/ApplyGrantCard';
import { BoardMembers } from './components/BoardMembers';
import satwalletimg from '../../assets/walletsats.svg';
import { MoreInfo } from './components/MoreInfo';
import { AppFooter } from '../../components/molecules';
import { ContributeModal } from './components/ContributeModal';
import granthero from '../../assets/granthero.svg';
import { projectTypes } from '../../constants';
import { useQuery } from '@apollo/client';
import { QUERY_GRANTS } from '../../graphql';
import { GrantCard } from './components/GrantCard';
import { Project, ProjectsGetQueryInput } from '../../types/generated/graphql';

const grantx = [
  {
    name: 'Bitcoin for Free Speech',
    applicants: 0,
    about: '',
  },
  {
    name: 'Visual Artists for Bitcoin',
    applicants: 0,
    about: '',
  },
  {
    name: 'Bitcoin Open Source',
    applicants: 0,
    about: '',
  },
];
type ResponseData = {
  projects: {
    projects: Project[];
  };
};

type QueryVariables = {
  input: ProjectsGetQueryInput;
};

export const GrantsRoundOne = () => {
  const isMobile = isMobileMode();
  const history = useHistory();
  const { toast } = useNotification();
  const [link, setLink] = React.useState('');

  const linkHandler = (link) => {
    setLink(link);
  };

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
        bg={'brand.bgGrey4'}
        minHeight="100vh"
        display="flex"
        alignItems={'center'}
        flexDirection="column"
      >
        <Box
          my={5}
          width={isMobile ? '100%' : '909px'}
          px={isMobile ? '1rem' : ''}
        >
          <Button
            size={'sm'}
            bg="brand.bgWhite"
            variant={'outline'}
            gap={2}
            onClick={() => history.goBack()}
            fontSize="sm"
          >
            <FaArrowLeft /> See all Grants
          </Button>
          <Text
            fontSize={isMobile ? '4xl' : '47px'}
            fontWeight="medium"
            textAlign="center"
          >
            🧊
          </Text>
          <Text
            fontSize={'27px'}
            fontWeight="900"
            textAlign="center"
            fontFamily={fonts.livvic}
            textShadow={' 0px 0px 25.7663px rgba(22, 232, 194, 0.11)'}
            color={'brand.primary500'}
          >
            Geyser Grants
          </Text>
          <Box
            display="flex"
            alignItems={'center'}
            justifyContent="center"
            gap={4}
          >
            <Text
              fontFamily={fonts.interBlack}
              fontSize={isMobile ? '30' : '35px'}
              fontWeight="700"
              textAlign="center"
              justify="center"
            >
              Round 1
            </Text>
          </Box>
          <Box display="flex" justifyContent={'center'} my="2" rounded={'sm'}>
            <Text
              bg="brand.neutral200"
              px={'3'}
              py="2"
              fontWeight={'500'}
              fontSize="14px"
            >
              CLOSED
            </Text>
          </Box>
          <Text
            fontSize={isMobile ? '15px' : '16px'}
            fontWeight="500"
            color={'brand.neutral600'}
            textAlign="center"
            justify="center"
          >
            Funding educators, creatives and builders doing Bitcoin-only
            projects on Geyser.{isMobile ? '' : <br />} Funded by bitcoin
            sponsors who want to change the world for the better.
          </Text>
          <Box display="flex" flexDirection={'column'} alignItems="center">
            <Box color={'brand.primary500'} my={8}>
              <Box>
                <img src={granthero} />
              </Box>
            </Box>

            <Grid
              templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
              gap={6}
              minWidth="100%"
              mt={8}
            >
              {grants.map((item) => (
                <GridItem w={'100%'} key={item.name}>
                  <ApplyGrantCard
                    name={item.name}
                    applicant={item.applicants}
                  />
                </GridItem>
              ))}
            </Grid>
          </Box>
          <Box my={8}>
            <Text
              fontFamily={fonts.interBlack}
              fontSize="24px"
              fontWeight={'bold'}
            >
              Principled Bitcoiners Board
            </Text>
            <Text color={'brand.neutral600'} fontWeight="600">
              The baord will be responsible for reviewing and evaluating the
              applications.
            </Text>
          </Box>
          <BoardMembers />
          <Box my={8}>
            <Text
              fontFamily={fonts.interBlack}
              fontSize="24px"
              fontWeight={'bold'}
            >
              Made possible by sponsors
            </Text>
            <Text color={'brand.neutral600'} fontWeight="600">
              Bitcoin companies and anon individuals that want to bring hope to
              the world.
            </Text>
          </Box>
          <Box
            border={'2px solid #E9ECEF'}
            borderRadius="12px"
            pb={4}
            pt={6}
            bg="brand.bgWhite"
            mt={8}
            mb={3}
            px={4}
            width={isMobile ? '100%' : '909px'}
            display="flex"
            flexDirection={'column'}
            justifyContent="center"
            alignItems={'center'}
          >
            <Box mr={6} display="flex" alignItems={'center'} gap={4} my={4}>
              <img src={satwalletimg} width="195px" />

              <>
                {typeof link === 'string' && link.trim().length === 0 ? (
                  <Box display="flex" alignItems={'center'} gap={4}>
                    {[1, 2].map((item) => (
                      <Box
                        height={'34px'}
                        rounded="full"
                        bg="brand.neutral200"
                        width={'138px'}
                        key={item}
                      ></Box>
                    ))}
                  </Box>
                ) : (
                  <img src={link} width="100px" />
                )}
              </>
            </Box>

            <Box display="flex" alignItems={'center'} mt={2}>
              <Box
                display="flex"
                alignItems={'center'}
                mt="3"
                flexDirection={isMobile ? 'column' : 'row'}
              >
                <ContributeModal onLink={linkHandler} />

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
              </Box>
            </Box>
          </Box>
          <MoreInfo />
          <Box
            border={'2px solid #E9ECEF'}
            minWidth="100%"
            p="2"
            rounded={'md'}
            minHeight={'300px'}
          >
            <Text
              fontWeight={'bold'}
              fontSize="large"
              mt={'2'}
              fontFamily={fonts.interBlack}
            >
              Applications
            </Text>
            <Box>
              <iframe
                className="airtable-embed"
                src="https://airtable.com/embed/shrfeI21FWzyCqHZy?backgroundColor=teal"
                frameBorder="0"
                width="100%"
                height="533"
              ></iframe>
            </Box>
          </Box>
        </Box>
        <AppFooter />
      </Box>
    </>
  );
};
