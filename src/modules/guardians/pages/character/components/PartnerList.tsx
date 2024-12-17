import { HStack, Image, VStack } from '@chakra-ui/react'

import { PartnerUrls } from '@/modules/guardians/data'
import { H2 } from '@/shared/components/typography'

export const PartnerList = () => {
  return (
    <>
      <VStack w="full" alignItems="flex-start">
        <H2 size={{ base: '32px', lg: '32px' }} dark bold>
          {'Partners'}
        </H2>
        <HStack w="full" alignItems="stretch" justifyContent="flex-start" flexWrap="wrap">
          <VStack spacing={8} w="full" alignItems="flex-start">
            <HStack flexWrap={'wrap'} spacing={8} justifyContent={'start'}>
              {PartnerUrls.slice(0, 3).map((url, index) => (
                <Image
                  src={url}
                  alt="Partner"
                  width={'auto'}
                  height={'40px'}
                  maxWidth={'200px'}
                  objectFit={'contain'}
                  key={url}
                />
              ))}
            </HStack>

            <HStack flexWrap={'wrap'} spacing={8} justifyContent={'start'}>
              {PartnerUrls.slice(3, 7).map((url, index) => (
                <Image
                  src={url}
                  alt="Partner"
                  width={'auto'}
                  height={'32px'}
                  maxWidth={'150px'}
                  objectFit={'contain'}
                  key={url}
                />
              ))}
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </>
  )
}
