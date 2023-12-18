import { Image, Stack, useColorMode, useControllableState, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import {TableToggle, TableImageAndTitle, TableText} from '../components'
import EditIcon from '../icons/edit.svg';
import DeleteIcon from '../icons/delete.svg';
import { PathName } from '../../../../../../constants'
import { useProjectContext } from '../../../../../../context'
import {MobileViews} from '../../../../../../context'
import { useNavigate } from 'react-router-dom'

export const RewardsBundlesTable = () => {
  const { t } = useTranslation()
  const { colorMode } = useColorMode()
  const { isProjectOwner, project, setMobileView } = useProjectContext()
  const navigate = useNavigate()

  if(!project || !isProjectOwner) {
    return null;
  }

  return (
    <>
      {project.rewards && project.rewards.length > 0 ? (
        <table style={{textAlign: 'left'}}>
          <tr>
            <th style={{padding: '10px 0 10px 0'}}>{t('Visibility')}</th>
            <th style={{padding: '10px 0 10px 0'}}>{t('Reward name')}</th>
            <th style={{padding: '10px 0 10px 0'}}>{t('Items')}</th>
            <th style={{padding: '10px 0 10px 0'}}>{t('Price')}</th>
            <th style={{padding: '10px 0 10px 0'}}>{t('Stock')}</th>
            <th></th>
          </tr>
          {project.rewards.map((row,index) => {
            return (
              <tr key={index} style={{borderBottom: `1px solid ${ colorMode === 'light' ? '#E9ECEF' : '#141A19' }`}}>
                <td style={{paddingTop: '10px', verticalAlign: 'top'}}>
                  <TableToggle isChecked={row.published} value={row.published ? 'Published' : 'Hidden'} onChange={(value) => {
                    // @TODO: Update The published state via API
                  }}/>
                </td>
                <td style={{paddingTop: '10px', verticalAlign: 'top'}}>
                  <TableImageAndTitle image={row.image} title={row.name} />
                </td>
                <td style={{paddingTop: '10px', verticalAlign: 'top'}}>
                  {row.products.map((item, index) => {
                    return (
                      <TableImageAndTitle image={item.image} title={item.name} />
                    )
                  })}
                </td>
                <td style={{paddingTop: '10px', verticalAlign: 'top'}}>
                  <TableText content={`$${(row.cost / 100).toFixed(2)}`} />
                </td>
                <td style={{paddingTop: '10px', verticalAlign: 'top'}}>
                  <TableText content={`${row.maxClaimable - row.sold} ${t('remaining')}, ${row.sold} ${t('sold')}`} />
                </td>
                <td style={{paddingTop: '10px', verticalAlign: 'top'}}>
                  <Stack direction='row'>
                    <Image style={{cursor: 'pointer'}} src={EditIcon} onClick={() => {
                      setMobileView(MobileViews.editReward)
                      navigate(PathName.projectEditReward)
                    }}/>
                    <Image style={{cursor: 'pointer'}} src={DeleteIcon} onClick={() => {
                      // @TODO: Hookup delete functionality to API
                      alert('delete bundle');
                    }} />
                  </Stack>
                </td>
              </tr>
            )
          })}
        </table>
      ) : (
        <Text>
          {t('No bundles currently exist')}
        </Text>
      )}
    </>
  )
}
