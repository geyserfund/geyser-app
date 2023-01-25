import {
  Box,
  HStack,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react'

import { SatoshiIconTilted } from '../../../components/icons'
import { getPath } from '../../../constants'
import { Project } from '../../../types/generated/graphql'
import { useMobileMode } from '../../../utils'

export const GrantCard = ({
  project,
  number,
  distributed,
  date,
  status,
  marginRight,
}: {
  project: Project
  number: string
  distributed: string
  date: string
  status: string
  marginRight?: boolean
}) => {
  const isMobile = useMobileMode()

  return (
    <Box
      backgroundColor="white"
      _hover={{
        boxShadow:
          'rgba(60, 64, 67, 0.3) 0px 0px 2px 0px, rgba(60, 64, 67, 0.15) 0px 0px 3px 1px',
      }}
      boxShadow="rgba(50, 50, 93, 0.25) 0px 0px 12px -2px, rgba(0, 0, 0, 0.3) 0px 0px 7px -3px"
      transition="box-shadow 0.3s ease-in-out"
      borderRadius="4px"
      my={10}
      mr={marginRight ? (isMobile ? 10 : 20) : 0}
      cursor="pointer"
    >
      <Box w={isMobile ? '325px' : '350px'}>
        <LinkBox>
          <LinkOverlay
            href={getPath('_deprecatedPathForProject', project.name)}
          >
            <Image
              w={isMobile ? '325px' : '350px'}
              h={isMobile ? '325px' : '350px'}
              objectFit="cover"
              borderRadius="4px"
              src={`${project.image}`}
              alt="grant"
            />

            <Box p={2}>
              <Text fontWeight="bold" fontSize="3xl">
                {project.title}
              </Text>
              <Text fontSize="22px" fontWeight="medium">
                ROUND {number}: {date}
              </Text>

              <HStack
                justifyContent="center"
                spacing="40px"
                alignItems="center"
                my={3}
              >
                <Box>
                  <HStack justifyContent="center">
                    <SatoshiIconTilted />
                    <Text fontWeight="bold" fontSize="lg">
                      {(project.balance / 1000000).toFixed(
                        project.balance === 0 ? 0 : 1,
                      )}{' '}
                      M
                    </Text>
                  </HStack>
                  <Text fontSize="md" color="#5B5B5B" fontWeight="bold">
                    CONTRIBUTED
                  </Text>
                </Box>

                <Box>
                  <HStack justifyContent="center">
                    <SatoshiIconTilted />
                    <Text fontWeight="bold" fontSize="lg">
                      {distributed} M
                    </Text>
                  </HStack>
                  <Text fontSize="md" color="#5B5B5B" fontWeight="bold">
                    DISTRIBUTED
                  </Text>
                </Box>
              </HStack>

              {status === 'pending' ? (
                <Text
                  width="100%"
                  p={1}
                  border="2px solid #20ECC7"
                  rounded="md"
                  textAlign="center"
                  fontWeight="bold"
                >
                  COMING SOON
                </Text>
              ) : status === 'open' ? (
                <Text
                  width="100%"
                  p={1}
                  bg="brand.primary"
                  rounded="md"
                  textAlign="center"
                  fontWeight="bold"
                >
                  OPEN
                </Text>
              ) : (
                <Text
                  width="100%"
                  p={1}
                  bg="brand.bgGrey3"
                  rounded="md"
                  textAlign="center"
                  fontWeight="bold"
                >
                  ROUND COMPLETED
                </Text>
              )}
            </Box>
          </LinkOverlay>
        </LinkBox>
      </Box>
    </Box>
  )
}
