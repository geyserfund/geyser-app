import {
  Box,
  HStack,
  Text,
  VStack,
  Stack,
  Button,
  IconButton,
  SkeletonCircle,
  SimpleGrid,
  Avatar,
  useTheme,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import {
  ProjectReward
} from '../../../types'
import { CardLayout } from '../../layouts'
import { CopyRewardLink } from '../../../pages/projectView/projectMainBody/components/CopyRewardLink'
import { useBTCConverter } from '../../../helpers'
import { USDCents } from '../../../types'
import { useState } from 'react'
import { UserAvatar } from '../../ui/UserAvatar'

type Props = {
  reward: ProjectReward
  onSelectReward: Function
}

export const RewardCard = ({
  reward,
  onSelectReward
}: Props) => {
  const { t } = useTranslation()
  const { colors } = useTheme()

  const [hoveredBackground, setHoveredBackground] = useState("")

  return (
    <CardLayout id={`reward-id-${reward.id}`} alignItems="flex-start" padding="20px">
      <SimpleGrid columns={2} spacing={2} width={'100%'}>
        <Stack direction='column' spacing={2} pr={4}>
          <div style={{display: 'block', position: 'relative', paddingTop: '100%', width: '100%', borderRadius: '12px', overflow: 'hidden'}}>
            <div style={{display: 'block', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: `transparent url(${hoveredBackground ? hoveredBackground : reward.image}) no-repeat center center / cover`}}>
            </div>
          </div>
          <Text fontWeight={500}>{reward.sold || 0} {t('backers')}</Text>
          <HStack ml={0} spacing={0} alignItems="start">
            {reward.funders && reward.funders.length > 0 && (
              <>
              {reward.funders.map(funder => (
                <UserAvatar
                  size="sm"
                  border={`2px solid ${colors.neutral[0]}`}
                  display="inline-block"
                  marginLeft="-5px"
                  user={funder.user}
                />
              ))}
              </>
            )}
          </HStack>
        </Stack>
        <Stack direction='column' spacing={2} mb={4}>
          <Text fontWeight={700} fontSize={24} color='neutral.900'>{reward.name}</Text>
          <Stack direction='row'>
            <Text fontWeight={700} fontSize={16} color='neutral.900'>${reward.cost / 100}</Text>
          </Stack>
          <Stack direction='row'>
            <Text fontWeight={500} color='neutral.900'>{reward.maxClaimable - (reward.sold || 0)} remaining</Text>
            <Text fontWeight={500} color='neutral.600'> · {t('Estimated delivery')}: {new Date(reward.estimatedDeliveryDate * 1000).toLocaleDateString('en-us', { year:"numeric", month:"short"})}
            </Text>
          </Stack>
          <Text fontWeight={500} color='neutral.600'>{reward.description}</Text>
          <Stack direction='column' spacing={1} mt={3}>
            {reward.products && reward.products.length > 0 && (
              <>
                <Text fontWeight={500} fontSize={16} color='neutral.900'>{t('Items included')}:</Text>
                {reward.products.map(item => (
                  <VStack
                    textAlign="left"
                    alignItems="start"
                    w="100%"
                    py={0}
                    px={2}
                    overflow="hidden"
                    spacing={1}
                    as={Button}
                    onClick={() => {}}
                    onMouseEnter={() => setHoveredBackground(item.image || '')}
                    onMouseLeave={() => setHoveredBackground('')}
                    size="sm"
                    variant="ghost"
                    key={item.id}
                  >
                    <Stack direction='row' onClick={() => {}}>
                      <Text fontWeight={500} fontSize={16} color='#20ECC7'>{'>'} </Text>
                      <Text fontWeight={500} fontSize={16} color='neutral.500'>{item.name}</Text>
                    </Stack>
                  </VStack>
                ))}
              </>
            )}
          </Stack>
        </Stack>
      </SimpleGrid>
      <Stack direction='row' alignItems="center" style={{width: '100%'}}>
        <CopyRewardLink size="md" mr={2} linkToCopy={window.location.href.split('#')[0] + "#r" + reward.id} />
        <Button
          variant='primary'
          size='md'
          onClick={onSelectReward}
          style={{ minWidth: '80px', flex: 1 }}
        >
          <Text isTruncated>{t('Select reward')}</Text>
        </Button>
      </Stack>
    </CardLayout>
  )
}
