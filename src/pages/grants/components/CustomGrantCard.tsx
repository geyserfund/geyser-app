import { Box, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { useMobileMode } from '../../../utils'
import { ListText } from './ListText'
import { SponsorList } from './SponsorList'

interface GrantProps {
  title: string
  date: string
  status: boolean
  to: string
  showBanner: boolean
  applicants?: string
  grant?: string
  banner?: string
  grantees?: string
  distributed?: string
  sponsors?: Array<string>
}
export const CustomGrantCard = ({
  title,
  date,
  showBanner,
  status,
  sponsors,
  to,
  applicants,
  grant,
  grantees,
  banner,
  distributed,
}: GrantProps) => {
  const isMobile = useMobileMode()

  return (
    <Link to={to}>
      <Box
        minWidth={'100%'}
        cursor="pointer"
        border={'2px solid #E9ECEF'}
        borderRadius="12px"
      >
        {showBanner ? (
          <Box
            borderTopRightRadius="12px"
            borderTopLeftRadius="12px"
            overflow="hidden"
          >
            <Image
              objectFit="cover"
              src={banner}
              minWidth={'100%'}
              height={isMobile ? '273px' : undefined}
            />
          </Box>
        ) : null}
        <Box display="flex" flexDirection={'column'} p="4">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="left"
            flexDirection={isMobile ? 'column' : 'row'}
          >
            <Box>
              <Box display="flex" alignItems="start">
                <Text mr={4} fontWeight="bold" fontSize="18px">
                  {title}
                </Text>
                <Text
                  bg={status ? 'brand.primary100' : 'brand.neutral200'}
                  fontSize={'14px'}
                  px="14px"
                  py={'5px'}
                  fontWeight="500"
                  borderRadius="4px"
                >
                  {status ? 'ACTIVE' : 'CLOSED'}
                </Text>
              </Box>
              <Text color={'brand.neutral600'}>{date}</Text>
            </Box>
            <Box mt={6} px={6}>
              {status ? (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <ListText
                    title={applicants}
                    subtitle="APPLICANTS"
                    isSatLogo={false}
                  />
                  <ListText title={grant} subtitle="GRANT" isSatLogo={true} />
                </Box>
              ) : (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-around"
                >
                  <ListText
                    title={grantees}
                    subtitle="APPLICANTS"
                    isSatLogo={false}
                  />
                  <ListText
                    title={distributed}
                    subtitle="GRANT"
                    isSatLogo={true}
                  />
                </Box>
              )}
            </Box>
          </Box>
          {!isMobile && <SponsorList sponsors={sponsors} />}
        </Box>
      </Box>
    </Link>
  )
}
