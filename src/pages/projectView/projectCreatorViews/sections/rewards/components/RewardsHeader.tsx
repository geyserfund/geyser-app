import { Button, Stack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { H2 } from '../../../../../../components/typography'
import { MobileViews, useProjectContext } from '../../../../../../context'
import { useNavigate } from 'react-router-dom'
import { PathName } from '../../../../../../constants'

export const RewardsHeader = () => {
  const { t } = useTranslation()
  const { setMobileView } = useProjectContext()
  const navigate = useNavigate()

  return (
    <Stack
      align={'center'}
      direction={{ base: 'row', lg: 'row' }}
      justify={'space-between'}
      pb={4}
      w="full"
    >
      <H2>{t('Manage Rewards')}</H2>
      <Button
        display={{ base: 'block' }}
        variant="primary"
        onClick={() => {
          setMobileView(MobileViews.createReward)
          navigate(PathName.projectCreateReward)
        }}
      >
        {t('Create new reward')}
      </Button>
    </Stack>
  )
}
