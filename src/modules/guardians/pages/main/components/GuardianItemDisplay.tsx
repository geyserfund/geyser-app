import { Box, HStack, Image, Link, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { RewardDetails, RewardMap } from '@/modules/guardians/data.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { GuardianProjectRewardFragment } from '@/types/index.ts'

import { GuardianSubHeader } from '../GuardiansMainPage.tsx'
import { GuardianRewardCard } from './GuardianRewardCard.tsx'

export const GuardianItemDisplay = ({
  details,
  rewards,
  rewardsMap,
}: {
  details: RewardDetails
  rewards: GuardianProjectRewardFragment[]
  rewardsMap: RewardMap[]
}) => {
  return (
    <VStack w="full" spacing={8}>
      <VStack w="full" spacing={1} id={`guardians-${details.rewardType}`}>
        <GuardianSubHeader textTransform="uppercase" lineHeight={1} textAlign={'center'}>
          {details.title}
        </GuardianSubHeader>
        <HStack w="full" flexWrap={'wrap'} justifyContent={'center'}>
          <Body fontSize={{ base: '20px', lg: '36px' }} textAlign={'center'}>
            {t('In partnership with')}
          </Body>
          {details.partners.map((partner, index) => {
            return (
              <HStack key={partner.link}>
                <Box as={Link} href={partner.link} isExternal>
                  <Image
                    src={partner.image}
                    alt={`${partner.name} partner image`}
                    maxHeight={{ base: '30px', lg: '50px' }}
                    maxWidth="250px"
                  />
                </Box>
                {index < details.partners.length - 1 && <Body fontSize={{ base: '20px', lg: '36px' }}>{t('&')}</Body>}
              </HStack>
            )
          })}
        </HStack>
      </VStack>
      <HStack
        w="full"
        justifyContent={'center'}
        paddingX={{ base: 4, lg: 12 }}
        spacing={{ base: 12, lg: '4%', '3xl': '8%' }}
        // paddingX={{ base: 4, md: '20px', lg: '60px', xl: '80px', '2xl': '100px', '3xl': '160px' }}
        flexDirection={{ base: 'column', lg: 'row' }}
        // spacing={{ base: 12, md: 0 }}
      >
        {rewards.map((reward) => {
          return (
            <GuardianRewardCard
              key={reward.uuid}
              reward={reward}
              rewardMap={rewardsMap.find((map) => map.rewardUUID === reward.uuid)}
            />
          )
        })}
      </HStack>
    </VStack>
  )
}
