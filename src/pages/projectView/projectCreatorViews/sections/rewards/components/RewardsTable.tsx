import { Image, Stack, Text, useColorMode, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import {TableImageAndTitle, TableText} from '../components'
import EditIcon from '../icons/edit.svg';
import DeleteIcon from '../icons/delete.svg';
import SplashRewardIcon from '../icons/splash-reward.svg';
import VisibilityIcon from '../icons/visibility.svg';
import { MobileViews, useProjectContext } from '../../../../../../context'
import { PathName } from '../../../../../../constants'
import { useNavigate } from 'react-router-dom'
import { ProjectRewardForCreateUpdateFragment, Project } from '../../../../../../types/generated/graphql';
import { useState } from 'react';
import { DeleteConfirmModal } from '../../../../../../components/molecules';
import { useModal } from '../../../../../../hooks/useModal';
import { useMutation } from '@apollo/client'
import { MUTATION_DELETE_PROJECT_REWARD } from '../../../../../../graphql/mutations';
import { useNotification } from '../../../../../../utils';

export const RewardsTable = () => {
  const { t } = useTranslation()
  const { colorMode } = useColorMode()
  const { isProjectOwner, project, setMobileView, updateProject } = useProjectContext()
  const { toast } = useNotification()
  const navigate = useNavigate()
  const [selectedReward, setSelectedReward] =
    useState<ProjectRewardForCreateUpdateFragment>()

  const {
    isOpen: isRewardDeleteOpen,
    onClose: onRewardDeleteClose,
    onOpen: openRewardDelete,
  } = useModal()

  const [deleteRewardMutation] = useMutation<
    any,
    { input: { projectRewardId: Number } }
  >(MUTATION_DELETE_PROJECT_REWARD, {
    onCompleted() {
      const newRewards = project?.rewards?.filter(
        (reward) => reward?.id !== selectedReward?.id,
      )
      updateProject({ rewards: newRewards || [] } as Project)
      handleClose()
      toast({
        title: 'Successfully removed!',
        description: `${t('Reward')} ${selectedReward?.name} ${t(
          'was successfully removed',
        )}`,
        status: 'success',
      })
    },
    onError(error) {
      handleClose()
      toast({
        title: 'Failed to remove reward',
        description: `${error}`,
        status: 'error',
      })
    },
  })

  if(!project || !isProjectOwner) {
    return null;
  }

  const handleClose = () => {
    setSelectedReward(undefined)
    onRewardDeleteClose()
  }

  const triggerRewardRemoval = (id?: number) => {
    const currentReward = project.rewards?.find((reward) => reward?.id === id)
    if (!currentReward) {
      return
    }

    setSelectedReward(currentReward)
    openRewardDelete()
  }

  const handleRemoveReward = async () => {
    if (!selectedReward?.id) {
      return
    }

    deleteRewardMutation({
      variables: {
        input: {
          projectRewardId: selectedReward.id,
        },
      },
    })
  }

  if(!project.rewards || project.rewards.length == 0) {
    return (
      <VStack
        align={'center'}
      >
        <Image src={SplashRewardIcon} htmlWidth={300} />
        <Text
          color='neutral.500'
          fontSize='14px'
         >
           {t('No rewards currently exist')}
        </Text>
      </VStack>
    )
  }

  return (
    <>
      <table style={{textAlign: 'left'}}>
        <tr>
          <th style={{padding: '10px 0 10px 0'}}>{t('Visibility')}</th>
          <th style={{padding: '10px 0 10px 0'}}>{t('Reward Name')}</th>
          <th style={{padding: '10px 0 10px 0'}}>{t('Price')}</th>
          <th style={{padding: '10px 0 10px 0'}}>{t('In Stock')}</th>
          <th style={{padding: '10px 0 10px 0'}}>{t('Overview')}</th>
          <th></th>
        </tr>
        {project.rewards.map((row,index) => {
          return (
            <tr key={index} style={{borderBottom: `1px solid ${ colorMode === 'light' ? '#E9ECEF' : '#141A19' }`}}>
              <td style={{paddingTop: '10px', verticalAlign: 'top'}}>
                <Stack style={{cursor: 'pointer'}} direction='row' align={'center'} onClick={() => {
                    // @TODO: Toggle Visibility
                  }}>
                  <Image style={{cursor: 'pointer'}} src={VisibilityIcon}/>
                  <TableText content={'Visible'} />
                </Stack>
              </td>
              <td style={{paddingTop: '10px', verticalAlign: 'top'}}>
                <TableImageAndTitle image={row.image} title={row.name} />
              </td>
              <td style={{paddingTop: '10px', verticalAlign: 'top'}}>
                {row.cost && (
                  <TableText content={`$${(row.cost / 100).toFixed(2)}`} />
                )}
              </td>
              <td style={{paddingTop: '10px', verticalAlign: 'top'}}>
                <TableText content={
                  (!row.maxClaimable || (row.maxClaimable > 0 && row.maxClaimable - row.sold > 0) ? 'Yes' : 'No')
                } />
              </td>
              <td style={{paddingTop: '10px', verticalAlign: 'top'}}>
                <TableText content={
                  `${(row.maxClaimable && row.maxClaimable > 0 ? (row.maxClaimable - row.sold) + ' remaining, ' : '')}${row.sold} sold`
                } />
              </td>
              <td style={{paddingTop: '10px', verticalAlign: 'top'}}>
                <Stack direction='row'>
                  <Image style={{cursor: 'pointer'}} src={EditIcon} onClick={() => {
                    setMobileView(MobileViews.editReward)
                    navigate(`${PathName.projectEditReward}/${row.id}`)
                  }}/>
                  <Image style={{cursor: 'pointer'}} src={DeleteIcon} onClick={isProjectOwner
                  ? () => triggerRewardRemoval(row.id)
                  : undefined} />
                </Stack>
              </td>
            </tr>
          )
        })}
      </table>
      <DeleteConfirmModal
        isOpen={isRewardDeleteOpen}
        onClose={handleClose}
        title={`${t('Delete reward')} ${selectedReward?.name}`}
        description={t('Are you sure you want to remove the reward')}
        confirm={handleRemoveReward}
      />
    </>
  )
}
