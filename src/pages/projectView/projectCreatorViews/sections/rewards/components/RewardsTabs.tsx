import { Button, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { TableToggle } from './TableToggle'
import { MobileViews, useProjectContext } from '../../../../../../context'
import { useNavigate } from 'react-router-dom'
import { PathName } from '../../../../../../constants'

export const RewardsTabs = ({tabState, setTabState}) => {
  const { t } = useTranslation()
  const { isProjectOwner, project, setMobileView } = useProjectContext()
  const navigate = useNavigate()

  return (
    <Stack direction='row' justify='space-between' align={'flex-start'} pb={4}>
      {/*<Stack direction='column'>*/}
      {/*  <Stack direction='row' pb={2}>*/}
      {/*    <Text*/}
      {/*      fontSize='15px'*/}
      {/*      backgroundColor={tabState == 'rewards' ? 'neutral.100': 'neutral.00'}*/}
      {/*      padding='5px 10px'*/}
      {/*      borderRadius='4px'*/}
      {/*      onClick={() => {*/}
      {/*        setTabState('rewards');*/}
      {/*      }}*/}
      {/*      style={{cursor: 'pointer'}}*/}
      {/*    >*/}
      {/*      <b>{t('Rewards')}</b>*/}
      {/*    </Text>*/}
      {/*    <Text*/}
      {/*        fontSize='15px'*/}
      {/*        backgroundColor={tabState != 'rewards' ? 'neutral.100': 'neutral.00'}*/}
      {/*        padding='5px 10px'*/}
      {/*        borderRadius='4px'*/}
      {/*        onClick={() => {*/}
      {/*          setTabState('rewardBundles');*/}
      {/*        }}*/}
      {/*        style={{cursor: 'pointer'}}*/}
      {/*    >*/}
      {/*      <b>{t('Bundles')}</b>*/}
      {/*    </Text>*/}
      {/*  </Stack>*/}
      {/*  <Stack direction='row'>*/}
      {/*    <Text*/}
      {/*      color='neutral.500'*/}
      {/*      fontSize='14px'*/}
      {/*    >*/}
      {/*      {t('Rewards are bundles of items sold as a package.')}*/}
      {/*    </Text>*/}
      {/*  </Stack>*/}
      {/*</Stack>*/}
      <Stack direction='row' align='center'>
        {tabState == 'rewards' ? (
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
        ) :(
          <Button
              display={{ base: 'block' }}
              variant="primary"
              onClick={() => {
                setMobileView(MobileViews.createReward)
                navigate(PathName.projectCreateReward)
              }}
          >
            {t('Create new bundle')}
          </Button>
        )}
      </Stack>
    </Stack>
  )
}
