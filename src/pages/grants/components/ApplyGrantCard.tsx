import { Box, HStack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { SatoshiIconTilted } from '../../../components/icons'
import { ApplyGrantModal } from './ApplyGrantModal'

interface GrantsProp {
  applicant: number
  distributed?: string
  contributed?: string
  title: string
  subtitle: string
  about: string
  image: string
  isClose?: boolean
}
export const ApplyGrantCard = ({
  title,
  subtitle,
  about,
  applicant,
  image,
  isClose = true,
  distributed,
  contributed,
}: GrantsProp) => {
  const { t } = useTranslation()
  return (
    <Box
      rounded="md"
      shadow="sm"
      borderWidth="1px"
      borderColor="neutral.100"
      minWidth={'100%'}
      overflow="hidden"
      _hover={{ shadow: 'lg' }}
      transition="box-shadow ease-out 0.3s"
    >
      <Box width={'100%'}>
        <img src={image} width={'100%'} />
      </Box>
      <Box px={4} py={2}>
        <Text fontWeight={'600'} fontSize="14px">
          {title}
        </Text>
        <Text fontWeight={'300'} fontSize="13px">
          {subtitle}
        </Text>
        <Box
          display="flex"
          mt={3}
          justifyContent={'center'}
          flexDirection="column"
          alignItems="center"
        >
          {isClose ? (
            <>
              <Text fontWeight={'400'} fontSize="9px" color={'neutral.700'}>
                {applicant}
              </Text>
              <Text
                fontWeight={'400'}
                fontSize="11px"
                color={'neutral.700'}
                mt={1}
                textTransform="uppercase"
              >
                {t('applicants')}
              </Text>
            </>
          ) : (
            <HStack
              justifyContent="center"
              spacing="40px"
              alignItems="center"
              my={3}
            >
              <Box>
                <HStack justifyContent="center">
                  <SatoshiIconTilted />
                  <Text fontWeight="bold" fontSize="sm">
                    {contributed}
                  </Text>
                </HStack>
                <Text
                  fontSize="xs"
                  color="neutral600"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  {t('contributed')}
                </Text>
              </Box>

              <Box>
                <HStack justifyContent="center">
                  <SatoshiIconTilted />
                  <Text fontWeight="bold" fontSize="sm">
                    {distributed}
                  </Text>
                </HStack>
                <Text
                  fontSize="xs"
                  color="neutral600"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  {'distributed'}
                </Text>
              </Box>
            </HStack>
          )}

          <ApplyGrantModal
            title={title}
            subtitle={subtitle}
            about={about}
            applicant={applicant}
            image={image}
            isClose={isClose}
          />
        </Box>
      </Box>
    </Box>
  )
}
