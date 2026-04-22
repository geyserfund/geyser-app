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
import { FormatCurrencyType, useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'

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

  const { formatAmount, formatUsdAmount, formatSatsAmount } = useCurrencyFormatter(true)

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
            <Body width="full" size="md" medium sx={{ textWrap: 'balance' }}>
              {reward.name}
            </Body>
            <HStack w="full" spacing={3} flexWrap={'wrap'}>
              <HStack justifyContent="start" spacing={3}>
                <Body size="xs" medium muted sx={{ fontVariantNumeric: 'tabular-nums' }}>
                  {t('Sold')}:{' '}
                  <Box as="span" color="utils.text" fontWeight={700}>
                    {reward.sold}
                  </Box>
                </Body>
                {reward.maxClaimable && (
                  <Body size="xs" medium muted sx={{ fontVariantNumeric: 'tabular-nums' }}>
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
                  <Body bold dark sx={{ fontVariantNumeric: 'tabular-nums' }}>
                    {formatAmount(reward.cost, FormatCurrencyType.Usdcent)}
                  </Body>
                  <Body medium muted sx={{ fontVariantNumeric: 'tabular-nums' }}>
                    {`(${formatSatsAmount(reward.cost)})`}
                  </Body>
                </>
              ) : (
                <>
                  <Body bold dark sx={{ fontVariantNumeric: 'tabular-nums' }}>
                    {`${reward.cost.toLocaleString()}`}
                    <Box as="span" color={'neutral1.9'}>
                      {' '}
                      sats
                    </Box>
                  </Body>
                  <Body medium muted sx={{ fontVariantNumeric: 'tabular-nums' }}>
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
                sx={{
                  transition: 'transform 0.1s cubic-bezier(0.2, 0, 0, 1), background-color 0.2s',
                  '&:active:not(:disabled)': { transform: 'scale(0.96)' },
                }}
              >
                {t('Buy')}
              </Button>
            ) : (
              <HStack
                backgroundColor={'utils.pbg'}
                border="1px solid"
                borderColor={'neutral1.6'}
                borderRadius="4px"
                alignItems="center"
                spacing={1}
              >
                <IconButton
                  aria-label={t('Remove reward')}
                  size="md"
                  width="30px"
                  variant="ghost"
                  icon={<PiMinus />}
                  onClick={removeRewardFromBasket}
                  sx={{
                    transition: 'transform 0.1s cubic-bezier(0.2, 0, 0, 1)',
                    '&:active:not(:disabled)': { transform: 'scale(0.9)' },
                  }}
                />
                <Body size="md" px={1} pt="2px" medium sx={{ fontVariantNumeric: 'tabular-nums' }}>
                  {count}
                </Body>
                <IconButton
                  aria-label={t('Add reward')}
                  size="md"
                  width="30px"
                  variant="ghost"
                  icon={<PiPlus />}
                  onClick={addRewardToBasket}
                  isDisabled={!isAvailable}
                  sx={{
                    transition: 'transform 0.1s cubic-bezier(0.2, 0, 0, 1)',
                    '&:active:not(:disabled)': { transform: 'scale(0.9)' },
                  }}
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
