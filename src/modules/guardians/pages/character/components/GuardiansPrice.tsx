import { Button, Divider, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { Trans } from 'react-i18next'
import { useNavigate } from 'react-router'

import { guardianRewardsAtom } from '@/modules/guardians/state/guardianRewards'
import { Body, H2 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { fonts } from '@/shared/styles'
import { GuardianType } from '@/types'
import { centsToDollars } from '@/utils'

import { CharacterAssets } from '../characterAssets'

const GUARDIANS_PROJECT_NAME = 'geyserguardians'

export const GuardiansPrice = ({
  currentGuardian,
  showOnlyButton,
}: {
  currentGuardian: GuardianType
  showOnlyButton?: boolean
}) => {
  const navigate = useNavigate()

  const guardianRewards = useAtomValue(guardianRewardsAtom)

  const guardianAsset = CharacterAssets[currentGuardian]

  const { rewardUUIDs } = guardianAsset

  const guardianDiscountReward = guardianRewards.find((reward) => reward.uuid === rewardUUIDs.discount)
  const guardianMainReward = guardianRewards.find((reward) => reward.uuid === rewardUUIDs.main)

  if (!guardianMainReward || !guardianDiscountReward) return null

  const mainPrice = guardianMainReward.cost
  const discountPrice = guardianDiscountReward.cost
  const remainingDiscountItems =
    (guardianDiscountReward.maxClaimable && guardianDiscountReward.maxClaimable - guardianDiscountReward.sold) || 0
  const discountRemains = remainingDiscountItems > 0

  return (
    <>
      <VStack w="full" alignItems={showOnlyButton ? 'center' : 'flex-start'} spacing={3}>
        {!showOnlyButton && (
          <VStack w="full" alignItems="flex-start" spacing={0}>
            <H2 size={{ base: '32px', lg: '32px' }} dark fontWeight={600}>
              {t('Price')}: {discountRemains && <Body as="span" bold>{`$${centsToDollars(discountPrice)}`}</Body>}{' '}
              <Body
                as="span"
                color={discountRemains ? 'utils.text' : 'neutral1.11'}
                textDecoration={discountRemains ? 'line-through' : 'none'}
              >
                {`$${centsToDollars(mainPrice)}`}
              </Body>
            </H2>
            {discountRemains && (
              <Body fontWeight={600} textTransform="uppercase">
                <Trans
                  i18nKey="The first <1>{{discountItems}}</1> {{guardian}}s get <3>10%</3> OFF. <5>{{remainingDiscounts}}</5> left."
                  values={{
                    discountItems: guardianDiscountReward.maxClaimable,
                    guardian: guardianAsset.title,
                    remainingDiscounts: remainingDiscountItems,
                  }}
                >
                  {'The first '}
                  <Body as="span" color={`guardians.${currentGuardian}.text`}>
                    {'{{discountItems}}'}
                  </Body>
                  {' {{guardian}}s get '}
                  <Body as="span" color={`guardians.${currentGuardian}.text`}>
                    {'10%'}
                  </Body>
                  {' OFF. '}
                  <Body as="span" color={`guardians.${currentGuardian}.text`}>
                    {'{{remainingDiscounts}}'}
                  </Body>
                  {' left.'}
                </Trans>
              </Body>
            )}
          </VStack>
        )}
        <Button
          variant="solid"
          colorScheme="neutral1"
          size="xl"
          backgroundColor={`guardians.${currentGuardian}.button`}
          fontFamily={fonts.cormorant}
          minWidth="256px"
          onClick={() =>
            navigate(getPath('projectFunding', GUARDIANS_PROJECT_NAME), {
              state: { rewardUUID: discountRemains ? rewardUUIDs.discount : rewardUUIDs.main },
            })
          }
        >
          {`Become a ${guardianAsset.title}`}
        </Button>
      </VStack>
      {!showOnlyButton && <Divider borderColor={'neutral1.6'} />}
    </>
  )
}
