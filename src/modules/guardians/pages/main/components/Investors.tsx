import { HStack, Image, Link, Tooltip } from '@chakra-ui/react'
import { t } from 'i18next'

import { InvestorData } from '@/modules/guardians/data'

import { GuardianBody } from '../GuardiansMainPage.tsx'

export const Investors = () => {
  return (
    <>
      <GuardianBody>{t('Investors committed to Bitcoin’s mission of openness, freedom, and innovation.')}</GuardianBody>
      <HStack flexWrap={'wrap'} spacing={10} justifyContent={'center'}>
        {InvestorData.map((partner) => (
          <Tooltip label={partner.name} key={partner.image}>
            <Link href={partner.link} isExternal key={partner.image}>
              <Image
                src={partner.image}
                alt="Partner"
                maxWidth="300px"
                width={'auto'}
                height={'95px'}
                objectFit={'contain'}
                key={partner.image}
              />
            </Link>
          </Tooltip>
        ))}
      </HStack>
    </>
  )
}
