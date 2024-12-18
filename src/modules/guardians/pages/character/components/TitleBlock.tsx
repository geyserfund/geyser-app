import { Divider, HStack, Icon, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { Trans } from 'react-i18next'
import { PiDotOutline } from 'react-icons/pi'

import { guardianRewardsAtom } from '@/modules/guardians/state/guardianRewards'
import { Body, H1 } from '@/shared/components/typography'
import { GuardianType } from '@/types'
import { useMobileMode } from '@/utils'

import { CharacterAssets } from '../characterAssets'

export const TitleBlock = ({ currentGuardian }: { currentGuardian: GuardianType }) => {
  const isMobileMode = useMobileMode()

  const guardianAsset = CharacterAssets[currentGuardian]
  const guardianColor = `guardians.${currentGuardian}.text`

  const guardianRewards = useAtomValue(guardianRewardsAtom)

  const guardianMainReward = guardianRewards.find((reward) => reward.uuid === guardianAsset.rewardUUIDs.main)
  const guardianDiscountReward = guardianRewards.find((reward) => reward.uuid === guardianAsset.rewardUUIDs.discount)

  const totalRewards = guardianMainReward?.maxClaimable ?? 0
  const mainRewardSold = guardianMainReward?.sold ?? 0
  const discountRewardSold = guardianDiscountReward?.sold ?? 0

  const remainingRewards = totalRewards - mainRewardSold - discountRewardSold

  return (
    <VStack w="full" alignItems="flex-start">
      <VStack spacing={0} w="full" alignItems="flex-start">
        <H1
          size="64px"
          lineHeight={'64px'}
          color={guardianColor}
          display={{ base: 'none', lg: 'flex' }}
          bold
          textTransform={'uppercase'}
        >
          {guardianAsset.title}
        </H1>

        <Body size={{ base: 'xl', lg: '2xl' }} bold textTransform={'uppercase'} muted>
          {remainingRewards > 0 ? (
            <Trans
              i18nKey={'Available <1>{{remainingRewards}}</1> of <3>{{totalRewards}}</3>'}
              values={{ remainingRewards, totalRewards }}
            >
              {'Available '}
              <Body as="span" color={`guardians.${currentGuardian}.text`} bold>
                {'{{remainingRewards}}'}
              </Body>
              {' of '}
              <Body as="span" color={`guardians.${currentGuardian}.text`} bold>
                {'{{totalRewards}}'}
              </Body>
            </Trans>
          ) : (
            t('Infinite army')
          )}
        </Body>
        <Body size={{ base: 'md', lg: '2xl' }} medium lineHeight={'1.2'}>
          {guardianAsset.description}
        </Body>
      </VStack>

      <Divider borderColor={'neutral1.6'} />
      <HStack w="full" spacing={2} alignItems={{ base: 'flex-start', lg: 'center' }} flexWrap="wrap">
        {guardianAsset.abilities.map((ability, index) => {
          return (
            <>
              <Body color={guardianColor} textTransform={'uppercase'} bold>
                {ability}
              </Body>
              {index !== guardianAsset.abilities.length - 1 && !isMobileMode && (
                <Icon as={PiDotOutline} color={guardianColor} />
              )}
            </>
          )
        })}
      </HStack>
      <Divider borderColor={'neutral1.6'} />
    </VStack>
  )
}
