import { Box, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { colors } from '../../../styles'
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
        border={`2px solid ${colors.neutral200}`}
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
        <Box display="flex" flexDirection="column" p="4">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="left"
            flexDirection={isMobile ? 'column' : 'row'}
          >
            <Box py={2}>
              <Box display="flex" alignItems="start">
                <Text mr={4} fontWeight="bold" fontSize="18px">
                  {title}
                </Text>
                <Text
                  bg={status ? 'brand.primary100' : 'brand.neutral200'}
                  fontSize={'14px'}
                  px="14px"
                  py="5px"
                  fontWeight="500"
                  borderRadius="4px"
                >
                  {status ? 'ACTIVE' : 'CLOSED'}
                </Text>
              </Box>
              <Text color={'brand.neutral600'}>{date}</Text>
            </Box>
            <Box mt={isMobile ? 4 : 1} px={6}>
              {status ? (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-around"
                >
                  <ListText mx={4} subtitle="APPLICANTS" isSatLogo={false}>
                    {applicants}
                  </ListText>
                  <ListText mx={4} subtitle="GRANT" isSatLogo={true}>
                    {grant}
                  </ListText>
                </Box>
              ) : (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-around"
                >
                  <ListText mx={4} subtitle="APPLICANTS" isSatLogo={false}>
                    {grantees}
                  </ListText>
                  <ListText mx={4} subtitle="GRANT" isSatLogo={true}>
                    {distributed}
                  </ListText>
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
