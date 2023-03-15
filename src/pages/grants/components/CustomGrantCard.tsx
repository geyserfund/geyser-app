import { Box, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { colors } from '../../../styles'
import { Grant, GrantApplicantStatus, GrantStatusEnum } from '../../../types'
import {
  getFormattedDate,
  getShortAmountLabel,
  useMobileMode,
} from '../../../utils'
import { ListText } from './ListText'
import { SponsorList } from './SponsorList'

interface Props {
  grant: Grant
  to: string
  showBanner: boolean
}

export const CustomGrantCard = ({ grant, to, showBanner }: Props) => {
  const isMobile = useMobileMode()

  const isActive = grant.status !== GrantStatusEnum.Closed

  const Applicants = grant.applicants ? (
    <ListText mx={4} subtitle="APPLICANTS" isSatLogo={false}>
      {grant.applicants.filter(
        (applicant) => applicant?.status === GrantApplicantStatus.Accepted,
      ).length || 0}
    </ListText>
  ) : null

  return (
    <Link to={to}>
      <Box
        minWidth={'100%'}
        cursor="pointer"
        border={`2px solid ${colors.neutral200}`}
        borderRadius="12px"
      >
        {showBanner && grant.image ? (
          <Box
            borderTopRightRadius="12px"
            borderTopLeftRadius="12px"
            overflow="hidden"
          >
            <Image
              objectFit="cover"
              src={grant.image}
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
                  {grant.title}
                </Text>
                <Text
                  bg={isActive ? 'brand.primary100' : 'brand.neutral200'}
                  fontSize={'14px'}
                  px="14px"
                  py="5px"
                  fontWeight="500"
                  borderRadius="4px"
                >
                  {isActive ? 'ACTIVE' : 'CLOSED'}
                </Text>
              </Box>
              <Text color={'brand.neutral600'}>
                {getFormattedDate(
                  grant.statuses.find(
                    (status) => status.status === GrantStatusEnum.FundingOpen,
                  )?.startAt,
                )}
              </Text>
            </Box>
            <Box mt={isMobile ? 4 : 1} px={6}>
              {isActive ? (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-around"
                >
                  {Applicants}
                  <ListText mx={4} subtitle="GRANT" isSatLogo={true}>
                    {getShortAmountLabel(grant.balance || 0)}
                  </ListText>
                </Box>
              ) : (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-around"
                >
                  {Applicants}
                  {grant.applicants && (
                    <ListText mx={4} subtitle="GRANT" isSatLogo={true}>
                      {getShortAmountLabel(
                        grant.applicants.reduce(
                          (prev, curr) =>
                            prev +
                            (curr?.funding.communityFunding || 0) +
                            (curr?.funding.grantAmount || 0),
                          0,
                        ) || 0,
                      )}
                    </ListText>
                  )}
                </Box>
              )}
            </Box>
          </Box>
          {!isMobile && <SponsorList sponsors={grant.sponsors} />}
        </Box>
      </Box>
    </Link>
  )
}
