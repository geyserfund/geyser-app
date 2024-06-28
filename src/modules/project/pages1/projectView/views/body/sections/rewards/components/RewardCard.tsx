import { DeleteIcon } from '@chakra-ui/icons'
import { Badge, Box, Button, HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiNotePencil } from 'react-icons/pi'

import { ICard, ImageWithReload } from '../../../../../../../../../components/ui'
import { MarkdownField } from '../../../../../../../../../forms/markdown/MarkdownField'
import { CardLayout } from '../../../../../../../../../shared/components/layouts'
import { Body } from '../../../../../../../../../shared/components/typography'
import { secondaryColors } from '../../../../../../../../../styles'
import { ProjectStatus } from '../../../../../../../../../types'
import {
  ProjectRewardForCreateUpdateFragment,
  RewardCurrency,
} from '../../../../../../../../../types/generated/graphql'
import { useProjectAtom } from '../../../../../../../hooks/useProjectAtom'
import { ProjectRewardShippingEstimate } from './ProjectRewardShippingEstimate'

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
    <CardLayout p={0} w="full" overflow={'hidden'} spacing={0}>
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
      <VStack padding={4} alignItems="start" flex={1}>
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
        <HStack>
          <Badge variant="soft" colorScheme="neutral1" size="sm" textTransform={'capitalize'}>
            {reward.category}
          </Badge>
          <ProjectRewardShippingEstimate reward={reward} />
        </HStack>
        <Box
          fontSize="14px"
          color="neutral1.11"
          sx={{
            p: {
              marginTop: '0px',
            },
          }}
          flex={1}
        >
          <MarkdownField preview content={reward.description || ''} />
        </Box>
        <HStack w="full" justifyContent={'space-between'}>
          {project && project.rewardCurrency === RewardCurrency.Usdcent ? (
            <Body bold dark>{`$${reward.cost / 100}`}</Body>
          ) : (
            <Body bold dark>
              {`${reward.cost.toLocaleString()}`}
              <Box as="span" color={'neutral1.9'}>
                {' '}
                Sats
              </Box>
            </Body>
          )}

          {!isLaunch ? (
            <Button
              size="sm"
              variant="solid"
              colorScheme="neutral1"
              minWidth="80px"
              onClick={(e) => {
                onRewardClick?.(e)
              }}
              isDisabled={!isRewardAvailable || project?.status === ProjectStatus.Inactive}
            >
              {t('Buy')}
            </Button>
          ) : (
            <Box>
              <IconButton
                aria-label="edit-reward"
                flexGrow={1}
                variant="solid"
                colorScheme="neutral1"
                size="sm"
                minWidth={'24px'}
                onClick={(e) => {
                  handleEdit?.(e)
                }}
                icon={<PiNotePencil />}
              />
              <Button
                bg={secondaryColors.red}
                color="neutral.0"
                _hover={{ color: 'neutral.900', bg: 'neutral.400' }}
                onClick={(e) => handleRemove?.(e)}
              >
                <DeleteIcon />
              </Button>
            </Box>
          )}
        </HStack>
      </VStack>
    </CardLayout>
  )
}
