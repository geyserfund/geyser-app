import {
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  Link,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { isMobileMode } from '../../utils';
import satsymbol from '../../assets/satsymbolprimary.svg';
import { fonts } from '../../constants/fonts';
import { FaArrowLeft } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { ApplyGrantCard } from './components/ApplyGrantCard';
import { BoardMembers } from './components/BoardMembers';
import satwalletimg from '../../assets/walletsats.svg';
import { MoreInfo } from './components/MoreInfo';
import { AppFooter } from '../../components/molecules';
import { GrantsContributeModal } from './components/GrantsContributeModal';
import { GrantDevelopers } from './components/GrantDevs';
import { GrantsRound2Url } from '../../constants';

const grants = [
  {
    title: 'Communities & Meetups',
    subtitle: 'ROUND 2: DECEMBER',
    image:
      'https://storage.googleapis.com/geyser-images-distribution-prod-us/geyser-thumbnail-2%20copy.jpg',
    name: 'Bitcoin for Free Speech',
    applicants: 0,
    about:
      'This grant is for all projects creating bitcoin communities irl (in real life). In-person bitcoin spaces and meetups  allow for quality information to spread and enable the forging of deeper social networks. This in term, results in a more resilient bitcoin network. We want to enable these creators to continue building grassroots bitcoin communities globally.',
  },
  {
    title: 'Bitcoin Translations',
    subtitle: 'ROUND 2: DECEMBER',
    image:
      'https://storage.googleapis.com/geyser-images-distribution-prod-us/geyser-thumbnail-1%20copy.jpg',
    name: 'Visual Artists for Bitcoin',
    applicants: 0,
    about:
      'Bitcoin content is spreading like wildfire. But language represent the biggest blocker to learning more about it, as most content remains written in English. By supporting translators in this space we want to keep supporting those that make Bitcoin content available to everyone around the world.',
  },
  {
    title: 'Bitcoin Visual Art',
    subtitle: 'ROUND 2: DECEMBER',
    image:
      'https://storage.googleapis.com/geyser-images-distribution-prod-us/geyser-thumbnail-3%20copy.jpg',
    name: 'Bitcoin Open Source',
    applicants: 0,
    about:
      "This grant is for all creative projects that focus on explaining and showcasing bitcoin through visual mediums. Creating culture and art around bitcoin is a key way of educating the world about bitcoin's history, mythology, technology and ideological significance. Let's support Bitcoin artists!",
  },
];

export const GrantsRoundTwo = () => {
  const isMobile = isMobileMode();
  const history = useHistory();
  const [link, setLink] = useState<string>('');

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
          my={4}
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
          <Box display="flex" justifyContent={'center'}>
            <Image height={'200px'} src={GrantsRound2Url} />
          </Box>
          <Box
            display="flex"
            alignItems={'center'}
            justifyContent="center"
            my={1}
            gap={4}
          >
            <Text
              bg="brand.primary100"
              fontSize={'10px'}
              px="14px"
              py={'5px'}
              fontWeight="500"
            >
              ACTIVE
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
              <Box
                display={'flex'}
                alignItems="center"
                justifyContent={'center'}
              >
                <Box mr={1}>
                  <img src={satsymbol} width="30px" alt="satsymbol" />
                </Box>

                <Text
                  fontWeight={'700'}
                  fontSize={'36px'}
                  fontFamily={fonts.livvic}
                  textAlign="center"
                >
                  100 M
                </Text>
                <Text
                  fontSize={'xs'}
                  ml="1"
                  fontWeight="800"
                  color="brand.neutral400"
                >
                  <small>($20K)</small>
                </Text>
              </Box>
              <Text fontWeight={'400'} fontFamily={fonts.inter} fontSize="17px">
                GRANT TO DISTRIBUTE
              </Text>
            </Box>

            <Box minWidth={'100%'} borderRadius="12px">
              <img
                src={
                  'https://storage.googleapis.com/geyser-images-distribution-prod-us/geyser-proposal-x3%20copy.jpg'
                }
              />
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
                    title={item.title}
                    subtitle={item.subtitle}
                    about={item.about}
                    image={item.image}
                    applicant={item.applicants}
                  />
                </GridItem>
              ))}
            </Grid>
          </Box>

          <Box display={'flex'} justifyContent="center" my={6}>
            <Text fontWeight={'400'} fontSize="14px" color={'brand.neutral600'}>
              Designs by
              <Link
                href="https://twitter.com/tachirahomestd"
                color={'brand.primary500'}
              >
                @tachirahomestd
              </Link>
            </Text>
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

          <MoreInfo />
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
                <GrantsContributeModal onLink={setLink} />

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
          <Box my={6}>
            <Text color={'brand.neutral600'} fontWeight="600" mb={4}>
              Thanks to the developers and designers that built and designed
              Geyser Grants.
            </Text>
            <GrantDevelopers />
          </Box>
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
