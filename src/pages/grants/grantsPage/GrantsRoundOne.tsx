import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Box, Button, Grid, GridItem, Image, Link, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import { AppFooter } from '../../../components/molecules'
import { ButtonComponent } from '../../../components/ui'
import {
  GrantsBitcoinCulture,
  GrantsBitcoinDevelopment,
  GrantsBitcoinEducation,
  GrantsHero,
  WalletOfSatoshiUrl,
} from '../../../constants'
import { fonts } from '../../../styles'
import { GrantApplicant, GrantStatusEnum } from '../../../types'
import { useMediumScreen, useMobileMode } from '../../../utils'
import { ApplyGrantCard } from '../components/ApplyGrantCard'
import { Board } from '../components/Board'
import { CommunityVoting } from './sections'

const grants = [
  {
    title: 'Bitcoin Education',
    subtitle: 'ROUND 1: JULY 1-31',
    applicants: 0,
    about:
      'The aim of this grant is to support not-for-profit efforts and initiatives going towards Bitcoin education. Bitcoin is a tool for individual freedom and self-sovereignty. It is enabling a revolution that will take humanity to the next level by providing financial freedom and accessibility to the world, and a return to a sound financial system. And yet, most people still see it as a tool for gambling, money for criminals, a ponzi scheme, or an ecological nightmare. This is why the work of Bitcoin educators is so important. Much work is still needed to empower people around the world to use Bitcoin as a tool for escaping rampant inflation, financial censorship and banklessness. For more information, see here.',
    contributed: '1.1M',
    distributed: '0',
    image: GrantsBitcoinEducation,
  },
  {
    title: 'Bitcoin Development',
    subtitle: 'ROUND 1: JULY 1-31',
    applicants: 0,
    about:
      'The aim of this grant is to support not-for-profit efforts and initiatives going towards Bitcoin education. Bitcoin is a tool for individual freedom and self-sovereignty. It is enabling a revolution that will take humanity to the next level by providing financial freedom and accessibility to the world, and a return to a sound financial system. And yet, most people still see it as a tool for gambling, money for criminals, a ponzi scheme, or an ecological nightmare. This is why the work of Bitcoin educators is so important. Much work is still needed to empower people around the world to use Bitcoin as a tool for escaping rampant inflation, financial censorship and banklessness. For more information, see here.',
    contributed: '12,231,955',
    distributed: '231,955',
    image: GrantsBitcoinDevelopment,
  },
  {
    title: 'Bitcoin Culture',
    subtitle: 'ROUND 1: JULY 1-31',
    applicants: 0,
    about:
      'The aim of this grant is to support not-for-profit efforts and initiatives going towards Bitcoin education. Bitcoin is a tool for individual freedom and self-sovereignty. It is enabling a revolution that will take humanity to the next level by providing financial freedom and accessibility to the world, and a return to a sound financial system. And yet, most people still see it as a tool for gambling, money for criminals, a ponzi scheme, or an ecological nightmare. This is why the work of Bitcoin educators is so important. Much work is still needed to empower people around the world to use Bitcoin as a tool for escaping rampant inflation, financial censorship and banklessness. For more information, see here.',
    contributed: '12,231,955',
    distributed: '231,955',
    image: GrantsBitcoinCulture,
  },
]

export const GrantsRoundOne = ({
  applicants,
  fundingOpenStartDate,
  fundingOpenEndDate,
  isCompetitionVote,
}: {
  applicants?: GrantApplicant[]
  fundingOpenStartDate: number
  fundingOpenEndDate: number
  isCompetitionVote: boolean
}) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  const navigate = useNavigate()
  const isMedium = useMediumScreen()

  return (
    <>
      <Box
        paddingTop={isMobile ? '10px' : '20px'}
        bg={'neutral.0'}
        minHeight="100vh"
        display="flex"
        alignItems={'center'}
        flexDirection="column"
      >
        <Box my={5} width={isMobile ? '100%' : '909px'} px={isMobile ? '1rem' : ''}>
          <Button size={'sm'} bg="neutral.0" variant={'outline'} gap={2} onClick={() => navigate(-1)} fontSize="sm">
            <FaArrowLeft /> {t('See all Grants')}
          </Button>
          <Text fontSize={isMobile ? '4xl' : '47px'} fontWeight="medium" textAlign="center">
            🧊
          </Text>
          <Text
            fontSize={'27px'}
            fontWeight="900"
            textAlign="center"
            fontFamily={fonts.livvic}
            textShadow={' 0px 0px 25.7663px rgba(22, 232, 194, 0.11)'}
            color={'primary.500'}
          >
            {t('Geyser Grants')}
          </Text>
          <Box display="flex" alignItems={'center'} justifyContent="center" gap={4}>
            <Text
              fontFamily={fonts.interBlack}
              fontSize={isMobile ? '30' : '35px'}
              fontWeight="700"
              textAlign="center"
              justifyContent="center"
            >
              {t('Round 1')}
            </Text>
          </Box>
          <Box display="flex" justifyContent={'center'} my="2" rounded={'sm'}>
            <Text bg="neutral.200" px={'3'} py="2" fontWeight={'500'} fontSize="14px">
              {t('CLOSED')}
            </Text>
          </Box>
          <Text
            fontSize={isMobile ? '15px' : '16px'}
            fontWeight="500"
            color={'neutral.600'}
            textAlign="center"
            justifyContent="center"
          >
            {t('Funding educators, creatives and builders doing Bitcoin-only projects on Geyser.')}
            {isMobile ? '' : <br />} {t('Funded by bitcoiners who want to change the world.')}
          </Text>
          <Box display="flex" flexDirection={'column'} alignItems="center">
            <Box color={'primary.500'} my={8}>
              <Box>
                <img src={GrantsHero} />
              </Box>
            </Box>

            <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6} minWidth="100%" mt={8}>
              {grants.map((item, idx) => (
                <GridItem w={'100%'} key={idx}>
                  <ApplyGrantCard
                    title={t(item.title)}
                    contributed={item.contributed}
                    distributed={item.distributed}
                    subtitle={item.subtitle}
                    about={t(item.about)}
                    image={item.image}
                    applicant={item.applicants}
                    isClose={false}
                  />
                </GridItem>
              ))}
            </Grid>
          </Box>
          <Box
            width={isMobile ? '90%' : isMedium ? '75%' : '60%'}
            display="flex"
            justifyContent="center"
            justifyItems="center"
            margin="0 auto"
          >
            <VStack>
              <Text fontFamily={fonts.interBlack} fontSize="24px" fontWeight={'bold'} textAlign="center" mt={8}>
                {t('Round 1 Announcement')}
              </Text>
              <Text textAlign="justify" fontSize="sm">
                {t('The Geyser Grant Round 1 winners have been released.')}{' '}
                <Link
                  _hover={{ textDecoration: 'none' }}
                  isExternal
                  href="https://twitter.com/geyserfund/status/1567537222005530625?s=20&t=ubMlkMfNudkbogo-IKhkHw"
                >
                  {t('Check out our Twitter announcement.')}
                </Link>
              </Text>
              <Image
                htmlHeight={450}
                htmlWidth={800}
                src="https://storage.googleapis.com/geyser-projects-media/grants/geyser-grants-round-1-results.jpeg"
              ></Image>
              <Link
                margin="0 auto"
                w="87px"
                _hover={{ textDecoration: 'none' }}
                isExternal
                href="https://twitter.com/geyserfund/status/1567537222005530625"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <ButtonComponent fontSize="lg">
                  {t('Announcement')}
                  <ExternalLinkIcon w={4} h={4} ml={1} mt={0.5} />
                </ButtonComponent>
              </Link>
            </VStack>
          </Box>

          {applicants && applicants.length ? (
            <Box my={5}>
              <CommunityVoting
                title="Grant Winners"
                applicants={applicants}
                grantHasVoting={false}
                grantStatus={GrantStatusEnum.Closed}
                isClosed={true}
                fundingOpenEndDate={fundingOpenEndDate}
                fundingOpenStartDate={fundingOpenStartDate}
                isCompetitionVote={isCompetitionVote}
              />
            </Box>
          ) : null}

          <Box my={8}>
            <Text fontFamily={fonts.interBlack} fontSize="24px" fontWeight={'bold'}>
              {t('Principled Bitcoiners Board')}
            </Text>
            <Text color={'neutral.600'} fontWeight="600">
              {t('The board will be responsible for reviewing and evaluating the applications.')}
            </Text>
          </Box>
          <Box minWidth={'100%'} p="2" bg="neutral.200">
            <Board />
          </Box>
          <Box my={8}>
            <Text fontFamily={fonts.interBlack} fontSize="24px" fontWeight={'bold'}>
              {t('Made possible by sponsors')}
            </Text>
            <Text color={'neutral.600'} fontWeight="600">
              {t('Bitcoin companies and anon individuals that want to bring hope to the world.')}
            </Text>
          </Box>
          <Box
            border={'2px solid'}
            borderColor="neutral.200"
            borderRadius="12px"
            pb={4}
            pt={6}
            bg="neutral.0"
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
              <img src={WalletOfSatoshiUrl} width="195px" />
            </Box>
          </Box>
        </Box>
        <AppFooter />
      </Box>
    </>
  )
}
