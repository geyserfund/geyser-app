import { Box, Image, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

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

export const GrantValues: {
  [key: string]: { applicants: number; amount: number }
} = {
  'grant-round-001': {
    applicants: 90,
    amount: 100000000,
  },
  'grant-round-002': {
    applicants: 45,
    amount: 100000000,
  },
}

export const CustomGrantCard = ({ grant, to, showBanner }: Props) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()

  const navigate = useNavigate()

  const isActive = grant.status !== GrantStatusEnum.Closed

  const renderApplicants = (value?: number) =>
    value || grant.applicants ? (
      <ListText
        mx={4}
        subtitle={t('applicants')}
        subtitleProps={{ textTransform: 'uppercase' }}
        isSatLogo={false}
      >
        {value ||
          grant.applicants.filter(
            (applicant) =>
              applicant &&
              [
                GrantApplicantStatus.Accepted,
                GrantApplicantStatus.Pending,
                GrantApplicantStatus.Funded,
              ].includes(applicant.status),
          ).length ||
          0}
      </ListText>
    ) : null

  return (
    <Box
      mt={3}
      onClick={() => navigate(to)}
      minWidth={'100%'}
      cursor="pointer"
      border={`2px solid`}
      borderColor="neutral.200"
      borderRadius="12px"
      bgColor="neutral.0"
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
                {t(grant.title)}
              </Text>
              <Text
                bg={isActive ? 'primary.100' : 'neutral.200'}
                fontSize={'14px'}
                px="14px"
                py="5px"
                fontWeight="500"
                borderRadius="4px"
              >
                {isActive ? t('ACTIVE') : t('CLOSED')}
              </Text>
            </Box>
            <Text color={'neutral.600'}>
              {getFormattedDate(
                grant.statuses.find(
                  (status) => status.status === GrantStatusEnum.Closed,
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
                {renderApplicants(GrantValues[grant.name]?.applicants)}
                <ListText mx={4} subtitle={t('GRANT')} isSatLogo={true}>
                  {getShortAmountLabel(
                    GrantValues[grant.name]?.applicants || grant.balance || 0,
                  )}
                </ListText>
              </Box>
            ) : (
              <Box
                mt={2}
                display="flex"
                alignItems="center"
                justifyContent="space-around"
              >
                {renderApplicants(GrantValues[grant.name]?.applicants)}
                {
                  <ListText mx={4} subtitle={t('GRANT')} isSatLogo={true}>
                    {getShortAmountLabel(
                      GrantValues[grant.name]?.amount ||
                        grant.applicants?.reduce(
                          (prev, curr) =>
                            prev +
                            (curr?.funding.communityFunding || 0) +
                            (curr?.funding.grantAmount || 0),
                          0,
                        ) ||
                        0,
                    )}
                  </ListText>
                }
              </Box>
            )}
          </Box>
        </Box>
        {!isMobile && (
          <SponsorList justifyContent="start" sponsors={grant.sponsors} />
        )}
      </Box>
    </Box>
  )
}
