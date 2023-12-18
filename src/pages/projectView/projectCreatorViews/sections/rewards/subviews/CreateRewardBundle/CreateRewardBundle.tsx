import { Text, Stack, VStack, Checkbox, Button, Image, Input } from '@chakra-ui/react'
import { CardLayout } from '../../../../../../../components/layouts'
import { Body2 } from '../../../../../../../components/typography'
import { useTranslation } from 'react-i18next'
import { FieldContainer } from '../../../../../../../forms/components/FieldContainer'
import { TextArea, TextInputBox, UploadBox, SelectComponent } from '../../../../../../../components/ui'
import { useState } from 'react'
import {
  ProjectProduct,
  ProjectRewardForCreateUpdateFragment,
} from '../../../../../../../types'
import { defaultProjectReward } from '../../../../../../../defaults'
import { toInt, useNotification } from '../../../../../../../utils'
import { PathName } from '../../../../../../../constants'
import { MobileViews, useProjectContext } from '../../../../../../../context'
import { CreatorEmailButton, FileUpload } from '../../../../../../../components/molecules'
import { useNavigate } from 'react-router-dom'
import EditIcon from '../../icons/edit.svg'
import DeleteIcon from '../../icons/delete.svg'

export const ProjectCreateRewardBundle = () => {
  const { t } = useTranslation()
  const {project} = useProjectContext();
  const {navigate} = useNavigate();
  const {setMobileView} = useProjectContext();

  if(!project) {
    return null;
  }

  const ownerEmail = project.owners[0]?.user.email || ''
  const [formCostDollarValue, setFormCostDollarValue] = useState(
    defaultProjectReward.cost / 100,
  )
  const [reward, setReward] =
    useState<ProjectRewardForCreateUpdateFragment>(defaultProjectReward)
  const [formError, setFormError] = useState<any>({})

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    if (name) {
      setReward((current) => ({ ...current, [name]: value }))
    }
  }

  const handleCostAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {

    // Dollar value rounded to two decimal places
    const dollarValue = Math.round(parseFloat(event.target.value) * 100) / 100

    setFormCostDollarValue(dollarValue)

    // set cost with the dollar value converted to cents
    setReward((current) => ({
      ...current,
      cost: toInt(dollarValue * 100),
    }))
  }

  const handleShipping = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReward((current) => ({ ...current, hasShipping: event.target.checked }))
  }

  return(
    <VStack
      direction={{ base: 'column', lg: 'row' }}
      w="full"
      pt={{ base: '10px', lg: '20px' }}
      backgroundColor={{ base: 'neutral.0', lg: 'inherit' }}
      pb={{ base: '80px', lg: '20px' }}
      px={{ base: '10px', lg: '80px' }}
      spacing={{ base: '10px', lg: '20px' }}
    >
      <CardLayout h="auto" padding="30px 30px" minWidth="100%">
        <Text fontSize="18px" fontWeight={600}>
          {t('Add Reward')}
        </Text>
        <Body2 color="neutral.900">
          Rewards are bundles of items sold as a package.
        </Body2>
        <Stack direction={'row'}>
          <FieldContainer title={t('Reward Name')}>
            <TextInputBox
              placeholder={'Silver Tier'}
              value={reward.name}
              name="name"
              onChange={handleTextChange}
              error={formError.name}
            />
          </FieldContainer>
          <FieldContainer title={t('Max Claimable (skip if no limit)')}>
            <TextInputBox
              placeholder={'100'}
              value={reward.maxClaimable}
              name="maxClaimable"
              onChange={handleTextChange}
              error={formError.maxClaimable}
            />
          </FieldContainer>
        </Stack>
        <Stack direction={'row'}>
          <FieldContainer title={t('Currency')}>
            <TextInputBox
              placeholder={'USD'}
              value={'USD'}
              name="currency"
              error={''}
            />
          </FieldContainer>
          <FieldContainer title={t('Price (USD)')}>
            <TextInputBox
              placeholder={'150'}
              value={reward.cost}
              name="cost"
              onChange={handleTextChange}
              error={formError.cost}
            />
          </FieldContainer>
        </Stack>
        <Stack direction={'row'}>
          <FieldContainer title={t('Description')}>
            <TextArea
              placeholder={t('Describe the reward you would like to sell')}
              value={reward.description}
              name="description"
              onChange={handleTextChange}
              error={formError.description}
            />
          </FieldContainer>
        </Stack>
        <Stack direction={'row'}>
          <FieldContainer title={t('Image')}>
            <FileUpload
              showcase
              containerProps={{ w: '100%' }}
              src={reward.image}
              onUploadComplete={() => {}}
              onDeleteClick={() => {}}
              childrenOnLoading={<UploadBox loading h={10} />}
            >
              <UploadBox h={10} title="Select an Image" />
            </FileUpload>
          </FieldContainer>
          <FieldContainer title={t('Estimated Delivery Date')}>
            <TextInputBox
              placeholder={'June, 2024'}
              value={reward.estimatedDeliveryDate}
              name="estimatedDeliveryDate"
              onChange={handleTextChange}
              error={formError.estimatedDeliveryDate}
            />
          </FieldContainer>
        </Stack>
        <VStack spacing={4} w="100%" align={'flex-start'}>
          <FieldContainer>
            <Checkbox
              w="100%"
              isChecked={reward.hasShipping}
              onChange={handleShipping}
            >
              <Text>{t('Includes Shipping')}</Text>
            </Checkbox>
            {reward.hasShipping ? (
              <VStack
                pl={2}
                spacing={2}
                borderLeft="2px solid"
                borderColor="primary.400"
                align={'flex-start'}
              >
                <Text variant="body1" fontWeight={500}>
                  {t(
                    'Funders will see the following message in the shipping section. Make sure your email is up to date.',
                  )}
                </Text>
                <Text fontWeight={500}>
                  {t(
                    "To receive the selected items, you will need to send your shipping details to the creator's email. Which will be revealed in the success screen.",
                  )}
                </Text>
                <CreatorEmailButton email={ownerEmail} />
              </VStack>
            ) : null}
          </FieldContainer>
        </VStack>
        <CardLayout h="auto" padding="15px 15px" minWidth="100%">
          <Stack direction='row' justify='space-between' align={'flex-start'} pb={4}>
            <Stack direction='column'>
              <Text fontSize="18px" fontWeight={600}>
                {t('Items')}
              </Text>
              <Body2 color="neutral.900">
                Items can be bundled as rewards or purchased as add-ons
              </Body2>
            </Stack>
            <Button
              display={{ base: 'block' }}
              variant="primary"
              onClick={() => {
                setMobileView(MobileViews.createItem)
                navigate(PathName.projectCreateItem)
              }}
            >
              {t('Add new item')}
            </Button>
          </Stack>
          <VStack>
            <FieldContainer title={t('Select Existing Item')}>
              <SelectComponent<ProjectProduct, false>
                placeholder={t('Select an existing item')}
              />
            </FieldContainer>
          </VStack>
          <Stack>
            <table style={{width: '100%', textAlign: 'left'}}>
              <tr>
                <th style={{width: '60px'}}>QTY</th>
                <th>Item</th>
                <th></th>
              </tr>
              <tr style={{padding: `5px 0 5px 0`}}>
                <td><Input w={'40px'} value={'2'} textAlign={'center'} p={0} /></td>
                <td><Text>Power Adapter</Text></td>
                <td>
                  <Stack direction='row' justifyContent={'flex-end'}>
                    <Image style={{cursor: 'pointer'}} src={EditIcon} onClick={() => {
                      // @TODO: Hookup dynamic edit route once API is hooked up
                      alert('edit item');
                    }}/>
                    <Image style={{cursor: 'pointer'}} src={DeleteIcon} onClick={() => {
                      // @TODO: Hookup delete functionality to API
                      alert('delete item out of the state');
                    }} />
                  </Stack>
                </td>
              </tr>
              <tr style={{padding: `5px 0 5px 0`}}>
                <td><Input w={'40px'} value={'1'} textAlign={'center'} p={0} /></td>
                <td><Text>Stickers</Text></td>
                <td>
                  <Stack direction='row' justifyContent={'flex-end'}>
                    <Image style={{cursor: 'pointer'}} src={EditIcon} onClick={() => {
                      // @TODO: Hookup dynamic edit route once API is hooked up
                      alert('edit item');
                    }}/>
                    <Image style={{cursor: 'pointer'}} src={DeleteIcon} onClick={() => {
                      // @TODO: Hookup delete functionality to API
                      alert('delete item out of the state');
                    }} />
                  </Stack>
                </td>
              </tr>
            </table>
          </Stack>
        </CardLayout>
        <Stack>
          <Button
            display={{ base: 'block' }}
            variant="primary"
            onClick={() => {
              // @TODO: Hookup create reward once API is ready
            }}
          >
            {t('Publish reward')}
          </Button>
        </Stack>
      </CardLayout>
    </VStack>
  )
}