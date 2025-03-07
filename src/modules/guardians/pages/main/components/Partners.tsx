import { HStack, Image, Link } from '@chakra-ui/react'
import { t } from 'i18next'

import { PartnerUrls } from '@/modules/guardians/data'

import { GuardianBody } from '../GuardiansMainPage.tsx'

const PartnerPromotionUrl = 'https://geyser.fund/project/geyserpromotions/rewards/view/6236?hero=geyser'

export const Partners = () => {
  return (
    <>
      <GuardianBody>{t('Bitcoin brands empowering creators to drive adoption worldwide.')}</GuardianBody>
      <HStack flexWrap={'wrap'} spacing={8} justifyContent={'center'}>
        {PartnerUrls.slice(0, 4).map((partner, index) => (
          <Link href={partner.link} isExternal key={partner.image}>
            <Image
              src={partner.image}
              alt="Partner"
              maxWidth="315px"
              width={'auto'}
              height={'72px'}
              objectFit={'contain'}
              key={partner.image}
            />
          </Link>
        ))}
      </HStack>

      <HStack flexWrap={'wrap'} spacing={8} justifyContent={'center'}>
        {PartnerUrls.slice(4, 7).map((partner, index) => (
          <Link href={partner.link} isExternal key={partner.image}>
            <Image
              src={partner.image}
              alt="Partner"
              maxWidth="315px"
              width={'auto'}
              height={'40px'}
              objectFit={'contain'}
              key={partner.image}
            />
          </Link>
        ))}
      </HStack>

      <HStack flexWrap={'wrap'} spacing={8} justifyContent={'center'}>
        {PartnerUrls.slice(7, 9).map((partner, index) => (
          <Link href={partner.link} isExternal key={partner.image}>
            <Image
              src={partner.image}
              alt="Partner"
              maxWidth="161px"
              width={'auto'}
              height={'50px'}
              objectFit={'contain'}
              key={partner.image}
            />
          </Link>
        ))}
      </HStack>

      <Link href={PartnerPromotionUrl} textDecoration={'underline'}>
        <GuardianBody>{t('Become our partner')}</GuardianBody>
      </Link>
    </>
  )
}
