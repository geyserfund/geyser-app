import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  Link,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router'

import satwalletimg from '../../assets/walletsats.svg'
import { AppFooter } from '../../components/molecules'
import { ButtonComponent } from '../../components/ui'
import {
  getPath,
  GrantsBitcoinCulture,
  GrantsBitcoinDevelopment,
  GrantsBitcoinEducation,
  GrantsHero,
} from '../../constants'
import { fonts } from '../../styles'
import { GrantApplicant } from '../../types'
import { useMediumScreen, useMobileMode } from '../../utils'
import { ApplyGrantCard } from './components/ApplyGrantCard'
import { Board } from './components/Board'
import { CommunityVoting } from './components/CommunityVoting'
import { GrantsContributeModal } from './components/GrantsContributeModal'

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
}: {
  applicants?: GrantApplicant[]
}) => {
  const isMobile = useMobileMode()
  const navigate = useNavigate()
  const isMedium = useMediumScreen()
  const [link, setLink] = React.useState('')

  const modalProps = useDisclosure()

  return (
    <>
      <Box
        paddingTop={isMobile ? '10px' : '20px'}
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
            onClick={() => navigate(-1)}
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
              justifyContent="center"
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
            justifyContent="center"
          >
            Funding educators, creatives and builders doing Bitcoin-only
            projects on Geyser.{isMobile ? '' : <br />} Funded by bitcoin
            sponsors who want to change the world for the better.
          </Text>
          <Box display="flex" flexDirection={'column'} alignItems="center">
            <Box color={'brand.primary500'} my={8}>
              <Box>
                <img src={GrantsHero} />
              </Box>
            </Box>

            <Grid
              templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
              gap={6}
              minWidth="100%"
              mt={8}
            >
              {grants.map((item, idx) => (
                <GridItem w={'100%'} key={idx}>
                  <ApplyGrantCard
                    title={item.title}
                    contributed={item.contributed}
                    distributed={item.distributed}
                    subtitle={item.subtitle}
                    about={item.about}
                    image={item.image}
                    applicant={item.applicants}
                    isClose={false}
                  />
                </GridItem>
              ))}
            </Grid>
          </Box>

          {applicants && applicants.length ? (
            <Box my={5}>
              <CommunityVoting
                title="Grant Winners"
                applicants={applicants}
                canVote={false}
              />
            </Box>
          ) : null}

          <Box my={8}>
            <Text
              fontFamily={fonts.interBlack}
              fontSize="24px"
              fontWeight={'bold'}
            >
              Principled Bitcoiners Board
            </Text>
            <Text color={'brand.neutral600'} fontWeight="600">
              The board will be responsible for reviewing and evaluating the
              applications.
            </Text>
          </Box>
          <Box minWidth={'100%'} p="2" bg="white">
            <Board />
          </Box>
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
                <Button
                  variant={'solid'}
                  fontWeight="500"
                  fontSize="16px"
                  px={12}
                  mr="2"
                  height={10}
                  onClick={() => modalProps.onOpen()}
                  backgroundColor="brand.primary"
                >
                  Contribute
                </Button>
                <GrantsContributeModal
                  onSuccess={(_contribution, project) =>
                    project && setLink(getPath('project', project.name))
                  }
                />

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
          <Box
            width={isMobile ? '90%' : isMedium ? '75%' : '60%'}
            display="flex"
            justifyContent="center"
            justifyItems="center"
            margin="0 auto"
          >
            <VStack>
              <Text
                fontFamily={fonts.interBlack}
                fontSize="24px"
                fontWeight={'bold'}
                textAlign="center"
                mt={8}
              >
                Round 1 Announcement
              </Text>
              <Text textAlign="justify" fontSize="sm">
                The Geyser Grant Round 1 winners have been released.{' '}
                <Link
                  _hover={{ textDecoration: 'none' }}
                  isExternal
                  href="https://twitter.com/geyserfund/status/1567537222005530625?s=20&t=ubMlkMfNudkbogo-IKhkHw"
                >
                  Check out our Twitter announcement.
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
                  Announcement
                  <ExternalLinkIcon w={4} h={4} ml={1} mt={0.5} />
                </ButtonComponent>
              </Link>
            </VStack>
          </Box>
        </Box>
        <AppFooter />
      </Box>
    </>
  )
}
