import {
  Box,
  Button,
  Image,
  Link,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router'

import { AlbyPNG, SatSymbol, SatWalletImg } from '../../../assets'
import { AppFooter } from '../../../components/molecules'
import {
  Grant2AnnouncementImageUrl,
  Grant2AnnouncementTwitterUrl,
  GrantsRound2Url,
} from '../../../constants'
import { fonts } from '../../../styles'
import { GrantApplicant } from '../../../types'
import { useMobileMode } from '../../../utils'
import { GrantWinnerAnnouncement } from '../components'
import { BoardMembers } from '../components/BoardMembers'
import { GrantDevelopers } from '../components/GrantDevs'
import { CommunityVoting } from './sections/CommunityVoting'
import { MoreInfo } from './sections/MoreInfo'

export type GrantSponsor = {
  name: string
  amount: number
  imageUrl: string
}

export const GrantsRoundTwo = ({
  fundingOpenStartDate,
  fundingOpenEndDate,
  applicants,
}: {
  fundingOpenStartDate: number
  fundingOpenEndDate: number
  applicants?: GrantApplicant[]
}) => {
  const isMobile = useMobileMode()
  const navigate = useNavigate()

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
          my={4}
          width={isMobile ? '100%' : '909px'}
          px={isMobile ? '1rem' : ''}
          paddingBottom="20px"
          position="relative"
        >
          <Button
            size={'sm'}
            bg="brand.bgWhite"
            variant={'outline'}
            gap={2}
            onClick={() => navigate(-1)}
            fontSize="sm"
            position={isMobile ? 'relative' : 'absolute'}
          >
            <FaArrowLeft /> See all Grants
          </Button>
          <Box display="flex" justifyContent={'center'}>
            <Image height={'220px'} src={GrantsRound2Url} />
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
            justifyContent="center"
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
                  <img src={SatSymbol} width="30px" alt="satsymbol" />
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

            <Box
              minWidth={'100%'}
              borderRadius="12px"
              rounded="md"
              overflow="hidden"
            >
              <img
                src={
                  'https://storage.googleapis.com/geyser-images-distribution-prod-us/geyser-proposal-x3%20copy.jpg'
                }
              />
            </Box>

            <GrantWinnerAnnouncement
              imageUrl={Grant2AnnouncementImageUrl}
              linkUrl={Grant2AnnouncementTwitterUrl}
              w="auto"
              mt="20px"
            />

            {applicants && Boolean(applicants.length) && (
              <Box my={5}>
                <CommunityVoting
                  title="Grant Winners"
                  applicants={applicants}
                  canVote={false}
                  isClosed={true}
                  fundingOpenEndDate={fundingOpenEndDate}
                  fundingOpenStartDate={fundingOpenStartDate}
                />
              </Box>
            )}
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
              The board will be responsible for reviewing and evaluating the
              applications.
            </Text>
          </Box>
          <BoardMembers />

          <MoreInfo titleProps={{ fontSize: '24px' }} />
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
            <Box width="100%" display="flex" alignItems={'center'} my={4}>
              <Wrap width="100%" justify="center" spacing="25px">
                <WrapItem>
                  <Image height="70px" src={SatWalletImg} />
                </WrapItem>
                <WrapItem>
                  <Image height="70px" src={AlbyPNG} />
                </WrapItem>
              </Wrap>
            </Box>
          </Box>
          <Box my={6}>
            <Text color={'brand.neutral600'} fontWeight="600" mb={4}>
              Thanks to the developers and designers that built and designed
              Geyser Grants.
            </Text>
            <GrantDevelopers />
          </Box>
        </Box>
        <AppFooter />
      </Box>
    </>
  )
}

export default GrantsRoundTwo
