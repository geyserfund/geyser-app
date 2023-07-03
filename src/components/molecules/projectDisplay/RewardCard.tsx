import { CloseIcon } from '@chakra-ui/icons'
import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BiPencil } from 'react-icons/bi'

import { TRewards } from '../../../pages/projectCreate/types'
import { ProjectRewardForCreateUpdateFragment } from '../../../types/generated/graphql'
import { CardLayout } from '../../layouts'
import { ICard, IconButtonComponent, ImageWithReload } from '../../ui'

type Props = ICard & {
  reward: TRewards | ProjectRewardForCreateUpdateFragment
  handleEdit?: any
  handleRemove?: any
}

export const RewardCard = ({
  reward,
  handleEdit,
  handleRemove,
  ...rest
}: Props) => {
  const { t } = useTranslation()
  const onEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (handleEdit) {
      handleEdit()
    }
  }

  const onRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (handleRemove) {
      handleRemove()
    }
  }

  return (
    <CardLayout hover click alignItems="flex-start" padding="10px" {...rest}>
      <VStack width="100%">
        <HStack width="100%" justifyContent={'space-between'} paddingX="4px">
          <HStack>
            <VStack spacing="0px">
              <Text color={'neutral.1000'} fontWeight="bold">
                {/*
                    Divided by 100 as cost is in cents
                  */}
                {`$ ${reward.cost / 100}`}
              </Text>
              <Text
                whiteSpace="nowrap"
                fontSize="12px"
                color={'neutral.1000'}
                fontWeight="bold"
              >
                {t('per item')}
              </Text>
            </VStack>
            <VStack spacing="0px" alignItems="flex-start">
              <Text fontWeight={500} color="neutral.900">
                {reward.name}
              </Text>
              <Text
                fontSize="12px"
                backgroundColor="neutral.200"
                padding="2px 5px"
                borderRadius="4px"
              >
                <b>{reward.sold || 0}</b> {t('collected')}
              </Text>
            </VStack>
          </HStack>

          <HStack>
            {handleEdit && (
              <IconButtonComponent
                noBorder
                aria-label="edit-reward"
                size="sm"
                icon={<BiPencil fontSize="16px" />}
                onClick={onEdit}
              />
            )}
            {handleRemove && (
              <IconButtonComponent
                noBorder
                aria-label="edit-reward"
                size="sm"
                icon={<CloseIcon />}
                _hover={{ backgroundColor: 'red.100' }}
                onClick={onRemove}
              />
            )}
          </HStack>
        </HStack>
        <Box>
          <ImageWithReload
            borderRadius="4px"
            src={reward.image || ''}
            width="335px"
            height="192px"
            objectFit="cover"
            noCacheId={(Math.random() + 1).toString(36).substring(7)}
          />
        </Box>

        <Text width="100%" paddingX="5px">
          {reward.description}
        </Text>
      </VStack>
    </CardLayout>
  )
}
