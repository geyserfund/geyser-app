import { Box, Text, Stack, Container, Button, Badge } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { ProjectRewardForCreateUpdateFragment } from '../../../types/generated/graphql'
import { ICard } from '../../ui'

type Props = ICard & {
  reward: ProjectRewardForCreateUpdateFragment
  handleEdit?: any
  handleRemove?: any
  onRewardClick?: Function
}

export const RewardCard = ({
  reward,
  ...rest
}: Props) => {
  const { t } = useTranslation()

  return (
    <Box
      border='2px'
      borderColor='neutral.200'
      borderRadius={12}
      mt={2}
      p={3}
      pb={16}
      pos={'relative'}
    >
      <Stack direction='row' justify='space-between'>
        <Text fontWeight={700} fontSize={14}>{reward.name}</Text>
        <Stack direction='row'>
          <Text fontWeight={700} fontSize={14} color='neutral.600'>${reward.cost / 100}</Text>
        </Stack>
      </Stack>
      <Stack direction='column' gap={1}>
        <Box mt={2} mb={2} borderRadius={12} overflow={'hidden'}>
          <div style={{display: 'block', position: 'relative', paddingTop: '56.25%', width: '100%'}}>
            <div style={{display: 'block', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: `transparent url(${reward.image}) no-repeat center center / cover`}}>
            </div>
          </div>
        </Box>
        <Stack direction={"row"} justifyContent="space-between" align="center" alignItems={'center'}>
          <Text fontWeight={400} fontSize='14px' color='neutral.900'>{reward.stock && reward.stock >= 0 ? `${reward.stock} ${t('remaining')}, ` : ''}{reward.sold || 0} {t('sold')}</Text>
          <Badge backgroundColor={'neutral.100'} textTransform={'none'} fontWeight={'medium'} p={1}>
            {reward.rewardType === 'PHYSICAL' ? t('Physical Item') : t('Digital Item')}
          </Badge>
        </Stack>
        <Text fontWeight={400} fontSize='sm' color='neutral.500'>{reward.description}</Text>
        <Container pos={'absolute'} bottom={3} left={3} right={3} width={'auto'} p={0}>
          <Stack direction='row' style={{ marginTop: '10px' }}>
            <Button
              variant='primary'
              size='sm'
              onClick={(e) => {
                rest.onRewardClick?.(e);
              }}
              style={{ flex: 1 }}
            >
              <Text isTruncated>{t('Add to Basket')}</Text>
            </Button>
          </Stack>
        </Container>
      </Stack>
    </Box>
  )
}
