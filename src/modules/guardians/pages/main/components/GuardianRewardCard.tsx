import { Box, Button, Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useNavigate } from 'react-router'

import { GuardianRewardType, RewardMap } from '@/modules/guardians/data.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { GuardianProjectRewardFragment } from '@/types/index.ts'
import { centsToDollars, commaFormatted } from '@/utils/index.ts'

import { GUARDIANS_PROJECT_NAME } from '../../character/components/GuardiansPrice.tsx'
import { GuardianHoverEffectImage } from './GuardianHoverEffectImage.tsx'
import { MediaCarouselForGuardianRewards } from './MediaCarouselForGuardianRewards.tsx'

/** Component that displays a guardian reward card with image, name, availability and price */
export const GuardianRewardCard = ({
  reward,
  rewardMap,
}: {
  reward: GuardianProjectRewardFragment
  rewardMap?: RewardMap
}) => {
  const navigate = useNavigate()

  const { name, cost, maxClaimable, sold, uuid } = reward
  const available = maxClaimable ? maxClaimable - sold : 0
  const totalSupply = maxClaimable || 0

  const handleBuy = () => {
    navigate(getPath('projectFunding', GUARDIANS_PROJECT_NAME), {
      state: { rewardUUID: uuid },
    })
  }

  const isCard = rewardMap?.type === GuardianRewardType.Card
  const isBadge = rewardMap?.type === GuardianRewardType.Badge
  const itemsModal = useModal()

  const buyButton = () => {
    return (
      <Button size="lg" width="full" maxWidth="200px" bg="black" color="white" onClick={handleBuy}>
        {t('Buy')}
      </Button>
    )
  }

  return (
    <>
      <VStack width="full" maxWidth="400px" spacing={{ base: 2, lg: 4 }}>
        <Box
          position="relative"
          width="full"
          borderRadius="md"
          overflow="hidden"
          _hover={{ cursor: 'pointer' }}
          padding={isCard ? 6 : 0}
          onClick={() => itemsModal.onOpen()}
        >
          {isCard ? (
            <GuardianHoverEffectImage
              src={rewardMap?.image}
              alt={name}
              width="full"
              height="auto"
              guardian={rewardMap?.guardian}
            />
          ) : (
            <Image src={rewardMap?.image} alt={name} width="full" height="auto" />
          )}
        </Box>

        <VStack width="full" align="center" spacing={0} marginTop={isBadge ? '-20px' : undefined}>
          <Body
            textTransform="uppercase"
            bold
            fontSize={{ base: '20px', lg: '32px' }}
            textAlign="center"
            lineHeight={1}
          >
            {name}
          </Body>

          {maxClaimable && !isBadge && (
            <Body
              fontSize={{ base: '18px', lg: '22px', xl: '28px' }}
              light
              textTransform="uppercase"
              bold
              lineHeight={1}
            >
              <Body as="span" color={`guardians.${rewardMap?.guardian}.text`}>
                {available}{' '}
              </Body>{' '}
              {t('OF')}{' '}
              <Body as="span" color={`guardians.${rewardMap?.guardian}.text`}>
                {totalSupply}
              </Body>{' '}
              {t('REMAINING')}
            </Body>
          )}

          <Body fontWeight={500} fontSize={{ base: '20px', lg: '32px' }} lineHeight={1}>
            {t('Price')}: ${commaFormatted(centsToDollars(cost))}
          </Body>
        </VStack>
        {buyButton()}
      </VStack>
      {itemsModal.isOpen && (
        <MediaCarouselForGuardianRewards
          {...itemsModal}
          imageLinkList={reward.images}
          data={{
            name: reward.name || '',
            description: reward.description || '',
          }}
          bottomContent={buyButton()}
        />
      )}
    </>
  )
}
