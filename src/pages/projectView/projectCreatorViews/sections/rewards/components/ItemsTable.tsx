import { Image, Stack, Text, useColorMode, useControllableState } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import {TableImageAndTitle, TableText} from '../components'
import EditIcon from '../icons/edit.svg';
import DeleteIcon from '../icons/delete.svg';
import { MobileViews, useProjectContext } from '../../../../../../context'
import { PathName } from '../../../../../../constants'
import { useNavigate } from 'react-router-dom'

export const ItemsTable = () => {
  const { t } = useTranslation()
  const { colorMode } = useColorMode()
  const { isProjectOwner, project, setMobileView } = useProjectContext()
  const navigate = useNavigate()

  if(!project || !isProjectOwner) {
    return null;
  }

  return (
    <>
      {project.products && project.products.length > 0 ? (
        <table style={{textAlign: 'left'}}>
          <tr>
            <th style={{padding: '10px 0 10px 0'}}>{t('Item Name')}</th>
            <th style={{padding: '10px 0 10px 0'}}>{t('Connected Reward')}</th>
            <th style={{padding: '10px 0 10px 0'}}>{t('In Stock')}</th>
            <th style={{padding: '10px 0 10px 0'}}>{t('Available As Additional Item?')}</th>
            <th style={{padding: '10px 0 10px 0'}}>{t('Price')}</th>
            <th></th>
          </tr>
          {project.products.map((row,index) => {
            return (
              <tr key={index} style={{borderBottom: `1px solid ${ colorMode === 'light' ? '#E9ECEF' : '#141A19' }`}}>
                <td style={{paddingTop: '10px', verticalAlign: 'top'}}>
                  <TableImageAndTitle image={row.image} title={row.name} />
                </td>
                <td style={{paddingTop: '10px', verticalAlign: 'top'}}>
                  {project.rewards && project.rewards.map((reward, index2) => {
                    if(reward.products.filter(product => product.name == row.name).length > 0) return <TableImageAndTitle image={reward.image} title={reward.name} />;
                  })}
                </td>
                <td style={{paddingTop: '10px', verticalAlign: 'top'}}>
                  <TableText content={`${row.inStock ? t('Yes') : t('No')}`} />
                </td>
                <td style={{paddingTop: '10px', verticalAlign: 'top'}}>
                  <TableText content={`${row.availableAsAdditionalItem ? t('Yes') : t('No')}`} />
                </td>
                <td style={{paddingTop: '10px', verticalAlign: 'top'}}>
                  {row.cost && (
                    <TableText content={`$${(row.cost / 100).toFixed(2)}`} />
                  )}
                </td>
                <td style={{paddingTop: '10px', verticalAlign: 'top'}}>
                  <Stack direction='row'>
                    <Image style={{cursor: 'pointer'}} src={EditIcon} onClick={() => {
                      setMobileView(MobileViews.editItem)
                      navigate(PathName.projectEditItem)
                    }}/>
                    <Image style={{cursor: 'pointer'}} src={DeleteIcon} onClick={() => {
                      // @TODO: Hookup delete functionality to API
                      alert('delete item');
                    }} />
                  </Stack>
                </td>
              </tr>
            )
          })}
        </table>
      ) : (
        <Text>
          {t('No items currently exist')}
        </Text>
      )}
    </>
  )
}
