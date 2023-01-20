/* eslint-disable complexity */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  HStack,
  Image,
  VStack,
  Link,
  Skeleton,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';

import { AppFooter } from '../../components/molecules';
import { InfoTooltip } from '../../components/ui';
import { SatoshiIconTilted } from '../../components/icons';
import { isActive, isMediumScreen, isMobileMode } from '../../utils';
import { Subscribe } from '../../components/nav/Subscribe';
import { RecipientButton } from './components/RecipientButton';
import { ContributeButton } from './components/ContributeButton';
import { Board } from './components/Board';
import { REACT_APP_AIR_TABLE_KEY } from '../../constants';
import { createUseStyles } from 'react-jss';
import { Project } from '../../types/generated/graphql';

const useStyles = createUseStyles({
  iframe: {
    background: 'transparent',
    border: '1px solid #ccc',
  },
});

export const Grants = ({ project }: { project: Project }) => {
  const [applicants, setApplicants] = useState(['loading']);
  const classes = useStyles();

  const getGrantApplicants = async () => {
    fetch(
      'https://api.airtable.com/v0/appyM7XlNIWVypuP5/tblwlFBSxMvV0JhzU?fields%5B%5D=Grant',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${REACT_APP_AIR_TABLE_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        const applications = data.records
          ? data.records?.filter(
              (applicant: any) => applicant.fields.Grant === project.title,
            )
          : [];
        setApplicants(applications);
      });
  };

  useEffect(() => {
    getGrantApplicants();
  }, []);

  const isMedium = isMediumScreen();
  const isMobile = isMobileMode();

  return (
    <>
      <Box
        py={isMedium ? 10 : 20}
        w={isMedium ? 'auto' : '900px'}
        margin="0 auto"
      >
        <Box display={isMedium ? 'block' : 'flex'} justifyContent="center">
          <Box w={isMedium ? '100%' : '450px'}>
            <Text
              fontSize="4xl"
              fontWeight="bold"
              textAlign={isMedium ? 'center' : 'left'}
            >
              {project.title}
            </Text>
            <Text
              fontSize="xl"
              color="#6E6E6E"
              fontWeight="bold"
              textAlign={isMedium ? 'center' : 'left'}
            >
              ROUND 1: JULY 1-31
            </Text>
            <Image
              w={isMobile ? '300px' : '375px'}
              rounded="md"
              src={project.image || ''}
              alt="grant"
              margin={isMedium ? '0 auto' : ''}
            />
          </Box>

          <Box
            w={isMobile ? '100%' : isMedium ? '50%' : '450px'}
            margin={isMedium ? '10px auto' : ''}
          >
            <Text
              fontSize="lg"
              textAlign="justify"
              my={isMobile ? 2 : 0}
              mx={isMobile ? 5 : 0}
            >
              <ReactMarkdown>{project.description}</ReactMarkdown>
              For more information, see{' '}
              <Link
                textDecoration="underline"
                href="https://geyser.notion.site/Geyser-Grants-Applicants-fad8a130545d4597a3750a17a7ce301f"
              >
                here
              </Link>
              .
            </Text>
            <Box
              boxShadow="0px 0px 10px rgba(0, 0, 0, 0.08)"
              rounded="lg"
              p={6}
              mt={6}
            >
              <Box display="flex" justifyContent="end">
                <InfoTooltip
                  title="ROUND 1 APPLICATIONS CLOSED"
                  description="Check back for future Geyser Grants!"
                  options={{ top: '-83px', left: '-140px' }}
                  width="170px"
                />
              </Box>
              <HStack
                justifyContent="center"
                spacing="21px"
                alignItems="center"
                my={3}
              >
                <Box>
                  <HStack
                    justifyContent="center"
                    alignItems="center"
                    spacing="2px"
                  >
                    <SatoshiIconTilted scale={0.8} />
                    <Text fontWeight="bold" fontSize="lg">
                      {(project.balance / 1000000).toFixed(
                        project.balance === 0 ? 0 : 1,
                      )}{' '}
                      M
                    </Text>
                  </HStack>
                  <Text fontSize="sm" color="#5B5B5B" fontWeight="bold">
                    CONTRIBUTED
                  </Text>
                </Box>

                <Box>
                  <HStack justifyContent="center" spacing="2px">
                    <SatoshiIconTilted scale={0.8} />
                    <Text fontWeight="bold" fontSize="lg">
                      {project.name === 'bitcoineducation'
                        ? (0 / 1000000).toFixed(0)
                        : project.name === 'bitcoinbuilders'
                        ? (0 / 1000000).toFixed(0)
                        : project.name === 'bitcoinculture'
                        ? (0 / 1000000).toFixed(0)
                        : ''}{' '}
                      M
                    </Text>
                  </HStack>
                  <Text fontSize="sm" color="#5B5B5B" fontWeight="bold">
                    DISTRIBUTED
                  </Text>
                </Box>

                <Box>
                  {applicants && applicants[0] === 'loading' ? (
                    <Skeleton w="89px" h="25px" />
                  ) : (
                    <Text fontWeight="bold" textAlign="center" fontSize="lg">
                      {applicants.length}
                    </Text>
                  )}
                  <Text fontSize="sm" color="#5B5B5B" fontWeight="bold">
                    APPLICANTS
                  </Text>
                </Box>
              </HStack>
              <Box display="flex" justifyContent="center">
                <RecipientButton
                  active={false}
                  title="Apply"
                  grant={project.title}
                  image={project.image}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          display={isMedium ? 'block' : 'flex'}
          justifyContent="center"
          alignItems="center"
          mt={20}
        >
          <Box
            w={isMobile ? '90%' : isMedium ? '50%' : '450px'}
            pr={isMedium ? 0 : 20}
            margin={isMedium ? '0 auto' : ''}
          >
            <Text fontSize="3xl" fontWeight="bold" mb={2}>
              Contribute to this grant
            </Text>
            <Text fontSize="lg" mb={6}>
              Help bootstrap new Bitcoin projects and initiatives by joining the
              growing number of plebs and whales donating to this grant.
              <br />
              <br />
              Funds will go directly to supporting {project.title}, and we
              currently accept on-chain donations only. To learn more,{' '}
              <Link
                isExternal
                href="https://t.me/bradmillscandoit"
                textDecoration="underline"
              >
                get in touch!
              </Link>
            </Text>
          </Box>

          <Box
            w={isMobile ? '90%' : isMedium ? '50%' : '450px'}
            boxShadow="0px 0px 10px rgba(0, 0, 0, 0.08)"
            rounded="lg"
            p={6}
            margin={isMedium ? '0 auto' : ''}
          >
            <HStack
              justifyContent="center"
              spacing="21px"
              alignItems="center"
              my={3}
            >
              <Box>
                <HStack
                  justifyContent="center"
                  alignItems="center"
                  spacing="2px"
                >
                  <SatoshiIconTilted scale={0.8} />
                  <Text fontWeight="bold" fontSize="lg">
                    {(project.balance / 1000000).toFixed(
                      project.balance === 0 ? 0 : 1,
                    )}{' '}
                    M
                  </Text>
                </HStack>
                <Text fontSize="sm" color="#5B5B5B" fontWeight="bold">
                  CONTRIBUTED
                </Text>
              </Box>

              <Box>
                <Text fontWeight="bold" textAlign="center" fontSize="lg">
                  {project.funders ? project.funders.length + 1 : 1}
                </Text>
                <Text fontSize="sm" color="#5B5B5B" fontWeight="bold">
                  CONTRIBUTORS
                </Text>
              </Box>
            </HStack>
            <Box display="flex" justifyContent="center">
              <ContributeButton
                active={isActive(project.status)}
                title="Contribute"
                project={project}
              />
            </Box>
          </Box>
        </Box>

        <Box
          w={isMobile ? '90%' : isMedium ? '50%' : '100%'}
          margin="0 auto"
          mt={20}
        >
          <Text fontSize="3xl" fontWeight="bold" mb={2}>
            The board
          </Text>
          <Text fontSize="lg" textAlign="justify" mb={2}>
            Meet the board who will help to establish the criteria for grant
            distribution and review your applications:
          </Text>

          <Board />
        </Box>

        {project.sponsors && project.sponsors.length > 0 && (
          <Box
            w={isMobile ? '90%' : isMedium ? '50%' : '100%'}
            margin="0 auto"
            mt={20}
          >
            <Text fontSize="3xl" fontWeight="bold" mb={6} textAlign="center">
              Grant Sponsors
            </Text>
            <Box
              display={isMobile ? 'block' : 'flex'}
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
            >
              {project.sponsors.map((sponsor) => (
                <Link
                  isExternal
                  href={`${sponsor?.url}`}
                  key={`${sponsor?.id}`}
                  mx={project.sponsors.length > 1 ? (isMobile ? 0 : 2.5) : 0}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    w={isMobile ? '100%' : '280px'}
                    py={10}
                    _hover={{
                      boxShadow:
                        'rgba(60, 64, 67, 0.3) 0px 0px 2px 0px, rgba(60, 64, 67, 0.15) 0px 0px 3px 1px',
                    }}
                    boxShadow="rgba(50, 50, 93, 0.25) 0px 0px 12px -2px, rgba(0, 0, 0, 0.3) 0px 0px 7px -3px"
                    transition="box-shadow 0.3s ease-in-out"
                    mb={5}
                  >
                    <Image src={`${sponsor?.image}`} w="200px" />
                  </Box>
                </Link>
              ))}
            </Box>
          </Box>
        )}

        <Box
          w={isMobile ? '90%' : isMedium ? '50%' : '100%'}
          margin="0 auto"
          mt="3.75rem"
        >
          <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb={6}>
            Applicants
          </Text>
          {project.name === 'bitcoineducation' ? (
            <iframe
              className={`airtable-embed ${classes.iframe}`}
              src="https://airtable.com/embed/shrLwYSAvD5pO9gjG?backgroundColor=teal"
              frameBorder="0"
              width="100%"
              height="533"
            ></iframe>
          ) : project.name === 'bitcoinbuilders' ? (
            <iframe
              className={`airtable-embed ${classes.iframe}`}
              src="https://airtable.com/embed/shrqwATwHR5zQRRBH?backgroundColor=teal"
              frameBorder="0"
              width="100%"
              height="533"
            ></iframe>
          ) : project.name === 'bitcoinculture' ? (
            <iframe
              className={`airtable-embed ${classes.iframe}`}
              src="https://airtable.com/embed/shrXmWODPPC613gtz?backgroundColor=teal"
              frameBorder="0"
              width="100%"
              height="533"
            ></iframe>
          ) : (
            <></>
          )}
        </Box>

        <VStack margin="0 auto" mt={20} px={4}>
          <Subscribe style="inline" interest="grants" titleSize="3xl" />
        </VStack>
      </Box>
      <AppFooter />
    </>
  );
};
