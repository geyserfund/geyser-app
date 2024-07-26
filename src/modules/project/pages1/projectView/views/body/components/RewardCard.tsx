import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { ProjectRewardAvailability } from '../../../../../../../components/molecules/projectDisplay/ProjectRewardAvailability'
import { ProjectRewardShippingEstimate } from '../../../../../../../components/molecules/projectDisplay/ProjectRewardShippingEstimate'
import { Body1, Body2 } from '../../../../../../../components/typography'
import { ICard, ImageWithReload } from '../../../../../../../components/ui'
import { MarkdownField } from '../../../../../../../forms/markdown/MarkdownField'
import { CardLayout } from '../../../../../../../shared/components/layouts'
import { Body } from '../../../../../../../shared/components/typography'
import { secondaryColors } from '../../../../../../../styles'
import { ProjectStatus } from '../../../../../../../types'
import { ProjectRewardForCreateUpdateFragment, RewardCurrency } from '../../../../../../../types/generated/graphql'
import { useProjectAtom } from '../../../hooks'

type Props = ICard & {
  reward: ProjectRewardForCreateUpdateFragment
  count: number
  handleEdit?: any
  handleRemove?: any
  onRewardClick?: Function
  isLaunch?: boolean
}

export const RewardCard = ({ reward, count, isLaunch = false, handleEdit, handleRemove, onRewardClick }: Props) => {
  const { t } = useTranslation()
  const { project } = useProjectAtom()

  const isRewardAvailable = reward.maxClaimable ? reward.maxClaimable - reward.sold > count : true

  return (
    <>
      <CardLayout p={0} maxWidth="285px" w="full" overflow={'hidden'}>
        {reward.image && (
          <Box borderColor={'neutral.700'} overflow={'hidden'} width="100%" position="relative" paddingTop="75%">
            <ImageWithReload
              src={reward.image || ''}
              alt={reward.name}
              width="100%"
              height="100%"
              objectFit="cover"
              position="absolute"
              top={0}
              left={0}
            />
          </Box>
        )}
        <VStack padding={4}>
          <Body size="md" medium>
            {reward.name}
          </Body>
          <HStack w="full" justifyContent="start" spacing={3}>
            <Body size="xs" medium muted>
              {t('Sold')}:{' '}
              <Box as="span" color="utils.text" fontWeight={700}>
                {reward.sold}
              </Box>
            </Body>
            {reward.stock && (
              <Body size="xs" medium muted>
                {t('Available')}:{' '}
                <Box as="span" color="utils.text" fontWeight={700}>
                  {reward.stock - reward.sold - count}
                </Box>
              </Body>
            )}
          </HStack>
        </VStack>
      </CardLayout>

      <CardLayout p={'20px'} pos={'relative'} direction="column" spacing="10px" justifyContent={'space-between'}>
        <VStack spacing="10px" alignItems="start">
          <HStack w="full" justify="space-between">
            <Body1 xBold color="neutral.900">
              {reward.name}
            </Body1>
            <HStack>
              <Body1 xBold color="neutral.600">
                {project && project.rewardCurrency === RewardCurrency.Usdcent
                  ? `$${reward.cost / 100}`
                  : `${reward.cost.toLocaleString()} sats`}
              </Body1>
            </HStack>
          </HStack>
          {reward.image && (
            <Box
              borderRadius={8}
              border="1px solid"
              borderColor={'neutral.700'}
              overflow={'hidden'}
              width="100%"
              position="relative"
              paddingTop="75%"
            >
              <ImageWithReload
                src={reward.image || ''}
                alt={reward.name}
                width="100%"
                height="100%"
                objectFit="cover"
                position="absolute"
                top={0}
                left={0}
              />
            </Box>
          )}
          <HStack w="full" justifyContent="space-between" align="center" alignItems={'center'}>
            <Text fontWeight={400} fontSize="14px" color="neutral.900">
              <ProjectRewardAvailability reward={reward} />
              {reward.sold || 0} {t('backers')}
            </Text>
            {reward.category && (
              <Body2 color="neutral.900" xBold>
                {reward.category}
              </Body2>
            )}
          </HStack>
          <ProjectRewardShippingEstimate w="full" reward={reward} />
          <MarkdownField preview content={reward.description || ''} />
        </VStack>
        <HStack>
          {!isLaunch ? (
            <Button
              variant="primaryNeutral"
              size="sm"
              height={'40px'}
              flexGrow={1}
              onClick={(e) => {
                onRewardClick?.(e)
              }}
              isDisabled={!isRewardAvailable || project?.status === ProjectStatus.Inactive}
            >
              <Text fontSize={16} fontWeight={500} isTruncated>
                {t('Select item')}
              </Text>
            </Button>
          ) : (
            <>
              <Button
                flexGrow={1}
                variant="primaryNeutral"
                size="sm"
                height={'40px'}
                onClick={(e) => {
                  handleEdit?.(e)
                }}
              >
                <Text fontSize={16} fontWeight={500} isTruncated>
                  {t('Edit')}
                </Text>
              </Button>
              <Button
                bg={secondaryColors.red}
                color="neutral.0"
                _hover={{ color: 'neutral.900', bg: 'neutral.400' }}
                onClick={(e) => handleRemove?.(e)}
              >
                <DeleteIcon />
              </Button>
            </>
          )}
        </HStack>
      </CardLayout>
    </>
  )
}
