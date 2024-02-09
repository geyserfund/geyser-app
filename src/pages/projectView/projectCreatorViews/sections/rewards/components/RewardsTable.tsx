import { useMutation } from '@apollo/client'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Image, Stack, Text, useBreakpoint, useColorMode, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { DeleteConfirmModal } from '../../../../../../components/molecules'
import { PathName } from '../../../../../../constants'
import { MobileViews, useProjectContext } from '../../../../../../context'
import { MUTATION_DELETE_PROJECT_REWARD, MUTATION_UPDATE_PROJECT_REWARD } from '../../../../../../graphql/mutations'
import { useModal } from '../../../../../../hooks/useModal'
import { neutralColorsLight } from '../../../../../../styles'
import {
  Project,
  ProjectRewardForCreateUpdateFragment,
  RewardCurrency,
} from '../../../../../../types/generated/graphql'
import { useNotification } from '../../../../../../utils'
import { TableImageAndTitle, TableText } from '../components'
import DeleteIcon from '../icons/delete.svg'
import EditIcon from '../icons/edit.svg'
import SplashRewardIcon from '../icons/splash-reward.svg'

export const RewardsTable = () => {
  const { t } = useTranslation()
  const { colorMode } = useColorMode()
  const { isProjectOwner, project, setMobileView, updateProject } = useProjectContext()
  const { toast } = useNotification()
  const navigate = useNavigate()
  const [selectedReward, setSelectedReward] = useState<ProjectRewardForCreateUpdateFragment>()
  const breakpoint = useBreakpoint({ ssr: false })
  const largeView = ['xl', '2xl'].includes(breakpoint)

  const { isOpen: isRewardDeleteOpen, onClose: onRewardDeleteClose, onOpen: openRewardDelete } = useModal()

  const [deleteRewardMutation] = useMutation<any, { input: { projectRewardId: Number } }>(
    MUTATION_DELETE_PROJECT_REWARD,
    {
      onCompleted() {
        const newRewards = project?.rewards?.filter((reward) => reward?.id !== selectedReward?.id)
        updateProject({ rewards: newRewards || [] } as Project)
        handleClose()
        toast({
          title: 'Successfully removed!',
          description: `${t('Reward')} ${selectedReward?.name} ${t('was successfully removed')}`,
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
    },
  )

  const [updateRewardVisibilityMutation] = useMutation<any, { input: { projectRewardId: Number; isHidden: Boolean } }>(
    MUTATION_UPDATE_PROJECT_REWARD,
    {
      onCompleted(data) {
        const updatedRewards = project?.rewards?.map((reward) => {
          if (reward?.id == selectedReward?.id) {
            return { ...reward, isHidden: data.projectRewardUpdate.isHidden, id: data.projectRewardUpdate.id }
          }

          return reward
        })
        updateProject({ rewards: updatedRewards || [] } as Project)
        toast({
          title: 'Successfully updated!',
          description: `${t('Reward')} ${selectedReward?.name} ${t('was successfully updated')}`,
          status: 'success',
        })
      },
      onError(error) {
        handleClose()
        toast({
          title: 'Failed to update reward',
          description: `${error}`,
          status: 'error',
        })
      },
    },
  )

  if (!project || !isProjectOwner) {
    return null
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

  if (!project.rewards || project.rewards.length == 0) {
    return (
      <VStack align={'center'}>
        <Image src={SplashRewardIcon} htmlWidth={300} />
        <Text color="neutral.500" fontSize="14px">
          {t('No rewards currently exist')}
        </Text>
      </VStack>
    )
  }

  if (largeView === true) {
    return (
      <>
        <table style={{ textAlign: 'left', width: '100%' }}>
          <tr>
            <th style={{ padding: '10px 0 10px 0' }}>{t('Visibility')}</th>
            <th style={{ padding: '10px 0 10px 0' }}>{t('Reward Name')}</th>
            <th style={{ padding: '10px 0 10px 0' }}>{t('Price')}</th>
            <th style={{ padding: '10px 0 10px 0' }}>{t('In Stock')}</th>
            <th style={{ padding: '10px 0 10px 0' }}>{t('Overview')}</th>
            <th></th>
          </tr>
          {project.rewards.map((row, index) => {
            return (
              <tr
                key={index}
                style={{
                  borderBottom: `1px solid ${
                    colorMode === 'light' ? neutralColorsLight[100] : neutralColorsLight[900]
                  }`,
                }}
              >
                <td style={{ paddingTop: '10px', verticalAlign: 'top' }}>
                  <Stack
                    style={{ cursor: 'pointer' }}
                    direction="row"
                    align={'center'}
                    onClick={() => {
                      setSelectedReward(row)
                      updateRewardVisibilityMutation({
                        variables: {
                          input: {
                            projectRewardId: row.id,
                            isHidden: Boolean(!row.isHidden),
                          },
                        },
                      })
                    }}
                  >
                    {row.isHidden ? <ViewOffIcon color={'neutral.900'} /> : <ViewIcon color={'neutral.900'} />}
                    <TableText content={row.isHidden ? t('Hidden') : t('Visible')} />
                  </Stack>
                </td>
                <td style={{ paddingTop: '10px', verticalAlign: 'top' }}>
                  <TableImageAndTitle image={row.image} title={row.name} />
                </td>
                <td style={{ paddingTop: '10px', verticalAlign: 'top' }}>
                  {row.cost && (
                    <TableText
                      content={
                        project && project.rewardCurrency == RewardCurrency.Usdcent
                          ? `$${row.cost / 100}`
                          : `${row.cost.toLocaleString()} sats`
                      }
                    />
                  )}
                </td>
                <td style={{ paddingTop: '10px', verticalAlign: 'top' }}>
                  <TableText
                    content={
                      !row.maxClaimable || (row.maxClaimable > 0 && row.maxClaimable - row.sold > 0) ? 'Yes' : 'No'
                    }
                  />
                </td>
                <td style={{ paddingTop: '10px', verticalAlign: 'top' }}>
                  <TableText
                    content={`${
                      row.maxClaimable && row.maxClaimable > 0 ? row.maxClaimable - row.sold + ' remaining, ' : ''
                    }${row.sold} sold`}
                  />
                </td>
                <td style={{ paddingTop: '10px', verticalAlign: 'top' }}>
                  <Stack direction="row">
                    <Image
                      style={{ cursor: 'pointer' }}
                      src={EditIcon}
                      onClick={() => {
                        setMobileView(MobileViews.editReward)
                        navigate(`${PathName.projectEditReward}/${row.id}`)
                      }}
                    />
                    <Image
                      style={{ cursor: 'pointer' }}
                      src={DeleteIcon}
                      onClick={isProjectOwner ? () => triggerRewardRemoval(row.id) : undefined}
                    />
                  </Stack>
                </td>
              </tr>
            )
          })}
        </table>
        <DeleteConfirmModal
          isOpen={isRewardDeleteOpen}
          onClose={handleClose}
          title={`${t('Delete reward')}`}
          description={t('Are you sure you want to remove the reward?')}
          confirm={handleRemoveReward}
        />
      </>
    )
  }

  return (
    <>
      <Stack direction={'column'}>
        {project.rewards.map((row, index) => {
          return (
            <Stack direction={'row'} align={'center'} py={3} borderTop={'2px solid'} borderTopColor={'neutral.200'}>
              <Image borderRadius={8} boxSize="60px" objectFit="cover" src={row.image || ''} alt={row.name} />
              <Stack direction={'column'} flex={1}>
                <Text fontSize="16px" color="neutral.900" fontWeight="700" lineHeight={1.3}>
                  {row.name}
                </Text>
                <Text fontSize="16px" color="neutral.900" lineHeight={1}>
                  {`${t('Price')}: $${(row.cost / 100).toFixed(2)}`}
                </Text>
              </Stack>
              <Stack direction="row">
                <Image
                  style={{ cursor: 'pointer' }}
                  src={EditIcon}
                  onClick={() => {
                    setMobileView(MobileViews.editReward)
                    navigate(`${PathName.projectEditReward}/${row.id}`)
                  }}
                />
                <Image
                  style={{ cursor: 'pointer' }}
                  src={DeleteIcon}
                  onClick={isProjectOwner ? () => triggerRewardRemoval(row.id) : undefined}
                />
              </Stack>
            </Stack>
          )
        })}
      </Stack>
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
