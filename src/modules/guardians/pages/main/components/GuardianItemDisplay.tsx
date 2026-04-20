import { Box, HStack, Image, Link, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { RewardDetails, RewardMap } from '@/modules/guardians/utils/constants.ts'
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
      <StackHeader details={details} />
      <HStack
        w="full"
        justifyContent={'center'}
        paddingX={{ base: 4, lg: 12 }}
        spacing={{ base: 12, lg: '4%', '3xl': '8%' }}
        flexDirection={{ base: 'column', lg: 'row' }}
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

const StackHeader = ({ details }: { details: RewardDetails }) => {
  return (
    <Stack
      w="full"
      id={`guardians-${details.rewardType}`}
      direction={{ base: 'column', md: 'row' }}
      spacing={{ base: 3, md: 6 }}
      justify="space-between"
      align={{ base: 'flex-start', md: 'center' }}
    >
      <GuardianSubHeader
        textTransform="none"
        lineHeight={1}
        textAlign="left"
        fontSize={{ base: '18px', md: '22px', lg: '26px', xl: '32px' }}
      >
        {details.title}
      </GuardianSubHeader>
      <HStack w={{ base: 'full', md: 'auto' }} flexWrap="wrap" justify="flex-end" align="flex-end">
        <Body fontSize={{ base: '14px', lg: '16px' }} textAlign="right" color="neutral1.9">
          {t('in partnership with')}
        </Body>
        {details.partners.map((partner, index) => {
          return (
            <HStack key={partner.link} align="flex-end">
              <Box as={Link} href={partner.link} isExternal>
                <Image
                  src={partner.image}
                  alt={`${partner.name} partner image`}
                  maxHeight={{ base: '30px', lg: '40px' }}
                  maxWidth="220px"
                />
              </Box>
              {index < details.partners.length - 1 && (
                <Body fontSize={{ base: '14px', lg: '16px' }} color="neutral1.9">
                  {t('&')}
                </Body>
              )}
            </HStack>
          )
        })}
      </HStack>
    </Stack>
  )
}
