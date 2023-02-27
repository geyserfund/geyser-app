import { Box, Link, Text, Tooltip } from '@chakra-ui/react'
import { useTheme } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { getGrantApplicants, getGrantSponsorRecords } from '../../api'
import satwalletimg from '../../assets/walletsats.svg'
import { AppFooter } from '../../components/molecules'
import { H2, H3 } from '../../components/typography'
import { colors, fonts } from '../../styles'
import { getRandomOrb, useMobileMode, useNotification } from '../../utils'
import { CustomGrantCard } from './components/CustomGrantCard'
import { GrantsContributeModal } from './components/GrantsContributeModal'
import { ListText } from './components/ListText'
import { MoreInfo } from './components/MoreInfo'
import { GrantSponsor } from './GrantsRoundTwo'

export const GrantsLandingPage = () => {
  const isMobile = useMobileMode()

  const { toast } = useNotification()

  const [copy, setCopy] = useState(false)
  const [sponsors, setSponsers] = useState<GrantSponsor[]>([])
  const [applicationCount, setApplicationCount] = useState('-')

  const handleCompleteContribution = (value: GrantSponsor) => {
    if (value.amount >= 1000) {
      setSponsers([...sponsors, value])
    }
  }

  const theme = useTheme()

  const handleCopyOnchain = () => {
    navigator.clipboard.writeText('grants@geyser.fund')
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 1000)
  }

  useEffect(() => {
    const getSponsors = async () => {
      try {
        const sponsorResponse = await getGrantSponsorRecords()

        const listSponsers = sponsorResponse.map((sponsor: any) => ({
          name: sponsor.fields.Name,
          amount: sponsor.fields.Amount,
          imageUrl: sponsor.fields['PFP link'],
        }))
        setSponsers(listSponsers)
      } catch (error) {
        toast({
          status: 'error',
          title: 'failed to fetch grant sponsors',
        })
      }
    }

    const getApplicants = async () => {
      try {
        const applicantResponse = await getGrantApplicants()
        setApplicationCount(`${applicantResponse.length}`)
      } catch (error) {
        toast({
          status: 'error',
          title: 'failed to fetch grant applicants',
        })
      }
    }

    getSponsors()
    getApplicants()
  }, [])

  const sponsorImages = sponsors.map((sponsor) => sponsor.imageUrl)

  return (
    <>
      <Box
        paddingTop={isMobile ? '10px' : '20px'}
        bg={theme.colors.brand.bgGrey4}
        minHeight="100%"
      >
        <Box my={5} px={isMobile ? '1rem' : ''}>
          <Text
            fontSize={isMobile ? '4xl' : '44px'}
            fontWeight="medium"
            textAlign="center"
          >
            🥳
          </Text>
          <Text
            fontSize={'25px'}
            fontWeight="bold"
            textAlign="center"
            fontFamily={fonts.header}
            textShadow={' 0px 0px 25.7663px rgba(22, 232, 194, 0.11)'}
            color={'brand.primary500'}
          >
            GEYSER GRANTS
          </Text>
          <H2
            textAlign="center"
            paddingY="10px"
            fontSize="44px"
            fontWeight="700"
          >
            Empowering bitcoin creators
          </H2>
          <H3 textAlign="center" color={'brand.neutral600'}>
            Funding educators, creatives and builders doing Bitcoin-only
            projects on Geyser. <br /> Funded by bitcoiners who want to change
            the world.
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
              <Box
                display="flex"
                alignItems="center"
                width="100%"
                px={isMobile ? undefined : '25%'}
                justifyContent="space-around"
              >
                <ListText
                  titleProps={{ fontSize: '24px' }}
                  title="351 M"
                  subtitle="GRANT CONTRIBUTIONS"
                  subtitleProps={{ fontSize: '10px' }}
                  isSatLogo={true}
                />
                <ListText
                  titleProps={{ fontSize: '24px' }}
                  title="100 M"
                  subtitle="GRANTS DISTRIBUTED"
                  subtitleProps={{ fontSize: '10px' }}
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
                    fontSize={'14px'}
                    fontWeight="500"
                    mt={3}
                    color="brand.neutral600"
                  >
                    Contribute to the Bitcoin ecosystem by becoming a Geyser
                    Grants sponsor. You can also easily contribute by sending or
                    streaming recurring payments to{' '}
                    <Link
                      textColor={copy ? undefined : colors.primary500}
                      href="#"
                      onClick={handleCopyOnchain}
                    >
                      grants@geyser.fund
                    </Link>
                  </Text>
                ) : (
                  <Box display="flex" alignItems={'center'}>
                    <Text fontWeight="500" mr={1} color="brand.neutral600">
                      Or sending SATs to our lightning address:{' '}
                      <Tooltip label="Copied to clipboard!" isOpen={copy}>
                        <Link
                          textColor={copy ? undefined : colors.primary500}
                          href="#"
                          onClick={handleCopyOnchain}
                        >
                          grants@geyser.fund
                        </Link>
                      </Tooltip>
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
                  banner={
                    'https://storage.googleapis.com/geyser-images-distribution-prod-us/geyser-proposal-x3%20copy.jpg'
                  }
                  grantees={applicationCount}
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
                  Previous Grants
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
  )
}
