/* eslint-disable complexity */
import React, { useEffect } from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/react';
import { isMobileMode, isMediumScreen, useNotification } from '../../utils';
import { fonts } from '../../constants/fonts';
import borderimg from '../../assets/border.svg';
import satwalletimg from '../../assets/walletsats.svg';
import { ListText } from './components/ListText';
import { CustomGrantCard } from './components/CustomGrantCard';
import { MoreInfo } from './components/MoreInfo';
import { AppFooter } from '../../components/molecules';

export const GrantsLandingPage = () => {
  const isMobile = isMobileMode();

  const theme = useTheme();

  return (
    <>
      <Box
        paddingTop={isMobile ? '81px' : '91px'}
        bg={theme.colors.brand.bgGrey4}
        minHeight="100vh"
      >
        <Box my={5} px={isMobile ? '1rem' : ''}>
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
            color={'brand.primary500'}
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
            color={'brand.neutral600'}
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
                mt={3}
                display="flex"
                justifyContent={'center'}
                alignItems="center"
              >
                {isMobile === true && (
                  <Box
                    display={'flex'}
                    mr={2}
                    mt={4}
                    flexDirection="column"
                    alignItems={'end'}
                  >
                    <img src={satwalletimg} />
                    <Text
                      color={'brand.neutral600'}
                      fontSize="8px"
                      mr={2}
                      fontWeight="700"
                    >
                      SPONSORS
                    </Text>
                  </Box>
                )}
                {[1, 2, 3].map((item, idx) => (
                  <>
                    {isMobile === true && (
                      <Box
                        key={idx}
                        bg="brand.neutral200"
                        rounded={'full'}
                        mr={2}
                        width="25px"
                        height={'25px'}
                      ></Box>
                    )}
                  </>
                ))}
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
                    textAlign="justify"
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
                  applicants="-"
                  grant="100 M"
                  title="Geyser Grants Round 2"
                  date="DEC 2022"
                  to={'/grants/roundtwo'}
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
                  grantees="45"
                  distributed="100 M"
                  title="Geyser Grants Round 1"
                  date="AUG 2022"
                  to={'/grants/roundone'}
                  sponsors={[borderimg, satwalletimg]}
                />
              </Box>
              <MoreInfo />
            </Box>
          </Box>
        </Box>
        <AppFooter />
      </Box>
    </>
  );
};
