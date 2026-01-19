import { Badge, Box, Button, HStack, IconButton, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect } from 'react'
import { PiMinus, PiPlus } from 'react-icons/pi'
import { useLocation } from 'react-router'

import { ProjectRewardShippingEstimate } from '@/modules/project/forms/shippingConfigForm/ProjectRewardShippingEstimate'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { useRewardBuy } from '@/modules/project/pages/projectView/hooks'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography'
import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'

import { ProjectRewardFragment, RewardCurrency } from '../../../../../../../types'

interface IRewardItemProps {
  reward: ProjectRewardFragment
  showOnEmpty?: boolean
  showOnSelected?: boolean
  readOnly?: boolean
}

export const FundingFormRewardItem = ({ reward, showOnEmpty, showOnSelected, readOnly }: IRewardItemProps) => {
  const { count, isAvailable, addRewardToBasket, removeRewardFromBasket } = useRewardBuy(reward)

  const { project, formState } = useFundingFormAtom()

  const { formatUsdAmount, formatSatsAmount } = useCurrencyFormatter(true)

  const location = useLocation()

  useEffect(() => {
    if (
      location.state &&
      location.state.rewardUUID === reward.uuid &&
      (formState.rewardsByIDAndCount ? formState.rewardsByIDAndCount[reward.uuid] === 0 : true)
    ) {
      addRewardToBasket()
    }
  }, [location, reward.uuid, addRewardToBasket, isAvailable, formState.rewardsByIDAndCount])

  if ((count > 0 && showOnSelected) || (showOnEmpty && count === 0)) {
    return (
      <CardLayout dense w="full" direction="column" spacing={0} overflowX={'hidden'} justifyContent="space-between">
        <Box width="full" maxWidth={'100%'} overflow={'hidden'}>
          <ImageWithReload
            src={reward.images[0] || ''}
            alt={reward.name}
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </Box>
        <VStack padding={4} justifyContent="space-between" overflowX={'hidden'}>
          <VStack width="full" alignItems={'start'}>
            <Body width="full" size="md" medium>
              {reward.name}
            </Body>
            <HStack w="full" spacing={3} flexWrap={'wrap'}>
              <HStack justifyContent="start" spacing={3}>
                <Body size="xs" medium muted>
                  {t('Sold')}:{' '}
                  <Box as="span" color="utils.text" fontWeight={700}>
                    {reward.sold}
                  </Box>
                </Body>
                {reward.maxClaimable && (
                  <Body size="xs" medium muted>
                    {t('Available')}:{' '}
                    <Box as="span" color="utils.text" fontWeight={700}>
                      {reward.maxClaimable - reward.sold - count}
                    </Box>
                  </Body>
                )}
              </HStack>
              {reward.category && (
                <Badge variant="soft" colorScheme="neutral1" size="sm" textTransform={'capitalize'}>
                  {reward.category}
                </Badge>
              )}
            </HStack>

            <HStack flexWrap="wrap">
              <ProjectRewardShippingEstimate reward={reward} />
            </HStack>
          </VStack>
          <HStack
            flexDirection={'row'}
            w="full"
            justifyContent={'space-between'}
            alignItems={{ base: 'start', sm: 'end' }}
          >
            <Box
              display={'flex'}
              flexDirection={'row'}
              alignItems={'start'}
              justifyContent={'end'}
              flexWrap={'nowrap'}
              gap={1}
            >
              {project && project.rewardCurrency === RewardCurrency.Usdcent ? (
                <>
                  <Body bold dark>{`$${reward.cost / 100}`}</Body>
                  <Body medium muted>
                    {`(${formatSatsAmount(reward.cost)})`}
                  </Body>
                </>
              ) : (
                <>
                  <Body bold dark>
                    {`${reward.cost.toLocaleString()}`}
                    <Box as="span" color={'neutral1.9'}>
                      {' '}
                      sats
                    </Box>
                  </Body>
                  <Body medium muted>
                    {`(${formatUsdAmount(reward.cost)})`}
                  </Body>
                </>
              )}
            </Box>

            {count === 0 ? (
              <Button
                size="md"
                variant="surface"
                colorScheme="primary1"
                onClick={addRewardToBasket}
                isDisabled={!isAvailable}
                data-testid="add-reward-button"
              >
                {t('Buy')}
              </Button>
            ) : (
              <HStack
                backgroundColor={'utils.pbg'}
                border="1px solid"
                borderColor={'neutral1.6'}
                borderRadius="6px"
                alignItems="center"
                spacing={1}
              >
                <IconButton
                  aria-label="remove-reward"
                  size="md"
                  width="30px"
                  variant="ghost"
                  icon={<PiMinus />}
                  onClick={removeRewardFromBasket}
                />
                <Body size="md" px={1} pt="2px" medium>
                  {count}
                </Body>
                <IconButton
                  aria-label="select-reward"
                  size="md"
                  width="30px"
                  variant="ghost"
                  icon={<PiPlus />}
                  onClick={addRewardToBasket}
                  isDisabled={!isAvailable}
                />
              </HStack>
            )}
          </HStack>
        </VStack>
      </CardLayout>
    )
  }

  return null
}
