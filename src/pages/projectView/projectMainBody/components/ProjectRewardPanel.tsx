import { Box, Text, Link, Stack, useDisclosure, Button, Container } from '@chakra-ui/react'
import {
  ProjectReward,
} from '../../../../types'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MobileViews, useProjectContext } from '../../../../context'
import { PathName } from '../../../../constants'

type Props = {
  reward: ProjectReward,
  showDetails?: boolean,
  showContributors?: boolean
  key: number
}

export const ProjectRewardPanel = ({ reward, showDetails = false, showContributors = false }: Props) => {

  const navigate = useNavigate()
  const { t } = useTranslation()
  const { setMobileView } = useProjectContext()

  const handleProjectNavigationButtonClick = () => {
    setMobileView(MobileViews.rewards)
    navigate(PathName.projectRewards + "#r" + reward.id)
  }

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
        <Text fontWeight={700} fontSize={16}>{reward.name}</Text>
        <Stack direction='row'>
          <Text fontWeight={700} fontSize={16} color='neutral.900'>${reward.cost / 100}</Text>
        </Stack>
      </Stack>
      <Stack direction='column' gap={1}>
        <Box py={1}>
          <div style={{display: 'block', position: 'relative', paddingTop: '56.25%', width: '100%', borderRadius: '12px', overflow: 'hidden'}}>
            <div style={{display: 'block', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: `transparent url(${reward.image}) no-repeat center center / cover`}}>
            </div>
          </div>
        </Box>
        <Text mt={1} fontWeight={400} fontSize='sm' color='neutral.900'>{reward.maxClaimable !== 0 ? `${reward.maxClaimable - reward.sold} ${t('remaining')}, ` : ''}{reward.sold || 0} {t('backers')}</Text>
        <Text mt={1} fontWeight={400} fontSize='sm' color='neutral.500'>{reward.description}</Text>
        {reward.estimatedDeliveryDate && (
          <Text mt={1} fontWeight={400} fontSize='sm' color='neutral.500'>{t('Estimated delivery')}: {new Date(reward.estimatedDeliveryDate * 1000).toLocaleDateString('en-us', { year:"numeric", month:"short"})}
          </Text>
        )}
        {reward.products && reward.products.length > 0 && (
          <>
            <Text mt={1} fontWeight={400} fontSize='sm' color='neutral.900'>{reward.products.length} {t('items included')}</Text>
            <Text mt={1} fontWeight={400} fontSize='sm' color='neutral.500'>
              {reward.products.map((product, i) => {
                return (
                  product.name + (i !== (reward.products.length - 1) ? ', ' : '')
                )
              })}
            </Text>
          </>
        )}
        <Container pos={'absolute'} bottom={3} left={3} right={3} width={'auto'} p={0}>
          <Stack direction='row' style={{ marginTop: '10px' }}>
            {showDetails && (
              <Button
                variant='secondary'
                size='md'
                onClick={handleProjectNavigationButtonClick}
                style={{ minWidth: '80px' }}
              >
                <Text isTruncated>{t('Details')}</Text>
              </Button>
            )}
            <Button
              variant='primary'
              size='md'
              onClick={()=>{}}
              style={{ flex: 1 }}
            >
              <Text isTruncated>{t('Select reward')}</Text>
            </Button>
          </Stack>
        </Container>
      </Stack>
    </Box>
  )
}
