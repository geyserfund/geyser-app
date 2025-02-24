import { HStack, Image, Link, VStack } from '@chakra-ui/react'

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
              {PartnerUrls.slice(0, 3).map((partner, index) => (
                <Link href={partner.link} isExternal key={partner.image}>
                  <Image
                    src={partner.image}
                    alt="Partner"
                    width={'auto'}
                    height={'40px'}
                    maxWidth={'200px'}
                    objectFit={'contain'}
                  />
                </Link>
              ))}
            </HStack>

            <HStack flexWrap={'wrap'} spacing={8} justifyContent={'start'}>
              {PartnerUrls.slice(3, 8).map((partner, index) => (
                <Link href={partner.link} isExternal key={partner.image}>
                  <Image
                    src={partner.image}
                    alt="Partner"
                    width={'auto'}
                    height={'32px'}
                    maxWidth={'150px'}
                    objectFit={'contain'}
                  />
                </Link>
              ))}
            </HStack>
            <HStack flexWrap={'wrap'} spacing={8} justifyContent={'start'}>
              {PartnerUrls.slice(8, 10).map((partner, index) => (
                <Link href={partner.link} isExternal key={partner.image}>
                  <Image
                    src={partner.image}
                    alt="Partner"
                    width={'auto'}
                    height={'32px'}
                    maxWidth={'150px'}
                    objectFit={'contain'}
                  />
                </Link>
              ))}
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </>
  )
}
