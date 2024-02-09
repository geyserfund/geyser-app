import { Box, HStack, Image, Skeleton, Text } from '@chakra-ui/react'
import { useState } from 'react'

import { SatoshiIconTilted } from '../../../components/icons'
import { useMobileMode } from '../../../utils'

interface ComingSoonProps {
  image: string
  number: string
  title: string
  marginRight?: boolean
}

export const ComingSoon = ({ image, number, title, marginRight }: ComingSoonProps) => {
  const isMobile = useMobileMode()
  const [imageLoad, setImageLoad] = useState(false)
  return (
    <Box
      backgroundColor="neutral.0"
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.08)"
      borderRadius="4px"
      my={10}
      mr={marginRight ? (isMobile ? 10 : 20) : 0}
    >
      <Box w={isMobile ? '325px' : '350px'}>
        <Skeleton isLoaded={imageLoad}>
          <Image
            w={isMobile ? '325px' : '350px'}
            h={isMobile ? '325px' : '350px'}
            borderRadius="4px"
            loading="eager"
            onLoad={() => setImageLoad(true)}
            objectFit="cover"
            src={image}
            alt="grant"
          />
          <Box p={2}>
            <Text fontWeight="bold" fontSize="3xl">
              {title}
            </Text>
            <Text fontSize="22px" fontWeight="medium">
              ROUND {number}: COMING SOON
            </Text>

            <HStack justifyContent="center" spacing="40px" alignItems="center" my={3}>
              <Box>
                <HStack justifyContent="center">
                  <SatoshiIconTilted />
                  <Text fontWeight="bold" fontSize="lg">
                    0 M
                  </Text>
                </HStack>
                <Text fontSize="md" color="neutral.600" fontWeight="bold">
                  CONTRIBUTED
                </Text>
              </Box>

              <Box>
                <HStack justifyContent="center">
                  <SatoshiIconTilted />
                  <Text fontWeight="bold" fontSize="lg">
                    0 M
                  </Text>
                </HStack>
                <Text fontSize="md" color="neutral.600" fontWeight="bold">
                  DISTRIBUTED
                </Text>
              </Box>
            </HStack>

            <Text
              width="100%"
              p={1}
              border="2px solid"
              borderColor="primary.400"
              rounded="md"
              textAlign="center"
              fontWeight="bold"
            >
              COMING SOON
            </Text>
          </Box>
        </Skeleton>
      </Box>
    </Box>
  )
}
