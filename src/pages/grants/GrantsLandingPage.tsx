/* eslint-disable complexity */
import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/react';
import { getRandomOrb, isMobileMode } from '../../utils';
import { fonts } from '../../constants/fonts';
import satwalletimg from '../../assets/walletsats.svg';
import { ListText } from './components/ListText';
import { CustomGrantCard } from './components/CustomGrantCard';
import { MoreInfo } from './components/MoreInfo';
import { AppFooter } from '../../components/molecules';
import { GrantsContributeModal } from './components/GrantsContributeModal';
import { ButtonComponent } from '../../components/ui';
import { RiLinksLine, RiLinkUnlinkM } from 'react-icons/ri';
import { GrantSponsor } from './GrantsRoundTwo';
import { getGrantApplicants, getGrantSponsorRecords } from '../../api';
import { H2, H3 } from '../../components/typography';

export const GrantsLandingPage = () => {
  const isMobile = isMobileMode();

  const [copy, setCopy] = useState(false);
  const [sponsors, setSponsers] = useState<GrantSponsor[]>([]);
  const [applicationCount, setApplicationCount] = useState('-');

  const handleCompleteContribution = (value: GrantSponsor) => {
    if (value.amount >= 1000) {
      setSponsers([...sponsors, value]);
    }
  };

  const theme = useTheme();

  const handleCopyOnchain = () => {
    navigator.clipboard.writeText('grants@geyser.fund');
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1000);
  };

  useEffect(() => {
    const getSponsors = async () => {
      const sponsorResponse = await getGrantSponsorRecords();

      const listSponsers = sponsorResponse.map((sponsor: any) => ({
        name: sponsor.fields.Name,
        amount: sponsor.fields.Amount,
        imageUrl: sponsor.fields['PFP link'],
      }));
      setSponsers(listSponsers);
    };

    const getApplicants = async () => {
      const applicantResponse = await getGrantApplicants();
      setApplicationCount(`${applicantResponse.length}`);
    };

    getSponsors();
    getApplicants();
  }, []);

  const sponsorImages = sponsors.map((sponsor) => sponsor.imageUrl);

  return (
    <>
      <Box
        paddingTop={isMobile ? '10px' : '20px'}
        bg={theme.colors.brand.bgGrey4}
        minHeight="100%"
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
            fontWeight="900"
            textAlign="center"
            fontFamily={fonts.livvic}
            textShadow={' 0px 0px 25.7663px rgba(22, 232, 194, 0.11)'}
            color={'brand.primary500'}
          >
            Geyser Grants
          </Text>
          <H2 textAlign="center" paddingY="10px">
            Empowering{isMobile ? <br /> : null} bitcoin creators
          </H2>
          <H3 textAlign="center" color={'brand.neutral600'}>
            Funding educators, creatives and builders doing Bitcoin-only
            projects on Geyser. <br /> Funded by bitcoiners who want to change
            {isMobile ? <br /> : ''} the world.
          </H3>

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
                <GrantsContributeModal onLink={handleCompleteContribution} />
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
                    <ButtonComponent
                      size="sm"
                      primary={copy}
                      onClick={handleCopyOnchain}
                      leftIcon={copy ? <RiLinkUnlinkM /> : <RiLinksLine />}
                    >
                      grants@geyser.fund
                    </ButtonComponent>
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
                    <ButtonComponent
                      size="sm"
                      primary={copy}
                      onClick={handleCopyOnchain}
                      leftIcon={copy ? <RiLinkUnlinkM /> : <RiLinksLine />}
                    >
                      grants@geyser.fund
                    </ButtonComponent>
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
                  banner={
                    'https://storage.googleapis.com/geyser-images-distribution-prod-us/geyser-proposal-x3%20copy.jpg'
                  }
                  applicants={applicationCount}
                  grant="100 M"
                  title="Geyser Grants Round 2"
                  date="JAN 2023"
                  to={'/grants/roundtwo'}
                  sponsors={sponsorImages}
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
                  sponsors={[
                    getRandomOrb(10),
                    getRandomOrb(20),
                    getRandomOrb(30),
                    satwalletimg,
                  ]}
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
